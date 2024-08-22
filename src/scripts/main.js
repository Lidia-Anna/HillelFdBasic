const preloader=document.getElementById("preloader");
setTimeout(() => {
    preloader.style.display = "none";
}, 1000);
document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("burger").addEventListener("click", function (){
        document.getElementById("headerNav").classList.toggle("open");
    });
    document.getElementById("navClose").addEventListener("click", function (){
        document.getElementById("headerNav").classList.toggle("open");
    });
});
const contactPopup = document.querySelector('.contact-popup');
const closePopup = document.querySelector('.close');
const showPopup = document.querySelector('#showPopup');
showPopup.addEventListener('click', ()=> contactPopup.classList.toggle('active'));
closePopup.addEventListener('click', ()=> contactPopup.classList.toggle('active'));

$(document).ready(function(){
    $('.team').slick({
        dots: true,
        speed: 1000,
        /*autoplay: true,
        autoplaySpeed: 2000,*/
    });
});