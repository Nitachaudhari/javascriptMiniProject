document.getElementById('registrationForm').addEventListener('submit',function(event){
    event.preventDefault();

    document.getElementById('nameError').textContent='';
    document.getElementById('emailError').textContent='';
    document.getElementById('passwordError').textContent='';


    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    let valid =true;

    if (!/^[a-zA-Z]+$/.test(name)){
        document.getElementById('nameError').textContent='Name Must contains only characters';
        valid=false;
    }

    if(!validateEmail(email)){
        document.getElementById('emailError').textContent="Invalid email format.";
        valid=false;
    }

    if (password.length<8){
        document.getElementById('passwordError').textContent="password must be of 8 character";
        valid=false;
    }

    if (valid){
        addResult(name,email);
        document.getElementById('registrationForm').reset();

    }

});

function validateEmail(email){
    const res= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return res.test(email);
}

let result=[];

function addResult(name,email){
    result.push({name,email});
    displayResults();
}

function displayResults(){
    const resultDiv=document.getElementById('result');
    resultDiv.innerHTML='<h1>Result:</h1>'

    result.forEach(res =>{
        resultDiv.innerHTML += `<p> ${res.name} (${res.email})`;
    });
}

document.getElementById('sortButton').addEventListener('click',function(){
    result.sort((a,b)=>a.name.localeCompare(b.name));
    displayResults();
});