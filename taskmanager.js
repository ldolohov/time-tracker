class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(name) {
    const task = {
      name,
      elapsedTime: 0,
      intervalId: null,
    };
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  render() {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';
    for (const task of this.tasks) {
      const taskCard = this.createTaskCard(task);
      taskList.appendChild(taskCard);
    }
  }

  createTaskCard(task) {
    // Create the task card
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    taskCard.style.backgroundColor = '#41B3A3';

    // Create a div for the task name and buttons
    const taskTop = document.createElement('div');
    taskTop.classList.add('task-top');

    // Add the task name to the taskTop div
    const taskNameElement = document.createElement('span');
    taskNameElement.classList.add('task-name');
    taskNameElement.textContent = task.name;
    taskTop.appendChild(taskNameElement);

    // Add the play and stop buttons to the taskTop div
    const taskControls = document.createElement('div');
    taskControls.classList.add('task-controls');

    const playButton = document.createElement('i');
    playButton.classList.add('fas', 'fa-play');
    taskControls.appendChild(playButton);

    const stopButton = document.createElement('i');
    stopButton.classList.add('fas', 'fa-stop');
    taskControls.appendChild(stopButton);

    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fas', 'fa-trash');
    taskControls.appendChild(deleteButton);

    taskTop.appendChild(taskControls);

    // Add the taskTop div to the task card
    taskCard.appendChild(taskTop);

    let startTime;
    let { elapsedTime } = task;

    // Add the timer to the task card
    const timer = document.createElement('span');
    timer.classList.add('task-timer');
    const hours = Math.floor(task.elapsedTime / 3600000);
    const minutes = Math.floor((task.elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((task.elapsedTime % 60000) / 1000);
    timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    taskCard.appendChild(timer);

    playButton.addEventListener('click', () => {
      startTime = Date.now() - elapsedTime;
      task.intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }, 1000);
    });

    stopButton.addEventListener('click', () => {
      clearInterval(task.intervalId);
      task.elapsedTime = elapsedTime;
      this.saveTasks();
    });

    deleteButton.addEventListener('click', () => {
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);

      this.saveTasks();

      this.render();
    });

    return taskCard;
  }
}

export default TaskManager;
