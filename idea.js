class Idea {
  constructor(obj) { 
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star;
    this.quality = obj.quality || 0;
  }

  saveToStorage() {
    var stringified = JSON.stringify(globalArray);
    localStorage.setItem('ideaArr', stringified);
  }

  deleteFromStorage(locatedId) {
    var newGlobalArray = globalArray.filter(function(idea) {
      return idea.id !== locatedId;
  })
  console.log(newGlobalArray);
  globalArray = newGlobalArray;
  var stringified = JSON.stringify(globalArray);
  localStorage.setItem('ideaArr', stringified);
  }

  updateIdea(locatedIndex) {
  globalArray[locatedIndex].star = !this.star;
  var stringified = JSON.stringify(globalArray);
  localStorage.setItem('ideaArr', stringified);
  }

  
  updateQuality() {

  }
}