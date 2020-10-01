const url = require('url');
const mysql = require('mysql');
const querystring = require('querystring')
const builder = QueryBuilder = require(
    '@jasperalani/mysql-query-builder/js/query-builder');

window.addEventListener('DOMContentLoaded', () => {

  const afterLoad = document.querySelector('.after-load')
  const task = document.querySelector('#task')
  const created = document.querySelector('.created')

  const loader = document.querySelector('.loader')

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'electron-tasklist',
  });

  connection.connect();

  let parsedUrl = url.parse(window.location.href);
  const taskId = parsedUrl.query.split('=')[1]

  const selectQuery = builder.select('*', 'tasks', "id = " + taskId)

  connection.query(selectQuery,
      function(error, tasks, fields) {
        if (error) {
          throw error;
        }

        task.value = tasks[0].task
        created.innerText = tasks[0].created

      });

  connection.end();

  loader.style.display = 'none'
  afterLoad.style.display = 'block'

});