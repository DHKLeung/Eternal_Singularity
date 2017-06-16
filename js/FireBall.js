var FireBall = function(map,monster){
     Skill.call(this, 2, 0.2, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.monster = monster;
     this.load = function(){
       this.url = define.imagePathEffect + 'fireball.png';
       this.pic = new Framework.Sprite(this.url);
       this.pic.scale = 1;
       this.counter = 0;
       this.isAttack = true;
       this.direction = 0;
     }
}
FireBall.prototype = Object.create(Skill.prototype);
FireBall.prototype.constructor = Skill;

FireBall.prototype.update = function(){
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;

    this.pic.update();
    this.move();

    if(this.canHitMonster()){
      if(this.player.currentHP <= this.damage){
          this.player.currentHP = 0;
      }
      else{
          this.player.currentHP -= Math.floor(this.damage * (1-this.player.def));
      }
      this.player.isAttacked = true;
    }

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

FireBall.prototype.canHitMonster = function(){
    var playerPos = this.player.playerPic.position;
    var dirDifference = {
      x: playerPos.x - this.pic.position.x,
      y: playerPos.y - this.pic.position.y
    };


    if(Math.abs(dirDifference.x) < 65 && Math.abs(dirDifference.y) < 65){
        return true;
    }
    return false;
};

FireBall.prototype.move = function(){
    if(this.direction === 0){
      this.pic.position.y -= 5;
    }
    else{
      this.pic.position.y += 5;
    }
};

FireBall.prototype.attack = function(direction){
    var playerPos = this.player.playerPic.position;
    var screenRow = Math.floor(this.map.screenPosition.y/32), screenCol = Math.floor(this.map.screenPosition.x/32);

    this.direction = direction;
    if(this.direction === 0){
      this.pic.rotation = 180;
    }
};