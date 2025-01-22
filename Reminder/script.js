let reminders=[];
let reminderTimeouts={};

document.getElementById('addBtn').addEventListener('click',addReminder);

function addReminder(){
    const reminderText=document.getElementById('reminderText').value;
    const reminderTime=document.getElementById('reminderTime').value;

    if(reminderText==="" || reminderTime===""){
        alert("please Enter details first");
        return;
    } 
    
    const reminderId=Date.now();
    const timeLeft=new Date(reminderTime).getTime()-new Date().getTime();


    if (timeLeft<0){
        alert("Please select future time");
        return;
    }

    const reminder={id:reminderId,Text:reminderText,time:reminderTime};

    reminders.push(reminder);
    displayReminders();

    reminderTimeouts[reminderId]=setTimeout(()=>{
        alert(`Reminder:${reminderText}`);
        deleteReminder(reminderId);

    },timeLeft);
}

function displayReminders(){
    const reminderList=document.getElementById('reminderList');
    reminderList.innerHTML='';

    reminders.forEach((reminder)=>{
        const reminderElements=document.createElement('div');
        reminderElements.classList.add('reminder');
        reminderElements.innerHTML=`
            <p>${reminder.Text}-${new Date(reminder.time).toLocaleString()}</p>
            <button onclick="editReminder(${reminder.id})">Edit</button>
            <button onclick="deleteReminder(${reminder.id})">Delete</button>
        `;

        reminderList.appendChild(reminderElements);
    });
}

function deleteReminder(reminderId){
    reminders=reminders.filter(reminder=>reminder.id !==reminderId);
    clearTimeout(reminderTimeouts[reminderId]);
    displayReminders();
}

function editReminder(reminderId){
    const reminder=reminders.find(r=>r.id === reminderId);
    document.getElementById('reminderText').value=reminder.text;
    document.getElementById('reminderTime').value==reminder.time;
    deleteReminder(reminderId);
}
