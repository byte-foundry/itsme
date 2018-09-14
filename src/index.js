import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const loadGoogleFontsList = async () => {
  const response = await fetch(
    'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAMYKtd8F3neG_z4FnkjhW1R6p24njPKLI'
  );

  const data = await response.json();

  return data.items || [];
};

loadGoogleFontsList().then(data => {
  console.log('fonts', data);
});

const newDiv = document.createElement("div");
document.body.appendChild(newDiv);
ReactDOM.render(<App />, newDiv);

console.log(newDiv);

