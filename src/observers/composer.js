export default function createComposerUpdater(userFont) {
  const fontFamily = userFont + ', cursive';
  // The email composer needs to be updated
  // We're going to reinsert the elements that changes to font
  function checkAppliedFont(composer) {
    const targetChildren = Array.from(composer.childNodes).filter(
      child => !(child.classList && child.classList.contains('gmail_extra'))
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
        mutation.target.classList &&
        mutation.target.classList.contains('gmail_extra')
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
    if (!composer.textContent.includes('localhost:5555')) {
      // Adding style element to the composer with the link to the font
      const style = document.createElement('style');
      style.innerHTML = `
        @import url('http://localhost:5555/${userFont}');
      `;
      composer.appendChild(style);
    }
  }

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
      console.log('composer found');
      const extensionBanner = document.createElement('div');
      extensionBanner.innerHTML =
        '<div lang="itsmebanner"><hr/><font face="arial, helvetica, sans-serif" color="#000000">I send emails with a bespoke font. <u>Click here to display it!</u></font></div>';

      composer.addEventListener('keydown', e => {
        console.log('keydown');
        if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
          console.log('mail sent!');
          composer.insertBefore(extensionBanner, composer.firstChild);
        }
      });
      container
        .querySelector('.T-I.J-J5-Ji.aoO.T-I-atl.L3')
        .addEventListener('mousedown', e => {
          console.log('click');
          console.log('mail sent!');
          composer.insertBefore(extensionBanner, composer.firstChild);
        });
    }

    observeComposerChanges(composer);
  };

  const observers = [];

  return {
    // Observe if the text editor panel has been open
    observe() {
      console.log('hello there');
      // Composer response container .ip
      // Opened: .adB
      // Closed: .iq
      const responseComposerContainer = document.querySelector('.ip');

      if (!responseComposerContainer) {
        console.error(
          'The node of the response composer container has not been found.'
        );
      } else {
        const observer = new MutationObserver(() =>
          updateComposerIfPresent(responseComposerContainer)
        );
        observer.observe(responseComposerContainer, {
          attributes: true,
        });
        observers.push(observer);
        updateComposerIfPresent(responseComposerContainer);
      }

      const openedComposers = [];

      const onComposerFound = (composer, obs) => {
        // Run an observer to know when the composer is closed
        const observer = new MutationObserver(() => {
          openedComposers.splice(openedComposers.indexOf(composer), 1);
        });
        observer.observe(composer, {
          childList: true,
        });
        observers.push(observer);
        
        // Update composer
        updateComposerIfPresent(composer);
      };


      // Watching when the container is going to be inserted
      const bodyCallback = () => {
        // create new mail composers
        const createComposerContainer = document.querySelector('.dw .no');
        const threadComposerContainers = document.querySelectorAll('.ip');
        let threadComposerContainer = null;
        threadComposerContainers.forEach(t => {
          if (t.querySelector('[contenteditable="true"]') && !openedComposers.find(c => c === t)) {
            threadComposerContainer = t;
          }
        });
        if (
          createComposerContainer !== null &&
          createComposerContainer.querySelector('[contenteditable="true"]') &&
          !openedComposers.find(c => c === createComposerContainer)
        ) {
          openedComposers.push(createComposerContainer);
          onComposerFound(createComposerContainer, this);
        } else if (
          threadComposerContainer !== null &&
          threadComposerContainer.querySelector('[contenteditable="true"]') &&
          !openedComposers.find(c => c === threadComposerContainer)
        ) {
          openedComposers.push(threadComposerContainer);
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
      }

      

      window.addEventListener('hashchange', () => {
        console.log('hashchange')
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
