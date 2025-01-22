const products = [];

document.getElementById('addProduct').addEventListener('click', () => {

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const rating = parseFloat(document.getElementById('productRating').value);

    if (name && !isNaN(price) && !isNaN(rating)) {
        products.push({ name, price, rating });
        updateGraph();
        clearInputs();
    }
});

document.getElementById('sortPrice').addEventListener('click', () => {
    products.sort((a, b) => a.price - b.price);
    updateGraph();
});

document.getElementById('sortRating').addEventListener('click', () => {
    products.sort((a, b) => a.rating - b.rating);
    updateGraph();
});

function updateGraph() {
    const barGraph = document.getElementById('barGraph');
    barGraph.innerHTML = '';

    products.forEach(product => {
        const priceBar=document.createElement('div');
        priceBar.className = 'bar price';
        priceBar.style.height = `${product.price * 5}px`;
        priceBar.textContent = product.price;
        barGraph.appendChild(priceBar);

        const ratingGraph = document.createElement('div');
        ratingGraph.className = 'bar rating';
        ratingGraph.style.height = `${product.rating * 50}px`;
        ratingGraph.textContent = product.rating;
        barGraph.appendChild(ratingGraph);

        

    });
}

function clearInputs(){
    document.getElementById('productName').value='';
    document.getElementById('productPrice').value='';
    document.getElementById('productRating').value='';

}


