const userContainer=document.getElementById('user-container');
const prevBtn=document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentPage=1;
const limit=6;
const totalPages=5;

async function fetchUsers(page){
    try{
        const response=await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
        if(!response.ok) throw new Error('Network repsonse was not ok');
        const data = await response.json();
        displayUsers(data);

    }catch(error){
        console.error('fetch error:',error);
        userContainer.innerHTML='<p>Error loading users.</p>';

    }
}

function displayUsers(users){
    userContainer.innerHTML='';
    users.forEach(user =>{
        const userCard=document.createElement('div');
        userCard.className='user-card';
        userCard.innerHTML=`<h3>${user.name}</h3><p>Email:${user.email}</p><p>${user.phone}</p>`;
        userContainer.appendChild(userCard);
    });
}

function upadateButtons(){
    prevBtn.disabled=currentPage===1;
    nextBtn.disabled=currentPage===totalPages;

}

prevBtn.addEventListener('click',()=>{
    if(currentPage >1){
        currentPage--;
        fetchUsers(currentPage);
        upadateButtons();
    }
});

nextBtn.addEventListener('click',()=>{
    if(currentPage<totalPages){
        currentPage++;
        fetchUsers(currentPage);
        upadateButtons();
    }
});

fetchUsers(currentPage);