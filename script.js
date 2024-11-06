const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = ''; 
}


function deleteTask(button) {
    const li = button.parentElement.parentElement;
    taskList.removeChild(li);
}


function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('span').textContent;
    const newTask = prompt('Edit task:', taskText);

    if (newTask !== null && newTask !== '') {
        li.querySelector('span').textContent = newTask;
    }
}