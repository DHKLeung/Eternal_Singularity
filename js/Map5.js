var Map5 = function(map) {
    this.map = map;
    this.player = this.map.player;
    this.isChangeMap = false;
    this.monsterAmount = 30;
    this.propertyAmount = 50;
}
Map5.prototype = Object.create(BaseMap.prototype);
Map5.prototype.constructor = BaseMap;

Map5.prototype.moveScreen = function(){

};

Map5.prototype.generateProperties = function(){
      var propertyType = 0;
      var row, col;
      for(var i = 0; i < this.propertyAmount; i++){
        while(true){
          row = Math.floor(Math.random() * 37);
          col = Math.floor(Math.random() * 85);
          if(this.map.mapArr[this.player.currentMap][row][col] > 5 &&
             this.map.mapArr[this.player.currentMap][row][col] < 8){
            break;
          }
        }
        if(i < 25){
          propertyType = 4;
        }
        else if(i < 50){
          propertyType = 5;
        }

        this.map.propertyArr[row][col] = propertyType;
      }
      console.log(this.map.propertyArr);
};