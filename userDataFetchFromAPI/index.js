//function for fetch user data
function fetchUsers(){ 
    fetch('https://reqres.in/api/users?page=2') //fetch data from regres
    .then(response =>{
        if (!response.ok){
            throw new console.error(('network responces not ok'));
            
        }
        return response.json();
    })
    .then(data =>{
        displayUsers(data.data);
    })
    .catch(error=>{
        displayError("Something went wrong" +error);
    });
}
// function for display user data on webpage
function displayUsers(users){
    const resultsDiv =document.getElementById('results');
    resultsDiv.innerHTML = ''; //clear preious results

    users.forEach(user =>{
        const userCard =document.createElement('div'); //created new div to show fetch data on webpage
        userCard.className='user-card';
        userCard.innerHTML=`
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>Email:${user.email}</p>
        `;
        resultsDiv.appendChild(userCard);
    });
}

//function for display errors
function displayError(message){
    const resultsDiv=document.getElementById('results');
    resultsDiv.innerHTML=`<p class="error>${message}</p>`;
}

//event listner for fetch button
document.getElementById('fetch-user').addEventListener('click',fetchUsers);