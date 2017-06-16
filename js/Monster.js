var Monster = function(hp, atk, exp, player,map){
    this.hp = hp;
    this.atk = atk;
    this.exp = exp;
    this.currentHP = this.hp;
    this.currentAtk = this.atk;
    this.map = map;
    this.player = player;
    this.canGainExp = true;
    this.isDead = false;
    this.canBeAttacked = true;
    this.reviveTimeCounter = 0;
    this.isTouchingPlayer = false;
}

Monster.prototype.move = function(){

};

Monster.prototype.checkMonsterDead = function(){
    if(this.currentHP <= 0){
      this.currentAtk = 0;
      this.isDead = true;
      if(this.canGainExp){
        this.player.exp += this.exp;
        this.canGainExp = false;
      }
    }
};

Monster.prototype.revive = function(){
    if(this.isDead){
        this.reviveTimeCounter++;
    }
    if(this.reviveTimeCounter > 2000){
        this.isDead = false;
        this.currentHP = this.hp;
        this.currentAtk = this.atk;
        this.canGainExp = true;
        this.reviveTimeCounter = 0;
    }
};

Monster.prototype.printDamageReceived = function(ctx){
    var playerPos = this.player.playerPic.position;
    var screenPos = this.map.screenPosition;
    if(this.player.resistCounter != 270 && this.isTouchingPlayer){
        ctx.font = '16pt Arial';
        ctx.fillStyle = 'rgb(176, 50, 42)';
        if(this.map.mapType == 'scroll'){
          ctx.fillText('-' + Math.floor(this.atk*(1-this.player.def)), playerPos.x-screenPos.x-13, playerPos.y-screenPos.y-30);
        }
        else{
          ctx.fillText('-' + Math.floor(this.atk*(1-this.player.def)), playerPos.x-13, playerPos.y-30);
        }
    }
};

Monster.prototype.touchPlayer = function(){

};

Monster.prototype.attack = function(){

};