var VCut = function(map){
     Skill.call(this, 2, 0.8, 0, 5, 3, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.load = function(){
       this.url = define.imagePathEffect + 'Warrior/001.png';
       this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:4, loop:true, speed:10});
     }

     this.init = function(){
       this.abilityList = [0, 1.1, 1.2, 1.3, 1.4, 1.5];
       this.mpCostList = [0, 5, 6, 7, 8, 9];
       this.pic.scale = 0.5;
     }

     this.picDirection = function(direction){
       switch (direction) {
         case 0:
           this.pic.rotation = 180;
           break;
         case 1:
           this.pic.rotation = 90;
           break;
         case 2:
           this.pic.rotation = 0;
           break;
         case 3:
           this.pic.rotation = 270;
           break;
       }
     }

     this.draw = function(){
       if(this.isDrawed){
         this.map.drawOtherObj(this.pic);
       }
     }
}

VCut.prototype = Object.create(Skill.prototype);
VCut.prototype.constructor = Skill;

VCut.prototype.levelUp = function(){
    for(var level = 5; level <= 9; level++){
      if(this.player.level === level){
        this.level = level - 4;
      }
    }
    if(this.player.level > 9 || this.map.mapType !== 'scroll'){
      this.level = 5;
    }
};

VCut.prototype.removeObstacle = function(index,direction){
    var mapArr = this.map.mapArr;
    var currentMap = this.player.currentMap;

    if(direction === 0){//up
      for(var row = index.row - 1; row >= index.row - 3; row--){
        if(mapArr[currentMap][row][index.col] > 0 &&
           mapArr[currentMap][row][index.col] < 8 && row >= 0){
           mapArr[currentMap][row][index.col] = 0;
        }
      }
    }
    else if(direction === 1){//left
      for(var col = index.col - 1; col >= index.col - 3; col--){
        if(mapArr[currentMap][index.row][col] > 0 &&
           mapArr[currentMap][index.row][col] < 8 && col >= 0){
           mapArr[currentMap][index.row][col] = 0;
        }
      }
    }
    else if(direction === 2){
      for(var row = index.row + 1; row <= index.row + 3; row++){
        if(mapArr[currentMap][row][index.col] > 0 &&
           mapArr[currentMap][row][index.col] < 8 && row >= 0){
           mapArr[currentMap][row][index.col] = 0;
        }
      }
    }
    else if(direction === 3){
      for(var col = index.col + 1; col <= index.col + 3; col++){
        if(mapArr[currentMap][index.row][col] > 0 &&
           mapArr[currentMap][index.row][col] < 8 && col >= 0){
           mapArr[currentMap][index.row][col] = 0;
        }
      }
    }
};

VCut.prototype.canHitMonster = function(direction,i){
      var playerPos = this.player.playerPic.position;
      var monsterArr = this.map.monsterArr;
      var dirDifference = {
        x: playerPos.x - monsterArr[i].pic.position.x,
        y: playerPos.y - monsterArr[i].pic.position.y
      };

      switch (direction) {
        case 0:
          if(Math.abs(dirDifference.x) <= 32 && dirDifference.y <= 96 && dirDifference.y >= 0){
              return true;
          }
          return false;
        case 1:
          if(dirDifference.x <= 96 && dirDifference.x >= 0 && Math.abs(dirDifference.y) <= 32){
               return true;
             }
          return false;
        case 2:
          if(Math.abs(dirDifference.x) <= 32 && dirDifference.y >= -96 && dirDifference.y <= 0){
               return true;
             }
          return false;
        case 3:
          if(dirDifference.x >= -96 && dirDifference.x <= 0 && Math.abs(dirDifference.y) <= 32){
               return true;
             }
          return false;
      }
};

VCut.prototype.attack = function(i, j, direction){
    var index = this.map.toArrayIndex(i, j, direction);
    var monsterArr = this.map.monsterArr;
    
    this.picDirection(direction);
    this.pic.start({from:0, to:16, loop:false});

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
}