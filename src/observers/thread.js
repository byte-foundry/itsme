// import { batchLoadFontFromEmail } from './loadFont';

const observers = [];

const updateRow = (row, font) => {
  //Closed row
  if (!font) {
    return;
  }

  const mailContents = Array.from(row.querySelectorAll('.iA.g6')).concat(
    Array.from(row.querySelectorAll('.ii.gt'))
  );

  if (!mailContents.length) {
    console.warn("Couldn't find any mail content :(");
    return;
  }

  // We want to inject fonts only on the preview (not the complete mail)
  const previewDiv = row.querySelector('.adf.ads');
  if (previewDiv && previewDiv.style.display === 'none') {
    // Complete email
    const completeEmailFirstParagraph = row.querySelector('.aXjCH');
    if (
      completeEmailFirstParagraph &&
      completeEmailFirstParagraph.firstChild &&
      completeEmailFirstParagraph.firstChild.firstChild &&
      completeEmailFirstParagraph.firstChild.innerText.includes(
        'I send emails with a bespoke font.'
      )
    ) {
      completeEmailFirstParagraph.style.display = 'none';
    }
    return;
  }

  mailContents.forEach(node => {
    // Folded email
    node.style.fontFamily = font;
    node.innerText = node.innerText.replace(
      'I send emails with a bespoke font. Click here to display it!',
      ''
    );
  });
};

const observeConversation = ({ newURL }) => {
  // Detect URL of a conversation on Gmail
  if (!/(inbox|sent)\/[a-zA-Z0-9]+/.test(newURL)) {
    if (/(inbox|sent)/.test(newURL)) {
      // Strip extension headers from sent - inbox list
      Array.from(document.querySelectorAll('[draggable="true"]')).forEach(
        row => {
          const rowText = row.querySelector('.y2');
          rowText.innerText = rowText.innerText.replace(
            'I send emails with a bespoke font. Click here to display it!',
            ''
          );
        }
      );
    }
    return;
  }

  console.log('Conversation detected, applying stuff');

  const mailRows = Array.from(document.querySelectorAll('[role=listitem]'))
    .filter(mailRow => mailRow.querySelector('[email]'))
    .map(mailRow => ({
      email: mailRow.querySelector('[email]').getAttribute('email'),
      row: mailRow,
    }));

  // Initial displayed rows
  mailRows.map(async mailRow => {
    // const font = await batchLoadFontFromEmail(mailRow.email);
    const font = 'customFont, cursive';
    updateRow(mailRow.row, font);
  });

  // observe when new rows appear
  // folded: kv
  // full: h7
  const mailList = document.querySelector('[role=list]:not(.brd)');
  const observer = new MutationObserver(mutations => {
    mutations.forEach(async mutation => {
      if (
        mutation.target.parentNode !== mailList ||
        mutation.type !== 'attributes' ||
        mutation.attributeName !== 'class'
      ) {
        return;
      }

      const row = mutation.target;
      const emailElement = row.querySelector('[email]');

      if (!emailElement) {
        console.warn("Couldn't find any email on the row", row);
        return;
      }

      const email = emailElement.getAttribute('email');
      // const font = await batchLoadFontFromEmail(email);
      const font = 'customFont, cursive';

      if (!font) {
        console.warn("Couldn't find the font associated to the email", email);
        return;
      }

      updateRow(row, font);
    });
  });

  observer.observe(mailList, {
    childList: true,
    attributes: true,
    subtree: true,
  });
  observers.push(observer);
};

export default function createThreadObserver() {
  return {
    observe() {
      window.addEventListener('hashchange', observeConversation);
      observeConversation({ newURL: window.location });
    },
    disconnect() {
      observers.forEach(o => o.disconnect());
      window.removeEventListener('hashchange', observeConversation);
    },
  };
}
