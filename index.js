const inputField = document.querySelector('input');
const pushBtn = document.querySelector('#push');
const tasksContainer = document.querySelector('#tasks');

document.addEventListener('DOMContentLoaded', getTodos);

pushBtn.addEventListener('click', () => {
  if (!inputField.value) {
    alert('Please enter a task!');
    return;
  }

  const task = createTask(inputField.value);
  tasksContainer.appendChild(task);
  saveToLocalTodos(inputField.value);
  inputField.value = '';
});

function getTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => tasksContainer.appendChild(createTask(todo)));
}

function saveToLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTask(taskName) {
  const task = document.createElement('div');
  task.classList.add('task');

  const taskText = document.createElement('span');
  taskText.id = 'taskName';
  taskText.textContent = taskName;
  task.appendChild(taskText);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteBtn.addEventListener('click', () => {
    removeFromLocalTodos(taskName);
    task.remove();
  });
  task.appendChild(deleteBtn);

  task.addEventListener('click', () => {
    task.classList.toggle('completed');
  });

  return task;
}

function removeFromLocalTodos(taskName) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const taskIndex = todos.indexOf(taskName);
  todos.splice(taskIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}