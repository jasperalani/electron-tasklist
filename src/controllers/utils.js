// Constants
const {ENV} = require('../../env');
const TMP = '../templates/';

// file index
const FILE_PATH = {
  list: 'list.html',
  create: 'create.html',
};

// Functions
// error handling
module.exports.handleError = (err, verbose) => {
  if ('production' !== ENV) {
    if (verbose) alert(err)
    console.log(`Error Occurred: ` + err)
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
    link.addEventListener('click', async (event) =>
        window.location = TMP +
            FILE_PATH[await event.target.getAttribute('data-fp')]
    )
  }

});