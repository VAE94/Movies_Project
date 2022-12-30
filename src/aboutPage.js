const subscribeForm = document.querySelector('.subscribe-form');
const inputEmail = document.getElementById('email');

subscribeForm.addEventListener('submit', function (event) {
   event.preventDefault();
   inputEmail.value = '';
});

