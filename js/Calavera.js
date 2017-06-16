var Calavera = function(map,player){
    Monster.call(this, 10000000, 100000, 0, player, map);//Call the parent's constructor(hp,atk,exp,player)this.direction = direction;
    this.load = function(){
      this.url = define.imagePathMonster + "calavera.png";
      this.pic = new Framework.AnimationSprite({url:this.url, col:4, row:4, loop: true, speed: 1});
      this.fireBall = new FireBall(map, this);
      this.fireBall.load();
      this.direction = 0;
      this.counter = 0;
      this.name = 'calavera';
    }

    this.draw = function(ctx){
      var picPos = this.pic.position;
      var screenPos = this.map.screenPosition;
      var playerPos = this.player.playerPic.position;

      ctx.fillStyle = 'rgb(176, 60, 87)';
      if(this.map.mapType === 'scroll'){
        ctx.fillRect(picPos.x-screenPos.x-30, picPos.y-screenPos.y-30, 60*(this.currentHP/this.hp), 10);
      }
      else{
        ctx.fillRect(picPos.x-30, picPos.y-30, 60*(this.currentHP/this.hp), 10);
      }
      if(this.isTouchingPlayer){
        this.printDamageReceived(ctx);
      }
      this.map.drawOtherObj(this.fireBall.pic);
    }

    this.update = function(){
      this.counter++;
      this.checkMonsterDead();
      this.revive();
      this.pic.update();
      this.fireBall.update();

      if(this.counter % 120 === 0 && !this.isDead){
        if(this.direction === 0){//up
          this.pic.start({from:12, to:15, loop:false});
        }
        else if(this.direction === 2){
          this.pic.start({from:0, to:3, loop:false});
        }
        this.usingFireBall();
      }
      if(this.player.currentHP > 0){
        this.touchPlayer();
      }
      if(this.player.resistCounter === 0){
        this.player.isAttacked = false;
        this.isTouchingPlayer = false;
        this.player.resistCounter = this.player.resistTime;
      }
    }

    this.usingFireBall = function(){
      if(this.fireBall.canAttack){
        this.fireBall.isAttack = true;
        this.fireBall.pic.position = {
          x: this.pic.position.x,
          y: this.pic.position.y
        };
        this.fireBall.attack(this.direction);
      }
    }

    this.setPositionAndDirection = function(pos,dir){
      this.direction = dir;
      this.pic.position = {
        x: pos.x * 32 + 16,
        y: pos.y * 32 + 16
      };
    }
}
Calavera.prototype = Object.create(Monster.prototype);
Calavera.prototype.constructor = Monster;

Calavera.prototype.touchPlayer = function(){
    var picPos = this.pic.position;
    var playerPos = this.player.playerPic.position;
    if(Math.abs(picPos.x - playerPos.x) < 33 && Math.abs(picPos.y - playerPos.y) < 33 && !this.isDead){
        if(this.player.currentHP <= this.currentAtk){
            this.player.currentHP = 0;
        }
        else{
            this.player.currentHP -= Math.floor(this.currentAtk * (1-this.player.def));
        }
        this.player.isAttacked = true;
        this.isTouchingPlayer = true;
    }
};