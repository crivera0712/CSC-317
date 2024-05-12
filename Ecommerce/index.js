const hamburger = document.getElementById('hamburger');
const close = document.getElementById('close')
const nav = document.getElementById('navbar');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.add('active');
  })
}
if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
}