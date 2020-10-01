const mysql = require('mysql');
const builder = QueryBuilder = require(
    '@jasperalani/mysql-query-builder/js/query-builder');

window.addEventListener('DOMContentLoaded', () => {

  const task = document.querySelector('#task');
  const create = document.querySelector('#create');

  create.addEventListener('click', () => {
    if (task.value === '') {
      alert('Task cannot be empty');
    }

    const insertQuery = builder.insert(['task'], [task.value], 'tasks');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'electron-tasklist',
    });

    connection.connect();

    connection.query(insertQuery,
        function(error, results, fields) {
          if (error) {
            throw error;
          }else{
            window.location = 'list.html'
          }
        });

    connection.end();
  });

  task.addEventListener('keypress', (event) => {
    if (event.target.value.length === 255 || event.target.value.length > 255) {
      event.preventDefault()
    }
  })

})