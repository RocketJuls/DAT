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
