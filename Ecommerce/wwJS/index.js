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
/*signup*/
const loginSignupLink = document.querySelectorAll('.form-box .bottom-link a');
const formPopup = document.querySelector(".form-popup");
loginSignupLink.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
  })
})