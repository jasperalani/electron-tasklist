const url = require('url')
const { getDB, validateTask, FILE_PATH } = require('../controllers/utils')
const { QueryBuilder, Condition } = require(
  '@jasperalani/mysql-query-builder/js/query-builder')

window.addEventListener('DOMContentLoaded', () => {

  const afterLoad = document.querySelector('.after-load')
  const task = document.querySelector('#task')
  const created = document.querySelector('.created')
  const loader = document.querySelector('.loader')
  const title = document.querySelector('#title')

  let parsedUrl = url.parse(window.location.href)
  const taskId = parsedUrl.query.split('=')[1]

  loadTask(taskId, afterLoad, task, created, loader, title)

  const actionElements = document.querySelectorAll('.action')
  for (const action of actionElements) {
    switch (action.getAttribute('data-action')) {
      case 'save':
        action.addEventListener('click', () => {
          actions.save(task, title, taskId)
        })
        break
      case 'finish':
        action.addEventListener('click', () => {
          actions.finish(taskId)
        })
        break
      case 'delete':
        action.addEventListener('click', () => {
          actions.delete(taskId)
        })
        break
    }
  }

})

const actions = {
  save: (task, title, taskId) => {
    validateTask(task)
    const updateSql = QueryBuilder.update(
      ['task', 'title'],
      [task.value, title.value],
      Condition.where('id', taskId, '='),
      'tasks',
    )
    manipulateDatabase(updateSql)
    alert('Saved')
  },
  finish: (taskId) => {
    const finishSql = QueryBuilder.update(
      ['finish', 'finished'],
      ['1', new Date().toISOString().slice(0, 19).replace('T', ' ')],
      Condition.where('id', taskId, '='),
      'tasks'
    )
    manipulateDatabase(finishSql)
    alert('Finished')
    window.location = FILE_PATH.list
  },
  delete: (taskId) => {
    const deleteSql = QueryBuilder.update(
      ['delete_', 'deleted'],
      ['1', new Date().toISOString().slice(0, 19).replace('T', ' ')],
      Condition.where('id', taskId, '='),
      'tasks'
    )
    manipulateDatabase(deleteSql)
    alert('Deleted')
    window.location = FILE_PATH.list
  },
}

const loadTask = (taskId, afterLoad, task, created, loader, title) => {
  const connection = getDB(true)

  const selectQuery = QueryBuilder.select('*', 'tasks', 'id = ' + taskId)

  connection.query(selectQuery,
    function (error, tasks, fields) {
      if (error) {
        throw error
      }

      title.value = tasks[0].title
      task.value = tasks[0].task
      created.innerText = tasks[0].created

    })

  connection.end()

  loader.style.display = 'none'
  afterLoad.style.display = 'block'

}

const manipulateDatabase = (sql) => {
  const connection = getDB(true)
  connection.query(sql,
    function (error, tasks, fields) {
      if (error) {
        throw error
      }
    })

  connection.end()
}