var Cluster = function(map){
    Property.call(this, map);
    this.load = function(){
      this.url1 = define.imagePathItem + 'crafting_material/crystal/cluster/Deep_blue_cluster.png';
      this.url2 = define.imagePathItem + 'crafting_material/crystal/cluster/Deep_red_cluster.png';
      this.url3 = define.imagePathItem + 'crafting_material/crystal/cluster/Deep_green_cluster.png';
      this.url4 = define.imagePathItem + 'crafting_material/crystal/quartz/Tourmaline.png';
      this.url5 = define.imagePathItem + 'crafting_material/crystal/quartz/Zircon.png';
      this.blue_cluster = new Framework.Sprite(this.url1);
      this.red_cluster = new Framework.Sprite(this.url2);
      this.green_cluster = new Framework.Sprite(this.url3);
      this.tourmaline = new Framework.Sprite(this.url4);
      this.zircon = new Framework.Sprite(this.url5);
    }

    this.update = function(){
        this.blue_cluster.update();
        this.red_cluster.update();
        this.green_cluster.update();
    }
}
Cluster.prototype = Object.create(Property.prototype);
Cluster.prototype.constructor = Property;