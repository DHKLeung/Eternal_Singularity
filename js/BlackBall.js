var BlackBall = function(map,monster,ballNumber){
     Skill.call(this, 2, 2, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.monster = monster;
     this.load = function(){
       this.url = define.imagePathEffect + 'blackball.png';
       this.picArr = [];
       this.ballNumber = ballNumber;
       for(var i = 0; i < this.ballNumber; i++){
         this.pic = new Framework.Sprite(this.url);
         this.pic.scale = 1.5;
         this.picArr.push(this.pic);
       }
       this.counter = 0;
       this.isAttack = true;
       this.angleOffset = 0;
     }

     this.setBallPosition = function(angleOffset){
       this.angleOffset = angleOffset;
       for(var i = 0; i < this.picArr.length; i++){
         var angle = (Math.PI/12) * i + this.angleOffset;
         this.picArr[i].position = {
           x: monster.pic.position.x + Math.cos(angle) * 50,
           y: monster.pic.position.y + Math.sin(angle) * 50
         };
       }
     }

     this.pushBall = function(){
       this.pic = new Framework.Sprite(this.url);
       this.pic.scale = 1.5;
       this.picArr.push(this.pic);
     }
}

BlackBall.prototype = Object.create(Skill.prototype);
BlackBall.prototype.constructor = Skill;

BlackBall.prototype.update = function(){
    var playerPos = this.player.playerPic.position;
    for(var i = 0; i < this.picArr.length; i++){
      this.picArr[i].update();
      this.picArr[i].rotation += 15;
    }
    this.move();
    for(var i = 0; i < this.picArr.length; i++){
      if(this.canHitMonster(i)){
        if(this.player.currentHP <= this.damage){
            this.player.currentHP = 0;
        }
        else{
            this.player.currentHP -= Math.floor(this.damage * (1-this.player.def));
        }
        this.player.isAttacked = true;
      }
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

BlackBall.prototype.canHitMonster = function(i){
    var playerPos = this.player.playerPic.position;
    var dirDifference = {
      x: playerPos.x - this.picArr[i].position.x,
      y: playerPos.y - this.picArr[i].position.y
    };

    if(Math.abs(dirDifference.x) < 33 && Math.abs(dirDifference.y) < 33){
        return true;
    }
    return false;
};

BlackBall.prototype.move = function(){
    for(var i = 0; i < this.picArr.length; i++){
      var angle = (Math.PI/6) * i + this.angleOffset;
      this.picArr[i].position.x += Math.cos(angle) * 3
      this.picArr[i].position.y += Math.sin(angle) * 3
    }
};

BlackBall.prototype.attack = function(angleOffset){
    var playerPos = this.player.playerPic.position;
    var screenRow = Math.floor(this.map.screenPosition.y/32), screenCol = Math.floor(this.map.screenPosition.x/32);
    this.setBallPosition(angleOffset);
}