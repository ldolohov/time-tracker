const createTaskCard = (taskName) => {
    // Create the task card element
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Add a random color to the task card
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    taskCard.style.backgroundColor = randomColor;

    // Add the task name to the task card
    const taskNameElement = document.createElement('span');
    taskNameElement.classList.add('task-name');
    taskNameElement.textContent = taskName;
    taskCard.appendChild(taskNameElement);

    // Add the timer to the task card
    const timer = document.createElement('span');
    timer.classList.add('task-timer');
    timer.textContent = '00:00:00';
    taskCard.appendChild(timer);

    // Add the play and stop buttons to the task card
    const playButton = document.createElement('i');
    playButton.classList.add('fas', 'fa-play');
    taskCard.appendChild(playButton);

    const stopButton = document.createElement('i');
    stopButton.classList.add('fas', 'fa-stop');
    taskCard.appendChild(stopButton);

    return taskCard;
}
