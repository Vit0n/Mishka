//* init AOS library
AOS.init({
    duration: 1200,
    once: true
});

//* page scripts

const menuBtn = document.querySelector('.menu-btn--wrapper');
const span = document.querySelector('.menu-btn');
const headerNav = document.querySelector('.navbar');
const searchBtn = document.querySelector('#search-btn');
const searchModal = document.querySelector('.modal-search');
const searchModalClose = searchModal.querySelector('.modal-close');
const sizeModal = document.querySelector('.modal-size');
const modalOpenButtons = document.querySelectorAll('.item-price .btn');

menuBtn.addEventListener('click', function() {
    span.classList.toggle('menu-btn--closed');
    headerNav.classList.toggle('navbar--open');
    // searchModal.classList.add('modal-hide');
    if (!searchModal.classList.contains('search-modal-hide')) {
        searchModal.classList.add('search-modal-hide');
    }
});

sizeModal.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('modal')) {
        sizeModal.classList.toggle('modal-hide');
    }
});

modalOpenButtons.forEach(item => {
    item.addEventListener('click', function(evt) {
        sizeModal.classList.toggle('modal-hide');
    });
});

searchBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    searchModal.classList.remove('search-modal-hide');
});

searchModalClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    searchModal.classList.add('search-modal-hide');
});

// change menu on scroll
window.onscroll = function() {
    hideCloseBtn();
};

function hideCloseBtn() {
    const header = document.querySelector('nav.navbar');
    if (window.pageYOffset > header.offsetTop) {
        menuBtn.style.position = 'absolute';
    } else {
        menuBtn.style.position = 'fixed';
    }
}
