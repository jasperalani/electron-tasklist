const mysql = require('mysql');
const builder = QueryBuilder = require(
    '@jasperalani/mysql-query-builder/js/query-builder');

window.addEventListener('DOMContentLoaded', () => {

  const list = document.querySelector('#list')

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'electron-tasklist',
  });

  connection.connect();

  const selectQuery = builder.select('*', 'tasks')

  connection.query(selectQuery,
      function(error, tasks, fields) {
        if (error) {
          throw error;
        }

        for(const task of tasks){
          const listItem = document.createElement('LI')
          listItem.innerText = task.task
          listItem.classList.add('task')
          listItem.setAttribute('data-id', task.id)
          list.prepend(listItem)
        }


      });

  connection.end();

})