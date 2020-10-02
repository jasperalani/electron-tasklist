const { getDB, validateTask } = require('../controllers/utils')
const { QueryBuilder } = require(
  '@jasperalani/mysql-query-builder/js/query-builder')

window.addEventListener('DOMContentLoaded', () => {

  const task = document.querySelector('#task')
  const create = document.querySelector('#create')

  create.addEventListener('click', () => {

    if(!validateTask(task)) {
      return
    }

    const insertQuery = QueryBuilder.insert(['task'], [task.value], 'tasks')

    const connection = getDB(true)

    connection.query(insertQuery,
      function (error, results, fields) {
        if (error) {
          throw error
        } else {
          window.location = 'list.html'
        }
      })

    connection.end()
  })

  task.addEventListener('keypress', (event) => {
    if (event.target.value.length === 255 || event.target.value.length > 255) {
      event.preventDefault()
    }
  })

})