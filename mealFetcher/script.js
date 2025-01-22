async function getCategoryData(){
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(response =>{
        if (!response.ok){
            return Promise.reject('netwrok responce not ok');
        }
        return response.json();
    })
    .then(data => {
        displayResults(data.meals);
    })
    .catch(error=>{
        displayError("Something went wrong"+error);
    });
}

async function getIngredientData() {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
    .then(response=>{
        if(!response.ok){
            return Promise.reject('network responce not ok');
        }
        return response.json();
    })
    .then(data =>{
        displayResults(data.meals);
    })
    .catch(error =>{
        displayError("Something went wrong"+error);
    });
}

function displayResults(meals){
    const resultDiv =document.getElementById('results');
    resultDiv.innerHTML='';

    if(meals){
        meals.forEach(meal => {
            const mealItem =document.createElement('div');
            mealItem.innerHTML=`
                <strong>${meal.strMeal}</strong><br>
                <img src="${meal.strMealThumb}" alt="{meal.strMeal}" width="100"><br><br>
            `
            resultDiv.append(mealItem);
        });
    }else{
        resultDiv.innerHTML="No meals found.";
    }
}

function displayError(message){
    const resultDiv=document.getElementById('results');
    resultDiv.innerHTML=message;
}

document.getElementById('get-category-data').addEventListener('click',getCategoryData);
document.getElementById('get-ingredient-data').addEventListener('click',getIngredientData);