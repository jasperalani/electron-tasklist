const mysql = require('mysql');
const builder = QueryBuilder = require(
    '@jasperalani/mysql-query-builder/js/query-builder');

window.addEventListener('DOMContentLoaded', () => {

  const list = document.querySelector('#list')

  loadList(list)

  const tasks = document.querySelectorAll('.task')

  if(tasks !== null){
    for(const task of tasks){
      task.addEventListener('click', function () {
        window.location = 'view.html'
      })
    }
  }

  const afterLoad = document.querySelector('.after-load')
  afterLoad.style.display = 'block'

})

const loadList = function (list) {
  const loader = document.querySelector('.loading')

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

        loader.style.display = 'none'

        for(const task of tasks){
          const listItem = document.createElement('LI')
          listItem.innerText = task.task
          listItem.classList.add('link', 'hover')
          listItem.setAttribute('data-id', task.id)
          listItem.addEventListener('click', function() {
            const taskId = this.getAttribute('data-id')
            window.location = '../templates/view.html?id=' + taskId;
          })
          list.prepend(listItem)
        }

      });

  connection.end();
}