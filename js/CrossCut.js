var CrossCut = function(map){
     Skill.call(this, 2, 1.5, 50, 0, 3, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.load = function(){
       this.url = define.imagePathEffect + '004.png';
       this.picArr = [];
       for(var i = 0; i < 4; i++){
         this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:5, loop:true, speed:10});
         this.picArr.push(this.pic);
       }
     }

     this.init = function(){
       this.abilityList = [0, 1.7, 1.9, 2.1, 2.3, 2.5];
       this.hpCostList = [0, 30, 35, 40, 45, 50];
       this.picArr[0].rotation = 90;
       this.picArr[1].rotation = 180;
       this.picArr[2].rotation = 270;
     }


     this.draw = function(){
       var playerPos = this.player.playerPic.position;
       if(this.isDrawed){
         this.picArr[0].position = {
           x: playerPos.x,
           y: playerPos.y - 64
         };

         this.picArr[1].position = {
           x: playerPos.x - 64,
           y: playerPos.y
         };

         this.picArr[2].position = {
           x: playerPos.x,
           y: playerPos.y + 64
         };

         this.picArr[3].position = {
           x: playerPos.x + 64,
           y: playerPos.y
         };

         for(var i = 0 ; i < 4; i++){
           this.map.drawOtherObj(this.picArr[i]);
         }
       }
     }
}

CrossCut.prototype = Object.create(Skill.prototype);
CrossCut.prototype.constructor = Skill;

CrossCut.prototype.levelUp = function(){
    this.level = 5;
};

CrossCut.prototype.update = function(){
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;
    for(var i = 0; i < 4; i++){
      this.picArr[i].update();
    }
    this.changeDamage();
    this.changeMpCost();
    this.levelUp();

    if(this.isAttack && this.coolDownCounter > 0){
      this.coolDownCounter--;
    }
    if(this.coolDownCounter < this.coolDownTime * 100){
      this.canAttack = false;
    }
    if(this.coolDownCounter === 0){
      this.isAttack = false;
      this.canAttack = true;
      this.coolDownCounter = this.coolDownTime * 100;
    }
};

CrossCut.prototype.removeObstacle = function(index){
      for(var row = index.row - 1; row >= index.row - 3; row--){
        for(var col = index.col - 1; col <= index.col + 1; col++){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
        }
      }

      for(var row = index.row - 1; row <= index.row + 1; row++){
        for(var col = index.col - 3; col <= index.col - 1; col++){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
        }
      }

      for(var row = index.row + 1; row <= index.row + 3; row++){
        for(var col = index.col - 1; col <= index.col + 1; col++){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8  && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
        }
      }

      for(var row = index.row + 1; row >= index.row - 1; row--){
        for(var col = index.col + 1; col <= index.col + 3; col++){
            if(this.map.mapArr[this.player.currentMap][row][col] > 1 && this.map.mapArr[this.player.currentMap][row][col] < 8 && row >= 0 && col >= 0){
                this.map.mapArr[this.player.currentMap][row][col] = 0;
            }
        }
      }
}

CrossCut.prototype.attack = function(i, j, direction){
    var index = this.map.toArrayIndex(i, j, direction);
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;

    for(var i = 0; i < 4; i++){
      this.picArr[i].start({from:0, to:24, loop:false});
    }
    //Determine if player hits the monster
    for(var i = 0; i < monsterArr.length; i++){
      if(Math.abs(playerPos.x - monsterArr[i].pic.position.x) <= 120 &&
         Math.abs(playerPos.y - monsterArr[i].pic.position.y) <= 120){
        if(monsterArr[i].currentHP >= this.damage){
          monsterArr[i].currentHP -= this.damage;
        }
        else{
          monsterArr[i].currentHP = 0;
        }
      }
    }
    this.removeObstacle(index);
}