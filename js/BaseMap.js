var BaseMap = function(mapType){
  this.screenPosition = {//on the map
      x: 0,
      y: 0
  };
  this.mapType = mapType;
  this.arrays = new Arrays(mapType);
  this.mapArr = this.arrays.mapArray;
  this.charArr = this.arrays.charArray;
  this.charArr2 = this.arrays.charArray2;
  this.monsterArr = [];
  if(mapType === 'scroll'){
    this.propertyArr = this.arrays.propertyArray;
  }
}

BaseMap.prototype.drawOtherObj = function(obj){
    this.toScreenCoordinate(obj.position);
    obj.draw();
    this.toMapCoordinate(obj.position);
};

BaseMap.prototype.toScreenCoordinate = function(mapCoordinate) {
    mapCoordinate.x -= this.screenPosition.x;
    mapCoordinate.y -= this.screenPosition.y;
};

BaseMap.prototype.toMapCoordinate = function(screenPosition) {
    screenPosition.x += this.screenPosition.x;
    screenPosition.y += this.screenPosition.y;
};

BaseMap.prototype.toArrayIndex = function(x, y, direction){//Transform absolute coordinate to relative coordinate(2d array index)
    if(direction === 0){
        this.arrRow = Math.floor((y-15)/32);
    }
    else{
        this.arrRow = Math.floor((y+15)/32);
    }
    this.arrCol = Math.floor(x/32);
    return {row: this.arrRow, col: this.arrCol};
};

BaseMap.prototype.canMove = function(i, j, direction) {
    this.toArrayIndex(i, j, direction);
    if(i < 16 || i > 2736){ return false; }
    if(j < 16 || j > 1200){ return false; }
    if (this.mapArr[this.player.currentMap][this.arrRow][this.arrCol] > 1) {
        return false;
    }
    else {
        return true;
    }
};

BaseMap.prototype.generateProperties = function(){

};

BaseMap.prototype.clearProperties = function(){
    for(var row = 0; row < 38; row++){
      for(var col = 0; col < 86; col++){
          this.propertyArr[row][col] = 0;
      }
    }
};

BaseMap.prototype.moveScreen = function(){

};

BaseMap.prototype.checkChangeMap = function(){

};

BaseMap.prototype.generateMonsters = function(){

};