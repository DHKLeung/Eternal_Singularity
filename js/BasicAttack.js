var BasicAttack = function(map){
    Skill.call(this, 1, 0.5, 0, 0, 1, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)

    this.load = function(){
      this.url = define.imagePathEffect + 'slash.png';
      this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:2, loop:true, speed:5});
    }

    this.init = function(){
      this.pic.scale = 0.35;
      this.range = {x:32, y:32};
    }

    this.draw = function(){
      if(this.isDrawed){
        this.map.drawOtherObj(this.pic);
      }
    }
}

BasicAttack.prototype = Object.create(Skill.prototype);
BasicAttack.prototype.constructor = Skill;

BasicAttack.prototype.changeDamage = function(){
    this.damage = this.player.atk;
};

BasicAttack.prototype.changeMpCost = function(){

};

BasicAttack.prototype.attack = function(i, j, direction){
    var index = this.map.toArrayIndex(i, j, direction);
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;

    this.pic.start({from:0, to:8, loop:false});
    for(var i = 0; i < monsterArr.length; i++){
      if(Math.abs(playerPos.x - monsterArr[i].pic.position.x) <= this.range.x &&
         Math.abs(playerPos.y - monsterArr[i].pic.position.y) <= this.range.y &&
         monsterArr[i].canBeAttacked){
           if(monsterArr[i].currentHP >= this.damage){
             monsterArr[i].currentHP -= this.damage;
           }
           else{
             monsterArr[i].currentHP = 0;
           }
      }
    }

    if(this.map.mapType === 'scroll'){
      if(this.map.mapArr[this.player.currentMap][index.row][index.col] === 7) {
          this.map.mapArr[this.player.currentMap][index.row][index.col] = 1;
      }
      if(this.map.mapArr[this.player.currentMap][index.row][index.col] > 1 &&
         this.map.mapArr[this.player.currentMap][index.row][index.col] < 8){
          this.map.mapArr[this.player.currentMap][index.row][index.col] = 0;
      }
    }
    else{
      if(this.map.testMapArr[index.row][index.col] === 7) {
          this.map.testMapArr[index.row][index.col] = 1;
      }
      if(this.map.testMapArr[index.row][index.col] > 1 &&
         this.map.testMapArr[index.row][index.col] < 8){
          this.map.testMapArr[index.row][index.col] = 0;
      }
    }
};