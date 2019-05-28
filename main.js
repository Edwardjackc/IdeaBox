var titleInput = document.querySelector('#top__input--title');
var bodyInput = document.querySelector('#top__input--body');
var saveBtn = document.querySelector('#top__input--save');
var topForm = document.querySelector('#top__form');
var bottomContainer = document.querySelector('#bottom__container');
var displayMessage = document.querySelector('#bottom__display--message');
var searchInput = document.querySelector('.top__input--search');
var asideList = document.querySelector('.aside__ul--list');
var asideBtn = document.querySelector('.aside__input--btn');
//event listeners
titleInput.addEventListener('keypress',validate);
bodyInput.addEventListener('keypress',validate);
saveBtn.addEventListener('click', instantiateIdea);
searchInput.addEventListener('keyup', searchIdeas)
bottomContainer.addEventListener('click', deleteCard);
bottomContainer.addEventListener('click', starCard);
bottomContainer.addEventListener('focusout', setText);
bottomContainer.addEventListener('keyup', returnHandler);
bottomContainer.addEventListener('click', upvoteQuality);
bottomContainer.addEventListener('click', downvoteQuality);
asideList.addEventListener('click', filterQualityHandler);
asideBtn.addEventListener('click', toggleStarList);

this.addEventListener('load', pageReload);

//Global var
var globalArray = JSON.parse(localStorage.getItem('ideaArr')) || [];
console.log('before', globalArray);

function validate() {
  validateInputs(saveBtn,titleInput.value && bodyInput.value)
  // validateInputs(saveBtn,bodyInput.value)
};

function validateInputs(button,input) {
  button.disabled = !input //? false : true
};

function clearForm(form) {
  form.reset();
};

  function clearDisplayMessage() {
    var bottomDisplay = document.querySelector('.bottom__display--message')
    if(bottomContainer.contains(bottomDisplay)) {
      bottomContainer.removeChild(bottomDisplay);
    }
  };

function generateCard (idea) {
    var starSrc = idea.star ? "images/star-active.svg" : "images/star.svg";
    bottomContainer.insertAdjacentHTML('afterbegin',`<article class="bottom__article--card"data-id="${idea.id}">
    <header class="bottom__header--card">
      <img class="bottom__icon--card bottom__btn--star" src=${starSrc} alt="star__button--inactive"><img class="bottom__icon--card bottom__btn--delete" src="images/delete.svg" alt="delete__button--inactive">
        </header>
      <section class="bottom__section--card">
        <h3 class="bottom__title--card" contenteditable="true">${idea.title}</h3>
        <p class="bottom__paragraph--card" contenteditable="true">${idea.body}</p>
        </section>
        <footer class="bottom__footer--card">
          <img class="bottom__icon--card bottom__img--upvote" src="images/upvote.svg" class="bottom__img" id="bottom__img--upvote" alt="upvote__button--inactive"><span class="bottom__span--card">Quality: ${idea.qualityArray[idea.quality]}</span><img class="bottom__icon--card bottom__img--downvote" src="images/downvote.svg" id="bottom__img--downvote" alt="downvote__button--inactive">
        </footer>
      </article>`)
};

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
};

function deleteCard(e) {
  if(e.target.classList.contains('bottom__btn--delete')) {
    e.target.closest('article').remove();
    var locatedIndex = locateIndex(e);
    var locatedId = locateId(e);
    console.log(locatedId)
    globalArray[locatedIndex].deleteFromStorage(locatedId);
  } 
};

function starCard(e) {
  var locatedIndex = locateIndex(e);
  if(e.target.classList.contains('bottom__btn--star')) {
    var starImg = e.target;
    var title = e.target.closest('article').querySelector('.bottom__title--card').textContent;
    var body = e.target.closest('article').querySelector('.bottom__paragraph--card').textContent;
    var star = !globalArray[locatedIndex].star;
    globalArray[locatedIndex].updateIdea(title, body, star);
    updateStarCard(locatedIndex, starImg);
  }
};

function setText(e) {
  var locatedIndex = locateIndex(e);
  if(e.target.classList.contains('bottom__title--card') ||
     e.target.classList.contains('bottom__paragraph--card')) {
    var title = e.target.closest('article').querySelector('.bottom__title--card').textContent;
    var body = e.target.closest('article').querySelector('.bottom__paragraph--card').textContent;
    var star = globalArray[locatedIndex].star;
    updateCardInfo(title, body, star, locatedIndex);
  }
};

function updateCardInfo(titleText, bodyText, star, locatedIndex) {
globalArray[locatedIndex].updateIdea(titleText, bodyText, star);
};

function returnHandler(e) {
  if (e.keyCode == 13) {
    e.target.blur();
  }
};

function updateStarCard(locatedIndex, starImg) {
  if(globalArray[locatedIndex].star === true) {
  starImg.setAttribute('src', 'images/star-active.svg')
  } else if(globalArray[locatedIndex].star === false) {
  starImg.setAttribute('src', 'images/star.svg');
  }
};

function upvoteQuality(e) {
  var locatedIndex = locateIndex(e);
  if(e.target.classList.contains('bottom__img--upvote')) {
    qualityValue = globalArray[locatedIndex].quality;
    qualityValue++;
    validateQuality(locatedIndex, qualityValue);
    updateQualityCard(e, locatedIndex);
  }
};

function downvoteQuality(e) {
  var locatedIndex = locateIndex(e);
  if(e.target.classList.contains('bottom__img--downvote')) {
    qualityValue = globalArray[locatedIndex].quality;
    qualityValue--;
    validateQuality(locatedIndex, qualityValue);
    updateQualityCard(e, locatedIndex);
  }
};

function validateQuality(locatedIndex, qualityValue) {
  if(qualityValue < 0) {
    qualityValue = 0;
    globalArray[locatedIndex].updateQuality(qualityValue); 
  }
  if(qualityValue > globalArray[locatedIndex].qualityArray.length - 1) {
    qualityValue = globalArray[locatedIndex].qualityArray.length - 1;
    globalArray[locatedIndex].updateQuality(qualityValue);
  } else {
    globalArray[locatedIndex].updateQuality(qualityValue);
  }
};

function updateQualityCard(e, locatedIndex) {
  var qualityText = e.target.closest('article').querySelector('.bottom__span--card');
  var qualityIndex = globalArray[locatedIndex].quality
  var newText = globalArray[locatedIndex]['qualityArray'][qualityIndex]
  qualityText.innerHTML = `Quality: ${newText}`

};

function locateId(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  return(parentId)
};

function locateIndex(e) {
  var parent = e.target.closest('article');
  var parentId = parseInt(parent.dataset.id);
  var locatedIndex = globalArray.findIndex(function (idea) {
    return idea.id === parentId
  });
  return locatedIndex;
};

function pageReload() {
  if (globalArray.length !== 0) {
    const newArray = globalArray.map(ideaObj => {
    const newIdea = new Idea({ ...ideaObj});
      generateCard(newIdea);
      return newIdea;
    });
    globalArray = newArray;
    clearDisplayMessage();
  };
};

function searchIdeas() {
    var search = searchInput.value;
    bottomContainer.innerHTML = "";
    searchArray = globalArray.filter(function(idea){
        return idea.title.includes(search) || idea.body.includes(search)
    });
    searchArray.map(function(idea){
      generateCard(idea)
    });
};

function filterQualityHandler(e) {
  if(e.target.classList.contains('aside__list--swill')) {
    filterQuality(0);
  };
  if(e.target.classList.contains('aside__list--plausible')) {
    filterQuality(1);
  };
  if(e.target.classList.contains('aside__list--genius')) {
    filterQuality(2);
  };
};

function filterQuality(qualityIndex) {
  bottomContainer.innerHTML = "";
  qualityArray = globalArray.filter(function(idea){
    return idea.quality === (qualityIndex)
  });
  qualityArray.map(function(idea){
  generateCard(idea)
  });
};

function toggleStarList(e) {
  asideBtn = e.target;
  toggleStarred(asideBtn);
}

function toggleStarred(asideBtn){
if(asideBtn.value === 'Show Starred Ideas') {
  asideBtn.value = 'View All Ideas';
  filterStarred();
} else if(asideBtn.value === 'View All Ideas') {
  asideBtn.value = 'Show Starred Ideas';
  bottomContainer.innerHTML = "";
  pageReload();
}
};

function filterStarred() {
  bottomContainer.innerHTML = "";
  starArray = globalArray.filter(function(idea){
    return idea.star === true;
  });
  starArray.map(function(idea){
  generateCard(idea)
  });
}