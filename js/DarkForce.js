var DarkForce = function(map){
    Skill.call(this, 0, 1, 0, 100, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
    this.load = function(){
        this.url = define.imagePathEffect + '013.png';
        this.url2 = define.imagePathEffect + 'buff1.png';
        this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:4, loop:true, speed:5});
        this.effectPic = new Framework.AnimationSprite({url:this.url2, col:5, row:6, loop:true, speed:12});
    }

    this.init = function(){
        this.pic.scale = 0.7;
        this.durationTime = 2000;
        this.timeCounter = 0;
        this.isUsingSkill = false;
    }

    this.draw = function(){
      if(this.isDrawed && this.timeCounter <= this.durationTime && this.timeCounter !== 0){
        this.isUsingSkill = true;
        this.pic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y + 20
        };
        this.effectPic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y
        };
        if(this.map.mapType === 'scroll'){
          this.map.drawOtherObj(this.pic);
          this.map.drawOtherObj(this.effectPic);
        }
        else{
          this.pic.draw();
          this.effectPic.draw();
        }
      }

      else{
        this.isUsingSkill = false;
      }
    }

    this.decreaseCoolDownTime = function(skill){
        skill.coolDownTime /= 2;
        skill.coolDownCounter = skill.coolDownTime * 100;
    }

    this.restoreCoolDownTime = function(skill){
        skill.coolDownTime *= 2;
        skill.coolDownCounter = skill.coolDownTime * 100;
    }
}

DarkForce.prototype = Object.create(Skill.prototype);
DarkForce.prototype.constructor = Skill;

DarkForce.prototype.update = function(){
    var playerPos = this.player.playerPic.position;
    this.pic.update();
    this.effectPic.update();
    
    if(this.isAttack){
      this.timeCounter++;
    }

    if(this.timeCounter % 30 === 0 && this.timeCounter > 0){
      this.pic.start({from:0, to:7, loop:false});
    }

    this.canAttack = true;
    if(this.timeCounter === this.durationTime){
      this.isAttack = false;
      this.restoreCoolDownTime(this.player.basicAttack);
      this.restoreCoolDownTime(this.player.vCut);
      this.restoreCoolDownTime(this.player.burstCut);
      this.restoreCoolDownTime(this.player.swordLight);
      this.restoreCoolDownTime(this.player.crossCut);
      this.timeCounter = 0;
    }
};

DarkForce.prototype.buff = function(){
    if(!this.isAttack){
      this.decreaseCoolDownTime(this.player.basicAttack);
      this.decreaseCoolDownTime(this.player.vCut);
      this.decreaseCoolDownTime(this.player.burstCut);
      this.decreaseCoolDownTime(this.player.swordLight);
      this.decreaseCoolDownTime(this.player.crossCut);
    }
    this.effectPic.start({from:0, to:29, loop:false});
};