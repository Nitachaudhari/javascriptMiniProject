const movieImages=[
    "https://tse3.mm.bing.net/th?id=OIP.88Gi46ycA1lBDhYBmy36ZwHaEo&pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th?id=OIP.ON55Vi2BEuFAl-S-QZIjPAHaKt&pid=Api&P=0&h=220",
    "https://tse4.mm.bing.net/th?id=OIP.SHJ2JHwQ0nDMEgar--sU8AHaLH&pid=Api&P=0&h=220",
    "https://tse1.mm.bing.net/th?id=OIP.hvh50JVFLIddmteHl_V10QHaKI&pid=Api&P=0&h=220",
    "https://tse1.mm.bing.net/th?id=OIP.QXi-m-4H0zp2-o_o0Xso3gHaEK&pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th?id=OIP.9a516ufFrYCswcoK9WVdsgHaDt&pid=Api&P=0&h=220",
];

const slideshowElements=document.getElementById('slideshow');

let currentIndex=0;
slideshowElements.src=movieImages[currentIndex];


function updateSlideshow(){
    currentIndex=(currentIndex+1) % movieImages.length;

    slideshowElements.src=movieImages[currentIndex];

}

setInterval(updateSlideshow,2000);
