import TaskManager from '/taskmanager.js';

const taskManager = new TaskManager();
// Select the form and the task list
const form = document.querySelector('#task-form');

taskManager.render();

const taskInput = document.querySelector('#task-input');
taskInput.setCustomValidity('Even one word...');
taskInput.addEventListener('input', () => {
    taskInput.setCustomValidity('');
  });
// Add an 'onsubmit' event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskName = form.querySelector('#task-input').value;

    taskManager.addTask(taskName);
    taskManager.render();
    form.querySelector('#task-input').value = '';
  });
