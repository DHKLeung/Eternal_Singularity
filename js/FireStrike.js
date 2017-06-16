var FireStrike = function(map,monster){
     Skill.call(this, 500, 3, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.monster = monster;
     this.load = function(){
       this.url = define.imagePathEffect + '010.png';
       this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:3, loop:true, speed:4});
       this.pic.scale = 1;
       this.pic.position = {
         x: -500,
         y: -500
       }
     }
}
FireStrike.prototype = Object.create(Skill.prototype);
FireStrike.prototype.constructor = Skill;

FireStrike.prototype.update = function(){
    var i = this.monsterNumber;
    var playerPos = this.player.playerPic.position;
    this.pic.update();

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

FireStrike.prototype.canHitMonster = function(direction){
      var playerPos = this.player.playerPic.position;
      var monsterPos = this.monster.pic.position;
      var dirDifference = {
        x: playerPos.x - monsterPos.x,
        y: playerPos.y - monsterPos.y
      };

      if(Math.abs(dirDifference.x) < 180 && Math.abs(dirDifference.y) < 180){
          return true;
      }
      return false;
};

FireStrike.prototype.attack = function(direction){
    if(this.canHitMonster(direction)){
      if(this.player.currentHP <= this.damage){
          this.player.currentHP = 0;
      }
      else{
          this.player.currentHP -= Math.floor(this.damage * (1-this.player.def));
      }
      this.player.isAttacked = true;
    }
}