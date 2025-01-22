window.onload = function () {
    displayArchivedTodos();

    document.getElementById('priorityFilter').addEventListener('change', displayArchivedTodos);
    document.getElementById('statusFilter').addEventListener('change', displayArchivedTodos);
};

function displayArchivedTodos() {
    const archive = JSON.parse(localStorage.getItem('archive')) || [];
    const tbody = document.querySelector('#archiveTable tbody');
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    tbody.innerHTML = ''; // Clear previous entries

    archive.forEach((todo, index) => {
        if ((priorityFilter === 'all' || todo.priority === priorityFilter) &&
            (statusFilter === 'all' || todo.status === statusFilter)) {
            
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = todo.title;

            const priorityCell = document.createElement('td');
            priorityCell.textContent = todo.priority;
            priorityCell.style.backgroundColor = todo.priority === 'medium' ? 'rgb(255, 255, 0)' : 
                                                  todo.priority === 'high' ? 'rgb(255, 0, 0)' : '';

            const statusCell = document.createElement('td');
            statusCell.textContent = todo.status;

            const actionsCell = document.createElement('td');
            const restoreBtn = document.createElement('button');
            restoreBtn.textContent = 'Restore';
            restoreBtn.addEventListener('click', () => {
                restoreArchived(index);
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteArchived(index);
            });

            actionsCell.appendChild(restoreBtn);
            actionsCell.appendChild(deleteBtn);

            row.appendChild(titleCell);
            row.appendChild(priorityCell);
            row.appendChild(statusCell);
            row.appendChild(actionsCell);

            tbody.appendChild(row);
        }
    });
}

function restoreArchived(index) {
    const archive = JSON.parse(localStorage.getItem('archive')) || [];
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.push(archive.splice(index, 1)[0]);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('archive', JSON.stringify(archive));

    displayArchivedTodos();
}

function deleteArchived(index) {
    const archive = JSON.parse(localStorage.getItem('archive')) || [];
    archive.splice(index, 1);
    localStorage.setItem('archive', JSON.stringify(archive));

    displayArchivedTodos();
}
