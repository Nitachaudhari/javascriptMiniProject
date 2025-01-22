let movieImages = [
    "https://tse3.mm.bing.net/th?id=OIP.88Gi46ycA1lBDhYBmy36ZwHaEo&pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th?id=OIP.ON55Vi2BEuFAl-S-QZIjPAHaKt&pid=Api&P=0&h=220",
    "https://tse4.mm.bing.net/th?id=OIP.SHJ2JHwQ0nDMEgar--sU8AHaLH&pid=Api&P=0&h=220",
    "https://tse1.mm.bing.net/th?id=OIP.hvh50JVFLIddmteHl_V10QHaKI&pid=Api&P=0&h=220",
    "https://tse1.mm.bing.net/th?id=OIP.QXi-m-4H0zp2-o_o0Xso3gHaEK&pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th?id=OIP.9a516ufFrYCswcoK9WVdsgHaDt&pid=Api&P=0&h=220",
];
let currentIndex = 0;
let slideshowInterval;

// Display the current image
const imageElement = document.getElementById('slideshow-image');
function displayImage(index) {
    imageElement.src = movieImages[index];
}

// Start the slideshow with setInterval
function startSlideshow() {
    slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % movieImages.length;
        displayImage(currentIndex);
    }, 2000);
}

// Stop the slideshow
function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Navigate to the previous or next image
function showNextImage() {
    currentIndex = (currentIndex + 1) % movieImages.length;
    displayImage(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + movieImages.length) % movieImages.length;
    displayImage(currentIndex);
}

// Add user image at a specific index
function addUserImage() {
    const imageUrl = document.getElementById('image-url').value;
    const imagePosition = parseInt(document.getElementById('image-position').value);
    
    if (imageUrl && imagePosition >= 0 && imagePosition <= movieImages.length) {
        movieImages.splice(imagePosition, 0, imageUrl);
    } else {
        alert("Invalid input. Please enter a valid URL and position.");
    }
}

// Event listeners for the controls
document.getElementById('play-btn').addEventListener('click', startSlideshow);
document.getElementById('pause-btn').addEventListener('click', stopSlideshow);
document.getElementById('next-btn').addEventListener('click', showNextImage);
document.getElementById('prev-btn').addEventListener('click', showPrevImage);
document.getElementById('add-btn').addEventListener('click', addUserImage);

// Initialize the first image
displayImage(currentIndex);
