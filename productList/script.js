async function fetchAndSortData(){
    const sortCriteria=document.getElementById('sort').value;
    const url='https://jsonplaceholder.typicode.com/users';

    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error('Network response was not ok');

        }

        const data =await response.json();
        const sortedData = sortData(data,sortCriteria);
        displayData(sortedData);
    } catch(error){
        console.error('there has been a problem with your fetch operation:',error);
    }
}

function sortData(data,criteria){
    if(criteria){
        return data.sort((a,b)=>{
            if (a[criteria]<b[criteria]) return -1;
            if (a[criteria]>b[criteria]) return 1;

            return 0;
        });
    }
    return data;
}

function displayData(data){
    const productList=document.getElementById('product-list');
    productList.innerHTML='';

    data.forEach(user =>{
        const li=document.createElement('li');
        li.innerHTML=`Name:${user.name}<br>Email:${user.email}`;
        productList.appendChild(li);

    });
}

fetchAndSortData();