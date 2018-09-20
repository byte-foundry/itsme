import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const loadingNode = document.getElementById('loading');

const observer = new MutationObserver((mutationsList) => {
  for(var mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      if (mutation.attributeName !== 'style') return;

      observer.disconnect();

      // Gmail action bar on top of the page
      // Since it's a specific class, it might change in the future
      // like everything
      const actions = document.querySelector('.gb_Dc.gb_jb.gb_Cc.gb_7d');

      // Adding the app into the menu bar
      const newDiv = document.createElement('div');
      actions.insertBefore(newDiv, actions.firstChild);

      ReactDOM.render(<App />, newDiv);
    }
  }
});

observer.observe(loadingNode, { attributes: true });
