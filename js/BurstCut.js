var BurstCut = function(map){
     Skill.call(this, 2, 0.8, 0, 6, 3, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)

     this.load = function(){
       this.url = define.imagePathEffect + 'Warrior/002.png';
       this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:2, loop:true, speed:5});
     }

     this.init = function(){
       this.abilityList = [0, 1.6, 1.7, 1.8, 1.9, 2.0];
       this.mpCostList = [0, 6, 7, 8, 9, 10];
       this.pic.scale = 0.8;
     }

     this.draw = function(){
       if(this.isDrawed){
         this.map.drawOtherObj(this.pic);
       }
     }
}

BurstCut.prototype = Object.create(Skill.prototype);
BurstCut.prototype.constructor = Skill;

BurstCut.prototype.levelUp = function(){
    for(var level = 10; level <= 14; level++){
      if(this.player.level === level){
        this.level = level - 9;
      }
    }
    if(this.player.level > 14 || this.map.mapType !== 'scroll'){//>19
      this.level = 5;
    }
};

BurstCut.prototype.removeObstacle = function(index,direction){
    var mapArr = this.map.mapArr;
    var currentMap = this.player.currentMap;

    if(direction === 0){//up
      for(var row = index.row - 1; row >= index.row - 3; row--){
        for(var col = index.col - 1; col <= index.col + 1; col++){
          if(this.map.mapType === 'scroll'){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
          }
          else{
            if(this.map.testMapArr[row][col] > 1 && this.map.testMapArr[row][col] < 8 && row >= 0 && col >= 0){
                this.map.testMapArr[row][col] = 0;
            }
          }
        }
      }
    }
    else if(direction === 1){//left
      for(var row = index.row - 1; row <= index.row + 1; row++){
        for(var col = index.col - 3; col <= index.col - 1; col++){
          if(this.map.mapType === 'scroll'){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
          }
          else{
            if(this.map.testMapArr[row][col] > 1 && this.map.testMapArr[row][col] < 8 && row >= 0 && col >= 0){
                this.map.testMapArr[row][col] = 0;
            }
          }
        }
      }
    }
    else if(direction === 2){
      for(var row = index.row + 1; row <= index.row + 3; row++){
        for(var col = index.col - 1; col <= index.col + 1; col++){
          if(this.map.mapType === 'scroll'){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
          }
          else{
            if(this.map.testMapArr[row][col] > 1 && this.map.testMapArr[row][col] < 8 && row >= 0 && col >= 0){
                this.map.testMapArr[row][col] = 0;
            }
          }
        }
      }
    }
    else if(direction === 3){
      for(var row = index.row + 1; row >= index.row - 1; row--){
        for(var col = index.col + 1; col <= index.col + 3; col++){
          if(this.map.mapType === 'scroll'){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
          }
          else{
            if(this.map.testMapArr[row][col] > 1 && this.map.testMapArr[row][col] < 8 && row >= 0 && col >= 0){
                this.map.testMapArr[row][col] = 0;
            }
          }
        }
      }
    }
};

BurstCut.prototype.canHitMonster = function(direction,i){
      var playerPos = this.player.playerPic.position;
      var monsterArr = this.map.monsterArr;
      var dirDifference = {
        x: playerPos.x - monsterArr[i].pic.position.x,
        y: playerPos.y - monsterArr[i].pic.position.y
      };

      switch (direction) {
        case 0:
          if(Math.abs(dirDifference.x) <= 96 && dirDifference.y <= 96 && dirDifference.y >= 0){
              return true;
          }
          return false;
        case 1:
          if(dirDifference.x <= 96 && dirDifference.x >= 0 && Math.abs(dirDifference.y) <= 96){
               return true;
             }
          return false;
        case 2:
          if(Math.abs(dirDifference.x) <= 96 && dirDifference.y >= -96 && dirDifference.y <= 0){
               return true;
             }
          return false;
        case 3:
          if(dirDifference.x >= -96 && dirDifference.x <= 0 && Math.abs(dirDifference.y) <= 96){
               return true;
             }
          return false;
      }
};

BurstCut.prototype.attack = function(i, j, direction){
    var index = this.map.toArrayIndex(i, j, direction);
    var monsterArr = this.map.monsterArr;

    this.pic.start({from:0, to:7, loop:false});
    for(var i = 0; i < monsterArr.length; i++){//Determine if player hits the monster
      if(this.canHitMonster(direction,i) && monsterArr[i].canBeAttacked){
           if(monsterArr[i].currentHP >= this.damage){
             monsterArr[i].currentHP -= this.damage;
           }
           else{
             monsterArr[i].currentHP = 0;
           }
      }
    }
    this.removeObstacle(index,direction);
};