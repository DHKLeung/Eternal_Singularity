var Medicine = function(map){
    Property.call(this, map);
    this.load = function(){
        this.url1 = define.imagePathItem + 'medicine/Hematic_tonic.png';
        this.url2 = define.imagePathItem + 'medicine/Mana_potion.png';
        this.hpPotion = new Framework.Sprite(this.url1);
        this.mpPotoin = new Framework.Sprite(this.url2);
    }

    this.update = function(){
        this.hpPotion.update();
        this.mpPotoin.update();
    }
}
Medicine.prototype = Object.create(Property.prototype);
Medicine.prototype.constructor = Property;