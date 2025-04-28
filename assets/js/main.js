'use strict'

// function myFunction() {
// }
// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         const dropdown = event.target.closest('.dropdown')
//         if (dropdown) {
//             const openDropdown = dropdown.querySelector('.dopdown-content')
//             if (openDropdown && openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show')
//             }
//         }
//     }
// }


function toggleDropdown(event, dropdownId) {

  document.querySelectorAll('.dropdown__menu').forEach(menu => {
    if (menu.id !== dropdownId) {
      menu.classList.remove('dropdown-show')
      menu.previousElementSibling.classList.remove('show')
    }
  })

  const dropdown = document.getElementById(dropdownId)
  const button = dropdown.previousElementSibling

  dropdown.classList.toggle('dropdown-show')
  button.classList.toggle('active')
}

// модальное окно
let modal = document.getElementById('modal')
function showModal() {
  modal.style.display = 'flex'
}
function hideModal() {
  modal.style.display = 'none'
}
// модальное окно

// табы
let btnss = document.querySelectorAll('.tab__btn')
let texts = document.querySelectorAll('.tab__slide')

btnss.forEach((tab__btn, index) => {
  tab__btn.onclick = () => {
    document.querySelector('.tab__btn.active').classList.remove('active')
    tab__btn.classList.add('active')
    document.querySelector('.tab__slide.active').classList.remove('active')
    texts[index].classList.add('active')
  }
}) 

// табы 

// аккордеон
function toggleAccordion(button) {
  const item = button.closest('.integration__item');
  const content = item.querySelector('.integration__content');

  button.classList.toggle('integration__header_active');
  content.classList.toggle('integration__content_active');

  // Закрываем другие открытые элементы аккордеона
  const allItems = document.querySelectorAll('.integration__item');
  allItems.forEach(accordionItem => {
    if (accordionItem !== item) {
      accordionItem
        .querySelector('.integration__header')
        .classList.remove('integration__header_active');
      accordionItem
        .querySelector('.integration__content')
        .classList.remove('integration__content_active');
    }
  });
}
// аккордеон
// слайдер
const slides = document.querySelectorAll('.banner__slide')
let currentIndex = 0
function switchSlides() {
  slides[currentIndex].classList.remove('banner__active')
  currentIndex++
  if (currentIndex >= slides.length) {
    currentIndex = 0
  }
  slides[currentIndex].classList.add('banner__active')
}
setInterval(switchSlides, 3000)
// слайдер