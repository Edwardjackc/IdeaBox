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
bottomContainer.addEventListener('click', deleteCard)
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
  form.reset()
}

// function clearDisplayMessage() {
  // display__message.parentNode.removeChild(display__message);
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
  // clearDisplayMessage()
  var idea = new Idea({
    id: Date.now(),
    title: titleInput.value,
    body: bodyInput.value,
    star: false,
    quality: 0
  })
  generateCard(idea);
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

// function deleteCard(e) {
//   if(e.target.classList.contains('bottom__btn--delete')) {
//     e.target.closest('article').remove();
//     var locatedIndex = locateIndex(e);
//     globalArray[locatedIndex].deleteFromStorage(locatedIndex);
//   } 
// }

// function locateIndex(e) {
//   var parent = e.target.closest('article');
//   var parentId = parseInt(parent.dataset.id);
//   var locatedIndex = globalArray.findIndex(function (idea) {
//     return idea.id === parentId
//   })
//   console.log(locatedIndex);
//   return locatedIndex
// };

function pageReload() {
  if (globalArray.length !== 0) {
    var newGlobalArray = globalArray.map(function(idea) {
      return newIdea = new Idea ({
        id: idea.id, 
        title: idea.title, 
        body: idea.body, 
        star: idea.star,
        quality: idea.quality
        })
    })
    globalArray = newGlobalArray;
    globalArray.forEach(function(idea) {
      generateCard(idea)
    })
  }
    console.log('after', globalArray);
  };


// function pageReload() {
//   if (globalArray.length !== 0) {
//     globalArray.forEach(reinstantiateIdea (item)); {
//       debugger;
//       generateCard(item);
//     }
//   }
// }

function reinstantiateIdea() {
  var idea = new Idea ({
  id: idea.id,
  title: idea.title,
  body: idea.body,
  star: idea.star,
  quality: idea.quality,
  })
}
