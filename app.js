const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');

// Fetch tasks from the API
function getTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            taskList.innerHTML = '';
            data.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task;
                li.addEventListener('click', () => deleteTask(index));
                taskList.appendChild(li);
            });
        });
}

// Add a new task
function addTask() {
    const task = taskInput.value;
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task })
    }).then(response => response.json())
      .then(() => {
          taskInput.value = '';
          getTasks();
      });
}

// Delete a task
function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
    }).then(response => response.json())
      .then(() => getTasks());
}

// Initial fetch of tasks
getTasks();
