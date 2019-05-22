var titleInput = document.querySelector('#top__input--title');
var bodyInput = document.querySelector('#top__input--body');
var saveBtn = document.querySelector('#top__input--save');
var topForm = document.querySelector('#top__form')
var bottomContainer = document.querySelector('#bottom__container')
//event listeners 
titleInput.addEventListener('keypress',validate);
bodyInput.addEventListener('keypress',validate);
saveBtn.addEventListener('click',generateCard);
//Global var
var globalArray = JSON.parse(localStorage.getItem('key')) || [];

function validate() {
  validateInputs(saveBtn,titleInput.value)
  validateInputs(saveBtn,bodyInput.value)
}

function validateInputs(button,input) {
  button.disabled = input.length > 0 ? false : true
}

function clearForm(form) {
  form.reset()
}



// function generateCard() {
//   console.log('Hi');
//   clearForm(topForm);
//   validateInputs(saveBtn,titleInput.value)
// }

function generateCard () {
bottomContainer.insertAdjacentHTML('afterbegin',`<article class="bottom__article--card">
  <header class="bottom__header--card">
    <img class="bottom__icon--card" src="images/star.svg" alt="star__button--inactive"><img class="bottom__icon--card" src="images/delete.svg" alt="delete__button--inactive">
        </header>
      <section class="bottom__section--card">
        <h3 class="bottom__title--card">Idea title</h3>
        <p class="bottom__paragraph--card">They don’t want us to eat. To succeed you must believe. When you believe, you will succeed. 
        </section>
        <footer class="bottom__footer--card">
          <img class="bottom__icon--card" src="images/upvote.svg" class="bottom__img" id="bottom__img--upvote" alt="upvote__button--inactive"><span class="bottom__span--card">Quality:Swill</span><img class="bottom__icon--card" src="images/downvote.svg" id="bottom__img--downvote" alt="downvote__button--inactive">
        </footer>
      </article>`
)}