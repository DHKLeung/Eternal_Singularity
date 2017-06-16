var QuestItem = function(){
    this.load = function(){
      this.url1 = define.imagePathItem + 'crafting_material/bone/Cloud_coral.png';
      this.url2 = define.imagePathItem + 'mission_item/Aged_scroll.png';
      this.url3 = define.imagePathItem + 'mission_item/Perfect_scroll.png';
      this.cloud_coral = new Framework.Sprite(this.url1);
      this.aged_scroll = new Framework.Sprite(this.url2);
      this.perfect_scroll = new Framework.Sprite(this.url3);
    }
}

QuestItem.prototype = Object.create(Property.prototype);
QuestItem.prototype.constructor = Property;