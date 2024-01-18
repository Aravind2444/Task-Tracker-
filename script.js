const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskValue = taskInput.value.trim();
    const deadlineValue = deadlineInput.value;

    if (taskValue !== '' && deadlineValue !== '') {
        addTask(taskValue, deadlineValue);
        taskInput.value = '';
        deadlineInput.value = '';
    }
});

function addTask(task, deadline) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task}</span>
        <span>Deadline: ${formatDeadline(deadline)}</span>
        <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);

    // Set up a reminder with an alarm sound
    setReminder(task, deadline);
}

function formatDeadline(deadline) {
    const formattedDeadline = new Date(deadline).toLocaleString();
    return formattedDeadline;
}

function setReminder(task, deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    // Calculate time until deadline in milliseconds
    const timeUntilDeadline = deadlineDate - now;

    if (timeUntilDeadline > 0) {
        setTimeout(() => {
            // Play an alarm sound
            playAlarm();

            // Display an alert as a fallback
            alert(`Reminder: Complete task "${task}" by ${formatDeadline(deadline)}`);
        }, timeUntilDeadline);
    }
}

function playAlarm() {
    // Create an audio element and set its source to an alarm sound file
    const audio = new Audio('/alarm/Alarm-clock-ring-sound.mp3');
    audio.play();
}

function removeTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
}




