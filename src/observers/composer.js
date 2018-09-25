import { batchLoadFontFromEmail } from '../loadFont';

export default function createComposerUpdater(id) {
  let font = null;
  let userId = id;
  let fontFamily = userId + ', arial';
  // The email composer needs to be updated
  // We're going to reinsert the elements that changes to font
  function checkAppliedFont(composer) {
    const targetChildren = Array.from(composer.childNodes).filter(
      child => !(child.classList && (child.classList.contains('gmail_quote') || child.classList.contains('gmail_signature')))
    );

    if (targetChildren.every(child => child.style && child.style.fontFamily)) {
      return;
    }

    const children = targetChildren.forEach(child => {
      if (child instanceof Text) {
        const div = document.createElement('div');
        div.style.fontFamily = fontFamily;
        div.appendChild(composer.replaceChild(div, child));

        // place the caret after the text
        const sel = getSelection();
        if (sel.rangeCount > 0) {
          sel.collapse(child, child.length);
        }

        return;
      }

      if (!child.style.fontFamily) {
        child.style.fontFamily = fontFamily;
      }
    });
  }

  function checkGmailExtra(mutations, composer) {
    mutations.forEach(mutation => {
      if (
        mutation.addedNodes[0] instanceof Text &&
        mutation.target.classList && (
        mutation.target.classList.contains('gmail_quote') ||
        mutation.target.classList.contains('gmail_signature')
        )
      ) {
        const div = document.createElement('div');
        div.style.fontFamily = fontFamily;
        div.appendChild(mutation.addedNodes[0]);

        composer.insertBefore(div, mutation.target);

        // place the caret after the text
        const sel = getSelection();
        if (sel.rangeCount > 0) {
          sel.collapse(mutation.addedNodes[0], mutation.addedNodes[0].length);
        }
      }
    });
  }

  function checkStyleTag(composer) {
    console.log('check style tag', font)
    if (!font) {
      return;
    }

    console.log('has the regular link?', composer.textContent.includes(font.regular));
    if (!composer.textContent.includes(font.regular)) {
      // Adding style element to the composer with the link to the font
      const style = document.createElement('style');
      style.innerHTML = `
        @font-face {
          font-family: ${userId};
          font-style: normal;
          font-weight: normal;
          src: url(${font.regular}) format('woff2');
        }
        @font-face {
          font-family: ${userId};
          font-style: italic;
          font-weight: normal;
          src: url(${font.italic}) format('woff2');
        }
        @font-face {
          font-family: ${userId};
          font-style: normal;
          font-weight: bold;
          src: url(${font.bold}) format('woff2');
        }
        @font-face {
          font-family: ${userId};
          font-style: italic;
          font-weight: bold;
          src: url(${font.boldItalic}) format('woff2');
        }
      `;
      composer.appendChild(style);
    }
  }
  
      
  const openedComposers = [];

  // observe if the composer has been updated (e.g. text has been added)
  function observeComposerChanges(composer) {
    //TODO : Stop listening if composer closed
    const contentChangedCallback = mutations => {
      console.log('Changes for the composer', mutations);
      checkGmailExtra(mutations, composer);
      checkStyleTag(composer);
      checkAppliedFont(composer);
    };

    const observer = new MutationObserver(contentChangedCallback);
    observer.observe(composer, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    checkStyleTag(composer);
    checkAppliedFont(composer);
  }

  const updateComposerIfPresent = (container = document) => {
    const composer = container.querySelector('[contenteditable="true"]');

    if (!composer) {
      console.warn(
        'The node of the composer has not been found (looking for the contenteditable)'
      );
      return;
    } else {
      const extensionBanner = document.createElement('div');
      extensionBanner.innerHTML =
        '<div lang="itsmebanner"><font face="arial, helvetica, sans-serif" color="#aaaaaa">I send emails with a bespoke font. Click <a href="https://chrome.google.com/webstore/detail/gjoidokckjeljfgifeemgbopbgbefopm">here</a> to display it.</font><br><br></div>';
      const composerElem = openedComposers.find(e => e === container);
      composerElem.composerEvent = composer.addEventListener('keydown', e => {
        console.log('keydown')
        if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
          console.log('mail sent!');
          if(!composer.querySelector('[lang="itsmebanner"]')) {
            composer.insertBefore(extensionBanner, composer.firstChild);
          }
          composer.removeEventListener('keydown', this);
        }
      });
      container
        .querySelector('.T-I.J-J5-Ji.aoO.T-I-atl.L3')
        .addEventListener('mousedown', e => {
          console.log('click');
          console.log('mail sent!');
          console.log('mail sent!');
          if(!composer.querySelector('[lang="itsmebanner"]')) {
            composer.insertBefore(extensionBanner, composer.firstChild);
          }
        });
    }

    observeComposerChanges(composer);
  };

  const observers = [];

  return {
    setFont(id, family) {
      userId = id;
      fontFamily = id + ', arial';
      font = family;
    },

    // Observe if the text editor panel has been open
    observe() {
      // Composer response container .ip
      // Opened: .adB
      // Closed: .iq
      const responseComposerContainer = document.querySelector('.ip');

      const onComposerFound = (composer, obs) => {
        // Run an observer to know when the composer is closed
        if (openedComposers.find(c => c === composer)) {
          return;
        }
        openedComposers.push(composer);
        const observer = new MutationObserver((mutations) => {
          mutations.forEach(mutation => {
            const composerEditable = mutation.target.querySelector('[contenteditable="true"]');
            if (composerEditable) {
              composerEditable.removeEventListener('keydown', mutation.target.composerEvent);
            }
            openedComposers.splice(openedComposers.indexOf(mutation.target), 1);
          })
          
        });
        observer.observe(composer, {
          childList: true,
        });
        observers.push(observer);

        // Update composer
        updateComposerIfPresent(composer);
      };


      if (!responseComposerContainer) {
        console.error(
          'The node of the response composer container has not been found.'
        );
      } else {
        onComposerFound(responseComposerContainer);
      }


      // Watching when the container is going to be inserted
      const bodyCallback = () => {
        // create new mail composers
        const createComposerContainer = document.querySelector('.dw .no');
        const threadComposerContainers = document.querySelectorAll('.ip');
        let threadComposerContainer = null;
        threadComposerContainers.forEach(t => {
          if (
            t.querySelector('[contenteditable="true"]') &&
            !openedComposers.find(c => c === t)
          ) {
            threadComposerContainer = t;
          }
        });
        if (
          createComposerContainer !== null &&
          createComposerContainer.querySelector('[contenteditable="true"]')          
        ) {
          onComposerFound(createComposerContainer, this);
        } else if (
          threadComposerContainer !== null &&
          threadComposerContainer.querySelector('[contenteditable="true"]')
        ) {
          onComposerFound(threadComposerContainer, this);
        }
      };

      const runBodyObserver = () => {
        let bodyObserver = new MutationObserver(bodyCallback);
        bodyObserver.observe(document.body, {
          childList: true,
          attributes: true,
          subtree: true,
        });
        observers.push(bodyObserver);
      };

      window.addEventListener('hashchange', () => {
        console.log('hashchange');
        if (/(inbox|sent)\/[a-zA-Z0-9]+/.test(window.location)) {
          runBodyObserver();
        }
      });

      runBodyObserver();
    },

    disconnect() {
      console.log('disconnecting');
      observers.forEach(o => o.disconnect());
    },
  };
}
