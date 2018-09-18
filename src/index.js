import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// const loadGoogleFontsList = async () => {
//   const response = await fetch(
//     'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAMYKtd8F3neG_z4FnkjhW1R6p24njPKLI'
//   );

//   const data = await response.json();

//   return data.items || [];
// };

// loadGoogleFontsList().then(data => {
//   console.log('fonts', data);
// });

const loadingNode = document.getElementById('loading');

const observer = new MutationObserver((mutationsList) => {
  for(var mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      console.log(mutation.attributeName);
      if (mutation.attributeName !== 'style') return;

      observer.disconnect();

      // Gmail menu bar above the email list
      // Since it's a specific id, it might not change in the future
      const menuBar = document.getElementById(':5');
      const actions = menuBar.querySelector('.bzn :first-child');

      // Adding the app into the menu bar
      const newDiv = document.createElement('div');
      actions.appendChild(newDiv);

      ReactDOM.render(<App />, newDiv);
    }
  }
});

observer.observe(loadingNode, { attributes: true });
