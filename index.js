const inputField = document.querySelector('input');
const tagField = document.querySelector('input[name="tag"]');
const pushBtn = document.querySelector('#push');
const tasksContainer = document.querySelector('#tasks');

document.addEventListener('DOMContentLoaded', getTodos);

pushBtn.addEventListener('click', () => {
  if (!inputField.value) {
    alert('Please enter a task!');
    return;
  }

  const task = createTask({
    name: inputField.value,
    tag: tagField.value,
  });
  tasksContainer.appendChild(task);
  saveToLocalTodos({
    name: inputField.value,
    tag: tagField.value,
  });
  inputField.value = '';
  tagField.value = '';
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

function createTask({ name, tag }) {
  const task = document.createElement('div');
  task.classList.add('task');

  const taskText = document.createElement('span');
  taskText.id = 'taskName';
  taskText.textContent = name;
  task.appendChild(taskText);

  const tagText = document.createElement('span');
  tagText.id = 'tagName';
  tagText.textContent = tag;
  task.appendChild(tagText);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteBtn.addEventListener('click', () => {
    removeFromLocalTodos({ name, tag });
    task.remove();
  });
  task.appendChild(deleteBtn);

  task.addEventListener('click', () => {
    task.classList.toggle('completed');
  });

  return task;
}

function removeFromLocalTodos({ name, tag }) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const taskIndex = todos.findIndex(todo => todo.name === name && todo.tag === tag);
  todos.splice(taskIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}