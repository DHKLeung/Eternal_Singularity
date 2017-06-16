var Map2 = function(map) {
    this.map = map;
    this.player = this.map.player;
    this.isChangeMap = false;
    this.monsterAmount = 30;
    this.propertyAmount = 50;

    this.setScreenPosition = function(screenPosition){
        this.screenPosition = {
          x: screenPosition.x,
          y: screenPosition.y
        };
    };
}

Map2.prototype = Object.create(BaseMap.prototype);
Map2.prototype.constructor = BaseMap;

Map2.prototype.generateProperties = function(){
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
        if(i < 10){
          propertyType = 1;
        }
        else if(i < 20){
          propertyType = 2;
        }
        else if(i < 30){
          propertyType = 3;
        }
        else if(i < 40){
          propertyType = 4;
        }
        else if(i < 50){
          propertyType = 5;
        }
        this.map.propertyArr[row][col] = propertyType;
      }
};

Map2.prototype.moveScreen = function(){
    if(this.player.isWalking && this.player.isScreenMove){
      if(this.player.playerPic.position.x > 430 && this.player.playerPic.position.x < 1891){
          this.map.screenPosition.x += this.player.walkDir.x;
      }
      if(this.player.playerPic.position.y > 268 && this.player.playerPic.position.y < 900){
          this.map.screenPosition.y += this.player.walkDir.y;
      }
    }
};

Map2.prototype.checkChangeMap = function(){
    var playerIndex = this.toArrayIndex(this.player.playerPic.position.x, this.player.playerPic.position.y, -1);
    var playerPos = this.player.playerPic.position;

    if(playerPos.x >= 1184 && playerPos.x <= 1278 && playerPos.y > 1174){
        this.player.currentMap = 0;
        this.player.isChangeMap = true;
        this.player.drawChangeMapEff = true;
        this.map.screenPosition = {
            x: 600,
            y: 0
        };
        this.player.setPosition({x: 37, y: 1}, this.map.screenPosition);
        this.map.clearProperties();
        this.map.generateProperties();
    }
    if(playerPos.x >= 1184 && playerPos.x <= 1278 && playerPos.y <= 26){
        this.player.currentMap = 2;
        this.player.isChangeMap = true;
        this.player.drawChangeMapEff = true;
        this.map.screenPosition = {
            x: 732,
            y: 626
        };
        this.player.setPosition({x: 37, y: 36},this.screenPosition);
        this.map.clearProperties();
        this.map.map3.generateProperties();
    }
};

Map2.prototype.chooseMonsterType = function(col, row){
    this.map.ant = new Ant(this.map,this.player);
    this.map.ant.load();
    this.map.ant.setPosition({x: col, y: row});
};