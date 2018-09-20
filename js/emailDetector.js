let email = '';

try {
  // firefox only apparently
  if (window.GLOBALS) {
    email = window.GLOBALS[10];
  }
  else if (WIZ_global_data) {
    email = WIZ_global_data.oPEP7c;
  }

  throw new Error('shit');
} catch (err) {
  email = document.title.match(/[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]+\.[a-zA-Z0-9\.]+/);
}

const infos = document.createElement('div');
infos.id = 'prototypo-unique-gmail-email';
infos.style.display = 'none';
infos.innerHTML = email;
document.body.appendChild(infos);
