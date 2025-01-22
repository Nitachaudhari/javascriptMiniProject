const apiUrl='https://jsonplaceholder.typicode.com/todos';
const todosPerPage=5;
let currentPAge=1;

async function fetchTodos(page){
    try{
        const response=await fetch(`${apiUrl}?_limit=${todosPerPage}&_page=${page}`);
        if(!response.ok) throw new Error('Network response was not ok');
        const todos= await response.json();
        return todos;
    }catch(error){
        console.error('Fetch Error:',error);
    }
}

function renderTodos(todos){
    const todoList=document.getElementById('todo-list');
    todoList.innerHTML='';

    todos.forEach(todo =>{
        const todoItem=document.createElement('div');
        todoItem.classList.add('todo-item');

        const checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.id=`todo-${todo.id}`;
        checkbox.checked=todo.completed;

        checkbox.addEventListener('change',()=>{
            todo.completed=checkbox.checked;
            todoItem.classList.toggle('completed',checkbox.checked);
        });
        
        const label = document.createElement('label');
        label.htmlFor=`todo-${todo.id}`;
        label.textContent=todo.title;

        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
        todoList.appendChild(todoItem);
    });
}


function renderPagination(totalTodos){
    const pagination=document.getElementById('pagination');
    pagination.innerHTML='';

    const totalPages=Math.ceil(totalTodos/todosPerPage);

    for(let i=1;i<=totalPages;i++){
        const button=document.createElement('button');
        button.textContent=i;
        button.addEventListener('click',()=>{
            currentPAge=i;
            loadTodos();
        });
        pagination.appendChild(button);
    }
}


async function loadTodos(){
    const todos= await fetchTodos(currentPAge);
    renderTodos(todos);
    renderPagination(200);
}

loadTodos();