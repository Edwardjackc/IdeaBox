var titleInput = document.querySelector('#top__input--title');
var bodyInput = document.querySelector('#top__input--body');
var saveBtn = document.querySelector('#top__input--save');
var topForm = document.querySelector('#top__form')
var bottomContainer = document.querySelector('#bottom__container')
var display__message = document.querySelector('.display__message')
//event listeners 
titleInput.addEventListener('keypress',validate);
bodyInput.addEventListener('keypress',validate);
saveBtn.addEventListener('click', instantiateIdea);
bottomContainer.addEventListener('click', deleteCard);
//Global var
var globalArray = JSON.parse(localStorage.getItem('idea')) || [];

function validate() {
  validateInputs(saveBtn,titleInput.value && bodyInput.value)
  // validateInputs(saveBtn,bodyInput.value)
}

function validateInputs(button,input) {
  button.disabled = !input //? false : true
}

function clearForm(form) {
  form.reset()
}

function clearDisplayMessage() {
  display__message.parentNode.removeChild(display__message);
}


// DOM
// grab the value of the input for title, grab the value of the input for body
// function captureCard() {
//   title = titleInput.value;
//   body = bodyInput.value;
//   generateCard(title, body);
// }
// insert text as an argument for the new card in whatever function
// insert the article to the DOM as a new card 


// Logic / Idea
// instantiate new card object 
// store new card object in local storage


// function generateCard() {
//   console.log('Hi');
//   clearForm(topForm);
//   validateInputs(saveBtn,titleInput.value)
// }

function generateCard (idea) {
bottomContainer.insertAdjacentHTML('afterbegin',`<article class="bottom__article--card"data-id="${idea.id}">
  <header class="bottom__header--card">
    <img class="bottom__icon--card" src="images/star.svg" alt="star__button--inactive"><img class="bottom__icon--card bottom__btn--delete" src="images/delete.svg" alt="delete__button--inactive">
        </header>
      <section class="bottom__section--card">
        <h3 class="bottom__title--card">${idea.title}</h3>
        <p class="bottom__paragraph--card">${idea.body}</p>
        </section>
        <footer class="bottom__footer--card">
          <img class="bottom__icon--card" src="images/upvote.svg" class="bottom__img" id="bottom__img--upvote" alt="upvote__button--inactive"><span class="bottom__span--card">Quality:Swill</span><img class="bottom__icon--card" src="images/downvote.svg" id="bottom__img--downvote" alt="downvote__button--inactive">
        </footer>
      </article>`)
}

function instantiateIdea() {
  clearDisplayMessage()
  var idea = new Idea({
    id: Date.now(),
    title: titleInput.value,
    body: bodyInput.value,
    star: false,
    quality: 0
  })
  generateCard(idea);
  console.log(idea);
}

function deleteCard(e) {
  if(e.target.classList.contains('bottom__btn--delete')) {
    e.target.closest('article').remove();
  }
}