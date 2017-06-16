var Map4 = function(map) {
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

    this.checkChangeStage = function(){
        if(this.map.player.bag.getPropertyNumber(31) >= 1){
          return true;
        }
        return false;
    };
}

Map4.prototype = Object.create(BaseMap.prototype);
Map4.prototype.constructor = BaseMap;

Map4.prototype.moveScreen = function(){
    if(this.player.isWalking && this.player.isScreenMove){
      if(this.player.playerPic.position.x > 430 && this.player.playerPic.position.x < 1891){
          this.map.screenPosition.x += this.player.walkDir.x;
      }
      if(this.player.playerPic.position.y > 268 && this.player.playerPic.position.y < 900){
          this.map.screenPosition.y += this.player.walkDir.y;
      }
    }
};

Map4.prototype.checkChangeMap = function(){
    var playerIndex = this.toArrayIndex(this.player.playerPic.position.x, this.player.playerPic.position.y, -1);
    var playerPos = this.player.playerPic.position;

    if(playerPos.x < 26 && playerPos.y > 32 && playerPos.y < 128){
        this.player.currentMap = 2;//to map3_1
        this.player.isChangeMap = true;
        this.player.drawChangeMapEff = true;
        this.map.screenPosition = {
            x: 1418,
            y: 0
        };
        this.player.setPosition({x: 84, y: 1}, this.map.screenPosition);
        this.map.clearProperties();
        this.map.map3.generateProperties();
    }
    if(playerPos.x > 2634 && playerPos.x < 2730 && playerPos.y > 1174 && this.checkChangeStage()){
        this.player.currentMap = 4;
        this.player.isChangeMap = true;
        this.player.drawChangeMapEff = true;
        this.map.screenPosition = {
          x: 0,
          y: 0
        };
        this.player.setPosition({x: 21, y: 2},this.map.screenPosition);
        this.map.clearProperties();
        this.player.exp += 3586208;
    }
};