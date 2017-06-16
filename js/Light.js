var Light = function(map){
    Skill.call(this, 0, 0, 0, 0, 0, map);
    this.load = function(){
      this.url = define.imagePathEffect + 'Warrior/003-1.png';
      this.pic = new Framework.Sprite(this.url);
      this.pic.scale = 0.7;
      this.direction = 0;
    }

    this.draw = function(){
      if(this.isDrawed && this.player.swordLight.isDrawed){
        this.map.drawOtherObj(this.pic);
      }
    }
}
Light.prototype = Object.create(Skill.prototype);
Light.prototype.constructor = Skill;

Light.prototype.move = function(){
  if(this.direction === 0){//up
    this.pic.position.y-=2;
    this.pic.rotation = 180;
  }
  else if(this.direction === 1){//left
    this.pic.position.x-=2;
    this.pic.rotation = 90;
  }
  else if(this.direction === 2){
    this.pic.position.y+=2;
    this.pic.rotation = 0;
  }

  else if(this.direction === 3){
    this.pic.position.x+=2;
    this.pic.rotation = 270;
  }
}

Light.prototype.changeDamage = function(){
    if(this.player.level >= 10){
      this.damage = this.player.atk;
    }
}

Light.prototype.update = function(){
    this.pic.update();
    this.changeDamage();
    if(this.player.swordLight.isAttack){
      this.move();
      this.isDrawed = true;
    }
    else{
      this.moveDistance = 0;
      this.isDrawed = false;
    }
    this.attack();
};

Light.prototype.attack = function(){
  var monsterArr = this.map.monsterArr;
  var index = this.map.toArrayIndex(this.pic.position.x, this.pic.position.y, -1);

  if(this.isAttack){
    for(var i = 0; i < monsterArr.length; i++){
      if(Math.abs(this.pic.position.x - monsterArr[i].pic.position.x) <= 32 &&
         Math.abs(this.pic.position.y - monsterArr[i].pic.position.y) <= 32 &&
         monsterArr[i].canBeAttacked){
           if(monsterArr[i].currentHP >= this.damage){
             monsterArr[i].currentHP -= this.damage;
           }
           else{
             monsterArr[i].currentHP = 0;
           }
           this.isAttack = false;
      }
    }
  }

  if(this.map.mapType === 'scroll'){
    if(index.row >= 0 && index.row < 38 && index.col >= 0 && index.col < 86){
      if(this.map.mapArr[this.player.currentMap][index.row][index.col] === 7) {
          this.map.mapArr[this.player.currentMap][index.row][index.col] = 1;
      }
      if(this.map.mapArr[this.player.currentMap][index.row][index.col] > 1 &&
         this.map.mapArr[this.player.currentMap][index.row][index.col] < 8){
          this.map.mapArr[this.player.currentMap][index.row][index.col] = 0;
      }
    }
  }
  else{
    if(index.row >= 0 && index.row < 22 && index.col >= 0 && index.col < 43){
      if(this.map.testMapArr[index.row][index.col] === 7) {
          this.map.testMapArr[index.row][index.col] = 1;
      }
      if(this.map.testMapArr[index.row][index.col] > 1 &&
         this.map.testMapArr[index.row][index.col] < 8){
          this.map.testMapArr[index.row][index.col] = 0;
      }
    }
  }
}