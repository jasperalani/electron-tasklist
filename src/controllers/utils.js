// Constants
const {ENV} = require('../../env');
const TMP = '../templates/';

// file index
const FILE_PATH = {
  list: 'list.html',
  create: 'create.html',
  view: 'view.html',
};

// Functions
// error handling
module.exports.handleError = (err, verbose) => {
  if ('production' !== ENV) {
    if (verbose) {
      alert(err);
    }
    console.log(`Error Occurred: ` + err);
  }
  else {
    // TODO: report error
  }
};

// DOM Effects
window.addEventListener('DOMContentLoaded', () => {

  // links
  const links = document.querySelectorAll('.link');
  for (const link of links) {
    link.addEventListener('click', (event) => {
          const fp = event.target.getAttribute('data-fp');
          if (fp !== null) {
            window.location = TMP + FILE_PATH[fp];
          }
        },
    );
  }

});