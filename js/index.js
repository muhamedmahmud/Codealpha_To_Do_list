document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = createTaskItem(taskText);

        taskList.appendChild(taskItem);
        taskInput.value = '';

        saveTasks();
    }

    function createTaskItem(taskText, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        if (completed) {
            taskItem.classList.add('completed');
        }

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '&#10003;'; // Checkmark symbol
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '&#10005;'; // Cross symbol
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        taskItem.appendChild(taskContent);
        taskItem.appendChild(buttonContainer);

        return taskItem;
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task').forEach(taskItem => {
            const taskText = taskItem.querySelector('span').textContent;
            const completed = taskItem.classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    }
});
