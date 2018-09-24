import client, { gql } from './graphqlClient';
import { injectGlobal } from 'emotion';

const loadFontInPage = ({ id, regular, italic, bold, boldItalic }) => {
  // testing the font hasn't been loaded already
  if (!document.fonts.check('16px ' + id)) {
    injectGlobal`
      @font-face {
        font-family: ${id};
        font-style: normal;
        font-weight: normal;
        src: url(${regular}) format('woff2');
      }
      @font-face {
        font-family: ${id};
        font-style: italic;
        font-weight: normal;
        src: url(${italic}) format('woff2');
      }
      @font-face {
        font-family: ${id};
        font-style: normal;
        font-weight: bold;
        src: url(${bold}) format('woff2');
      }
      @font-face {
        font-family: ${id};
        font-style: italic;
        font-weight: bold;
        src: url(${boldItalic}) format('woff2');
      }
    `;
  } else {
    console.log(id, 'is already loaded');
  }
};

const emailFontDictionary = {};

const loadFontFromEmails = async (emails, fontList) => {
  const queries = Array.from(new Set(emails)).reduce(
    (queries, email, index) => {
      return gql`
      ${queries}

      user${index}: User(email: "${email}") {
        id
        email
        choosenFont
      }
    `;
    },
    ''
  );

  const userFonts = await client.request(
    gql`
      query {
        ${queries}
      }
    `
  );

  Object.values(userFonts)
    .filter(data => !!data) // filtering people with no custom font
    .forEach(data => {
      emailFontDictionary[data.email] = data.id;
      const font = fontList.find(font => font.family === data.choosenFont);

      if (!font) {
        console.warn(data.choosenFont, 'has not been found in the font list');
        return;
      }

      loadFontInPage({
        id: data.id,
        name: data.choosenFont,
        regular: font.regular.replace('http:', 'https:'),
        italic: font.italic.replace('http:', 'https:'),
        bold: font.bold.replace('http:', 'https:'),
        boldItalic: font.boldItalic.replace('http:', 'https:'),
      });
    });
};

const stackedEmails = [];
const stackedResolvers = [];
let timeout = null;

export const batchLoadFontFromEmail = (email, fontList) => {
  let resolvePromise = null;
  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
  });

  if (emailFontDictionary[email]) {
    resolvePromise(emailFontDictionary[email]);
    return promise;
  }

  console.log('Will load font for', email);

  stackedEmails.push(email);
  stackedResolvers.push(resolvePromise);

  if (!timeout) {
    timeout = setTimeout(async () => {
      await loadFontFromEmails(stackedEmails, fontList);
      timeout = null;
      // Resolve promises with their font name
      stackedEmails.forEach((email, i) =>
        stackedResolvers[i](emailFontDictionary[email])
      );
      // clear arrays
      stackedEmails.splice(0, stackedEmails.length);
      stackedResolvers.splice(0, stackedResolvers.length);
    }, 10);
  }

  return promise;
};
