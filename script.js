// Select the form and the task list
const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');

// Listen for form submissions
form.addEventListener('submit', (event) => {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the task name from the form
    const taskInput = form.querySelector('#task-input');
    const taskName = taskInput.value;
    if(taskName === '') {
        return;
    }
    // Create a new task card
    const taskCard = createTaskCard(taskName);

    // Add the task card to the task list
    taskList.appendChild(taskCard);

    // Clear the form
    taskInput.value = '';
});

const createTaskCard = (taskName) => {
    // Create the task card element
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Add a random color to the task card
    // const colors = ['orange', 'yellow', 'green', 'blue', 'indigo'];
    // const randomColor = colors[Math.floor(Math.random() * colors.length)];
    taskCard.style.backgroundColor = '#41B3A3';

    // Create a div for the task name and buttons
    const taskTop = document.createElement('div');
    taskTop.classList.add('task-top');

    // Add the task name to the taskTop div
    const taskNameElement = document.createElement('span');
    taskNameElement.classList.add('task-name');
    taskNameElement.textContent = taskName;
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

    taskTop.appendChild(taskControls);

    // Add the taskTop div to the task card
    taskCard.appendChild(taskTop);

    // Add the timer to the task card
    const timer = document.createElement('span');
    timer.classList.add('task-timer');
    timer.textContent = '00:00:00';
    taskCard.appendChild(timer);

    let intervalId = 0;
    let startTime;
    let elapsedTime = 0;
    playButton.addEventListener('click', () => {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    });

    stopButton.addEventListener('click', () => {
        clearInterval(intervalId);
    });

    return taskCard;
}
