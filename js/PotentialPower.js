var PotentialPower = function(map){
    Skill.call(this, 0, 30, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
    this.load = function(){
        this.url = define.imagePathEffect + 'Warrior/007.png';
        this.url2 = define.imagePathEffect + 'fire_003.png';
        this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:4, loop:true, speed:5});
        this.effectPic = new Framework.AnimationSprite({url:this.url2, col:5, row:8, loop:true, speed:15});
    }

    this.init = function(){
        this.effectPic.scale = 0.7;
        this.durationTime = 1000;
        this.timeCounter = 0;
        this.isUsingSkill = false;
    }

    this.draw = function(){
      if(this.isDrawed && this.timeCounter <= this.durationTime && this.timeCounter !== 0){
        this.isUsingSkill = true;
        this.pic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y - 20
        };
        this.effectPic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y - 20
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
}
PotentialPower.prototype = Object.create(Skill.prototype);
PotentialPower.prototype.constructor = Skill;

PotentialPower.prototype.update = function(){
    var playerPos = this.player.playerPic.position;
    this.pic.update();
    this.effectPic.update();
    if(this.isAttack && this.coolDownCounter > 0){
      this.timeCounter++;
      this.coolDownCounter--;
    }

    if(this.timeCounter % 30 === 0 && this.timeCounter > 0){
      this.pic.start({from:1, to:16, loop:false});
    }

    if(this.coolDownCounter < this.coolDownTime * 100){//cool down
      this.canAttack = false;
    }
    
    if(this.coolDownCounter === 0){//skill ready
      this.isAttack = false;
      this.canAttack = true;
      this.coolDownCounter = this.coolDownTime * 100;
      this.timeCounter = 0;
    }

    if(this.timeCounter !== 0 && this.timeCounter <= this.durationTime / 2){
      this.player.def = 1;
    }

    if(this.timeCounter === this.durationTime){
      this.player.atk /= 1.5;
    }
};

PotentialPower.prototype.buff = function(){
    this.player.atk *= 1.5;

    this.effectPic.start({from:0, to:39, loop:false});
};