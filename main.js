var titleInput = document.querySelector('#top__input--title');
var bodyInput = document.querySelector('#top__input--body');
var saveBtn = document.querySelector('#top__input--save');
var topForm = document.querySelector('#top__form')
//event listeners 
titleInput.addEventListener('keypress',validate);
bodyInput.addEventListener('keypress',validate);
saveBtn.addEventListener('click',generateCard);


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

function generateCard() {
  console.log('Hi');
  clearForm(topForm);
  validateInputs(saveBtn,titleInput.value)
}