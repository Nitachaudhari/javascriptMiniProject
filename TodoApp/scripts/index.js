document.getElementById('addTodoBtn').addEventListener('click', () => {
    const title = document.getElementById('todoTitle').value;
    const priority = document.getElementById('todoPriority').value;

    if (!title) {
        alert('Todo cannot be empty!');
        return;
    }

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ title, priority, status: 'Pending' });
    localStorage.setItem('todos', JSON.stringify(todos));

    displayTodos();
});

function displayTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const tbody = document.querySelector('#todoTable tbody');
    tbody.innerHTML = ''; // Clear previous entries

    todos.forEach((todo, index) => {
        const row = document.createElement('tr');

        // Create table cells for each column
        const titleCell = document.createElement('td');
        titleCell.textContent = todo.title;

        const priorityCell = document.createElement('td');
        priorityCell.textContent = todo.priority;
        priorityCell.style.backgroundColor = todo.priority === 'medium' ? 'rgb(255, 255, 0)' : 
                                              todo.priority === 'high' ? 'rgb(255, 0, 0)' : '';

        const statusCell = document.createElement('td');
        const statusBtn = document.createElement('button');
        statusBtn.textContent = todo.status;
        statusBtn.addEventListener('click', () => {
            todo.status = todo.status === 'Pending' ? 'Completed' : 'Pending';
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });
        statusCell.appendChild(statusBtn);

        const actionsCell = document.createElement('td');
        const archiveBtn = document.createElement('button');
        archiveBtn.textContent = 'Archive';
        archiveBtn.addEventListener('click', () => {
            archiveTodo(index);
        });
        actionsCell.appendChild(archiveBtn);

        // Append all cells to the row
        row.appendChild(titleCell);
        row.appendChild(priorityCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
    });
}

function archiveTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const archive = JSON.parse(localStorage.getItem('archive')) || [];

    archive.push(todos.splice(index, 1)[0]); // Remove from todos and add to archive
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('archive', JSON.stringify(archive));

    displayTodos();
}

// Initialize display
displayTodos();
