class Idea {
  constructor(obj) { 
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star;
    this.quality = obj.quality || 0;
    this.qualityArray = ['Swill', 'Plausible', 'Genius']
  };

  saveToStorage() {
    var stringified = JSON.stringify(globalArray);
    localStorage.setItem('ideaArr', stringified);
  };

  deleteFromStorage(locatedId) {
    var newGlobalArray = globalArray.filter(function(idea) {
      return idea.id !== locatedId;
  })
  console.log(newGlobalArray);
  globalArray = newGlobalArray;
  var stringified = JSON.stringify(globalArray);
  localStorage.setItem('ideaArr', stringified);
  };

  updateIdea(title, body, star) {
 this.title = title;
 this.body = body;
 this.star = star;
 var stringified = JSON.stringify(globalArray);
 localStorage.setItem('ideaArr', stringified);
};
  
  updateQuality(qualityValue) {
 this.quality = qualityValue;
 var stringified = JSON.stringify(globalArray);
 localStorage.setItem('ideaArr', stringified);
  }
};