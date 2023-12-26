let slideIndex = 0;
let slideshowTimeout;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    slideshowTimeout = setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function changeSlide(n) {
    clearTimeout(slideshowTimeout);
    slideIndex += n;
    showSlides();
}

document.addEventListener("DOMContentLoaded", showSlides);

