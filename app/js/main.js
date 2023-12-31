'use strict'
window.addEventListener("DOMContentLoaded", () => {


  const menuBtn = document.querySelector('.top-header__burger');
  const menuMobile = document.querySelector('.top-header__burger-menu-wrapper');
  const menuClose = document.querySelector('.top-header__burger-menu-close');


  menuBtn.addEventListener('click', () => {
    if (!menuMobile.classList.contains('menu--open')) {
      menuMobile.classList.add('menu--open');
    } else { menuMobile.classList.remove('menu--open'); }


  });
  //  menuClose.addEventListener('click', () => {
  //    menuMobile.classList.remove('menu--open');
  //  });



  menuClose.addEventListener('click', () => {
    if (menuMobile.classList.contains('menu--open')) {
      menuMobile.classList.remove('menu--open');
    } else { menuMobile.classList.add('menu--open'); }

  });













  let position = 0;
  const slidesToShow = 4;
  const slidesToScroll = 2;
  const container = document.querySelector('.new__slider-container');
  const track = document.querySelector('.new__slide-track');
  const btnPrev = document.querySelector('.new__btn-prev');
  const btnNext = document.querySelector('.new__btn-next');
  const items = document.querySelectorAll('.new__slide-item');
  const itemsCount = items.length;
  const itemWidth = container.clientWidth / slidesToShow; // 1 узнаем ширину элемента
  const movePosition = slidesToScroll * itemWidth;



  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
  });

  btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
  });

  btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
  });
  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  };
  const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
  };
  checkBtns();


  let saleposition = 0;
  const saleslidesToShow = 4;
  const saleslidesToScroll = 2;
  const salecontainer = document.querySelector('.sale__slider-container');
  const saletrack = document.querySelector('.sale__slide-track');
  const salebtnPrev = document.querySelector('.sale__btn-prev');
  const salebtnNext = document.querySelector('.sale__btn-next');
  const saleitems = document.querySelectorAll('.sale__slide-item');
  const saleitemsCount = saleitems.length;
  const saleitemWidth = salecontainer.clientWidth / saleslidesToShow;
  const salemovePosition = saleslidesToScroll * saleitemWidth;


  //1 узнаем ширину   
  saleitems.forEach((item) => {
    item.style.minWidth = `${saleitemWidth}px`;
  });

  salebtnNext.addEventListener('click', () => {
    const saleitemsLeft = saleitemsCount - (Math.abs(saleposition) + saleslidesToShow * saleitemWidth) / saleitemWidth;
    saleposition -= saleitemsLeft >= saleslidesToScroll ? salemovePosition : saleitemsLeft * saleitemWidth;

    salesetPosition();
    salecheckBtns();
  });

  salebtnPrev.addEventListener('click', () => {
    const saleitemsLeft = Math.abs(saleposition) / saleitemWidth;
    saleposition += saleitemsLeft >= saleslidesToScroll ? salemovePosition : saleitemsLeft * saleitemWidth;

    salesetPosition();
    salecheckBtns();
  });
  const salesetPosition = () => {
    saletrack.style.transform = `translateX(${saleposition}px)`;
  };
  const salecheckBtns = () => {
    salebtnPrev.disabled = saleposition === 0;
    salebtnNext.disabled = saleposition <= -(saleitemsCount - saleslidesToShow) * saleitemWidth;
  };
  salecheckBtns();


  // Modal /Popup

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');


  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');

  }
  //если массив кнопок то нужно перебрать 
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }


  modal.addEventListener('click', (e) => {  // закрытие модального окна нажимая на подложку
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => { //закрытие модального окна клавишей
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });


});
