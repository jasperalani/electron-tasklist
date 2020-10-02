const mysql = require('mysql')


// Constants
const {ENV} = require('../../env');
const TMP = '../templates/';

// file index
module.exports.FILE_PATH = {
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
module.exports.validateTask = (task, title = null) => {
  if (task.value === '') {
    alert('Task cannot be empty')
    return false
  }
  if (task.value.length > 255) {
    alert('Task max 255 chars')
    return false
  }
  if(title !== null){
    if (title.value.length > 255) {
      alert('Title max 255 char')
      return false
    }
  }
  return true
}
module.exports.getDB = (connected = false) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'electron-tasklist',
  });
  if(connected){
    connection.connect();
  }
  return connection
}

// DOM Effects
window.addEventListener('DOMContentLoaded', () => {

  // links
  const links = document.querySelectorAll('.link');
  for (const link of links) {
    link.addEventListener('click', (event) => {
          const fp = event.target.getAttribute('data-fp');
          if (fp !== null) {
            window.location = TMP + module.exports.FILE_PATH[fp];
          }
        },
    );
  }

});
