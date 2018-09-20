function gup(url, name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\#&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if (results == null) return '';
  else return results[1];
}

async function validateToken(token) {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token
  );

  return response.text();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type !== 'getGoogleToken') {
    return;
  }

  const redirectURL = chrome.identity.getRedirectURL();
  const clientID =
    '245602847933-kpiga4d7u65pb105lr8ede4vo5csd9ic.apps.googleusercontent.com';
  const scopes = ['email', 'profile'];
  let authURL = 'https://accounts.google.com/o/oauth2/auth';
  authURL += `?client_id=${clientID}`;
  authURL += `&response_type=token`;
  authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
  authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

  if (request.email) {
    authURL += `&login_hint=${encodeURIComponent(request.email)}`;
  }

  chrome.identity.launchWebAuthFlow({ url: authURL, interactive: !!request.interactive }, async url => {
    const accessToken = gup(url, 'access_token');

    sendResponse(accessToken);
  });

  return true; // use sendResponse async
});
