var HeroSlash = function(map){
     Skill.call(this, 2, 10, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.load = function(){
       this.url = define.imagePathEffect + 'Warrior/006.png';
       this.url2 = define.imagePathEffect + '023.png';
       this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:2, loop:true, speed:5});
       this.effectPic = new Framework.AnimationSprite({url:this.url2, col:5, row:5, loop:true, speed:8});
     }

     this.init = function(){
       this.abilityList = [0, 0.01, 0.02, 0.03, 0.04, 0.1];
       this.mpCostList = [0, 100, 150, 200, 250, 300];
       this.pic.scale = 1;

       this.durationTime = 300;
       this.timeCounter = 0;
       this.direction = 0;
       this.hit = false;
     }

     this.draw = function(){
       if(this.isDrawed && this.timeCounter !== this.durationTime && this.timeCounter > 1){
         if(this.map.mapType === 'scroll'){
           this.map.drawOtherObj(this.pic);
         }
         else{
           this.pic.draw();
         }
       }
     }

}

HeroSlash.prototype = Object.create(Skill.prototype);
HeroSlash.prototype.constructor = Skill;

HeroSlash.prototype.levelUp = function(){
    this.level = 5;
};

HeroSlash.prototype.move = function(){

  if(!this.hit && this.isAttack){
    if(this.direction === 0){//up
      this.pic.position.y-=2;
    }

    else if(this.direction === 1){//left
      this.pic.position.x-=2;
    }
    else if(this.direction === 2){
      this.pic.position.y+=2;
    }

    else if(this.direction === 3){
      this.pic.position.x+=2;
    }
  }
}

HeroSlash.prototype.update = function(){
    var i = this.monsterNumber;
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;
    this.pic.update();
    this.changeDamage();
    this.changeMpCost();
    this.levelUp();

    if(this.timeCounter < this.durationTime && this.isAttack){
      this.timeCounter++;
      this.attack();
      this.move();

    }

    if(this.timeCounter % 30 === 0){
      this.pic.start({from:0, to:7, loop:false});
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
      this.timeCounter = 0;
    }
};

HeroSlash.prototype.canHitMonster = function(i){
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;
    var dirDifference = {
      x: this.pic.position.x - monsterArr[i].pic.position.x,
      y: this.pic.position.y - monsterArr[i].pic.position.y
    };

    if(Math.abs(dirDifference.x) <= 96 && Math.abs(dirDifference.y) <= 96 && !monsterArr[i].isDead){
      this.hit = true;
      return true;
    }
    return false;
};

HeroSlash.prototype.attack = function(){
    var monsterArr = this.map.monsterArr;

    for(var i = 0; i < monsterArr.length; i++){//Determine if player hits the monster
      if(monsterArr[i].canBeAttacked && this.canHitMonster(i)){
           if(monsterArr[i].currentHP >= this.damage){
             monsterArr[i].currentHP -= this.damage;
           }
           else{
             monsterArr[i].currentHP = 0;
           }
      }
    }
};