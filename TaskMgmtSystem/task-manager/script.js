async function fetchTasks(){
    try{
        const response = await fetch('http://localhost:3000/tickets');
        const tasks=await response.json();
        displayTasks(tasks);

    }catch(error){
        console.error('Error Fetching tasks:',error);
    }
}

function displayTasks(tasks){
    const taskList=document.getElementById('task-list');
    taskList.innerHTML='';
    tasks.forEach(task =>{
        const taskItem=document.createElement('div');
        taskItem.className='task-item';
        taskItem.innerHTML=`
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>task:${task.status}</p>
            <p>Due Date:${task.dueDate}</p>
            <p>Priority : ${task.priority}</p>
        `;
        taskList.appendChild(taskItem);
    });
}

async function createTask(newTask){
    try{
        const response=await fetch('http://localhost:3000/tickets',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newTask),
        });
        const createTask=await response.json();
        fetchTasks();
    }catch(error){
        console.error('Error creating task:',error);
    }
}

async function updateTask(id,updatedTask){
    try{
        const response=await fetch(`http://localhost:3000/tickets/${id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(updatedTask),
        });
        fetchTasks();
    }catch(error){
        console.error('Error creating task:',error);
    }
}

async function createTask(newTask){
    try{
        await fetch(`http://localhost:3000/tickets/${id}`,{method:'DELETE'});
            
        fetchTasks();
    }catch(error){
        console.error('Error creating task:',error);
    }
}

function updatedTaskPriority(task){
    const dueDate=new Date(task.dueDate);
    const timeRemaining=dueDate-new Date();
    const minutesRemaining=timeRemaining/60000;

    if(minutesRemaining<=2){
        task.priority='High';
    }else if(minutesRemaining<=3){
        task.priority='medium';
    }else{
        task.priority='low'
    }
    return task;
}

setInterval(async ()=>{
    try{
        const response=await fetch('http://localhost:3000/tickets');
        const tasks=await response.json();

        tasks.forEach(task=>{
            const updatedTask=updatedTaskPriority(task);
            updateTask(task.id,updatedTask);
        });
    }catch(error){
        console.error('Error updating priorities:',error);
    }
},60000);
fetchTasks();