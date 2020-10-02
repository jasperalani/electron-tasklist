const {getDB} = require('../controllers/utils');
const { QueryBuilder: builder, Condition } = require(
    '@jasperalani/mysql-query-builder/js/query-builder');

window.addEventListener('DOMContentLoaded', () => {

  const list = document.querySelector('#list')

  loadList(list)

  const afterLoad = document.querySelector('.after-load')
  afterLoad.style.display = 'block'

})

const loadList = function (list) {
  const loader = document.querySelector('.loading')
  const connection = getDB(true)

  const selectQuery = builder.select(
    '*',
    'tasks',
    Condition.where(['finish', 'delete_'], ['0', '0'], '=')
  )

  connection.query(selectQuery,
      function(error, tasks, fields) {
        if (error) {
          throw error;
        }

        loader.style.display = 'none'

        for(const task of tasks){
          const listItem = document.createElement('LI')
          if(task.title !== null && task.title.length > 0){
            listItem.innerText = first25(task.title)
          }else{
            listItem.innerText = first25(task.task)
          }
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

function first25(text) {
  if(text.length < 26){
    return text
  }
  let count = 0
  let returnText = ''
  for(const letter of text){
    returnText += letter
    count++
    if(count===25){
      return returnText
    }
  }
}