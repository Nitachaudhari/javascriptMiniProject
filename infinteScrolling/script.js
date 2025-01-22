const gallery=document.getElementById('gallery');
let page=1;
let loading=false;

//function to fetch images from the API

async function fetchImages(){
    try{
        const response=await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
        const images=await response.json();
        displayImages(images);
        page++;
    } catch(error){
        console.error('Error fetching images:',error);
    }
}

//function to display fetched images in the gallery
function displayImages(images){
    images.forEach(image=>{
        const imgElement=document.createElement('img');
        imgElement.src=image.thumbnailUrl;
        imgElement.alt=image.title;
        gallery.appendChild(imgElement);
    });
}


//function to check if user has scrolled to the bottom
function checkScroll(){
    if(window.innerHeight +window.scrollY >=document.body.offsetHeight - 100 && !loading){
        loading=true;
        fetchImages().then(()=>loading.false);
    }
}

//initial image load
fetchImages();

//event listener for infinite scrolling
window.addEventListener('scroll',checkScroll);