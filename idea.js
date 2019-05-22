class Idea {
  constructor(obj) { 
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star;
    this.quality = obj.quality || 0;
  }
}