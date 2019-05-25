var titleInput = document.querySelector('#top__input--title');
var bodyInput = document.querySelector('#top__input--body');
var saveBtn = document.querySelector('#top__input--save');
var topForm = document.querySelector('#top__form')
var bottomContainer = document.querySelector('#bottom__container')
var displayMessage = document.querySelector('#bottom__display--message')
//event listeners
titleInput.addEventListener('keypress',validate);
bodyInput.addEventListener('keypress',validate);
saveBtn.addEventListener('click', instantiateIdea);
bottomContainer.addEventListener('click', deleteCard);
bottomContainer.addEventListener('click', starCard);
this.addEventListener('load', pageReload);

//Global var
var globalArray = JSON.parse(localStorage.getItem('ideaArr')) || [];
console.log('before', globalArray)

function validate() {
  validateInputs(saveBtn,titleInput.value && bodyInput.value)
  // validateInputs(saveBtn,bodyInput.value)
}

function validateInputs(button,input) {
  button.disabled = !input //? false : true
}

function clearForm(form) {
  form.reset();
}

  function clearDisplayMessage() {
    var bottomDisplay = document.querySelector('.bottom__display--message')
    if(bottomContainer.contains(bottomDisplay)) {
      bottomContainer.removeChild(bottomDisplay);
    }
  }

function generateCard (idea) {
    var starSrc = idea.star ? "images/star-active.svg" : "images/star.svg";
    bottomContainer.insertAdjacentHTML('afterbegin',`<article class="bottom__article--card"data-id="${idea.id}">
    <header class="bottom__header--card">
      <img class="bottom__icon--card bottom__btn--star" src=${starSrc} alt="star__button--inactive"><img class="bottom__icon--card bottom__btn--delete" src="images/delete.svg" alt="delete__button--inactive">
        </header>
      <section class="bottom__section--card">
        <h3 class="bottom__title--card" contenteditable="true">${idea.title}</h3>
        <p class="bottom__paragraph--card"contenteditable="true">${idea.body}</p>
        </section>
        <footer class="bottom__footer--card">
          <img class="bottom__icon--card" src="images/upvote.svg" class="bottom__img" id="bottom__img--upvote" alt="upvote__button--inactive"><span class="bottom__span--card">Quality:Swill</span><img class="bottom__icon--card" src="images/downvote.svg" id="bottom__img--downvote" alt="downvote__button--inactive">
        </footer>
      </article>`)
}

function instantiateIdea() {
  var idea = new Idea({
    id: Date.now(),
    title: titleInput.value,
    body: bodyInput.value,
    star: false,
    quality: 0
  })
  generateCard(idea);
  clearDisplayMessage();
  globalArray.push(idea)
  idea.saveToStorage(globalArray)
  clearForm(topForm);
  validateInputs(saveBtn,bodyInput)
  console.log(idea);
}

function deleteCard(e) {
  if(e.target.classList.contains('bottom__btn--delete')) {
    e.target.closest('article').remove();
    var locatedIndex = locateIndex(e);
    var locatedId = locateId(e);
    console.log(locatedId)
    globalArray[locatedIndex].deleteFromStorage(locatedId);
  } 
}

function starCard(e) {
  if(e.target.classList.contains('bottom__btn--star')) {
    var star = e.target;
    var locatedIndex = locateIndex(e);
    // var locatedId = locateId(e);
    globalArray[locatedIndex].updateIdea(locatedIndex);
    updateStarCard(locatedIndex, star);
  }
}

function updateStarCard(locatedIndex, star) {
  if(globalArray[locatedIndex].star === true) {
  star.setAttribute('src', 'images/star-active.svg')
  } else if(globalArray[locatedIndex].star === false) {
  star.setAttribute('src', 'images/star.svg');
  }
  }

function locateId(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  return(parentId)
}

function locateIndex(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  var locatedIndex = globalArray.findIndex(function (idea) {
    return idea.id === parentId
  })
  console.log(locatedIndex);
  return locatedIndex
};

function pageReload() {
  if (globalArray.length !== 0) {
    const newArray = globalArray.map(ideaObj => {
    const newIdea = new Idea({ ...ideaObj});
      generateCard(newIdea);
      return newIdea;
    });
    globalArray = newArray;
    console.log(newArray)
    clearDisplayMessage();
  }
}