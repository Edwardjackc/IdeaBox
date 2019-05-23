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
  deleteFromStorage(locatedIndex) {
    localStorage.removeItem(locatedIndex)
  }
  updateIdea() {

  }
  updateQuality() {

  }
}