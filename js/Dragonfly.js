var Dragonfly = function(map,player){
    Monster.call(this, 5, 10, 1, player, map);//Call the parent's constructor(hp,atk,exp,player)
    this.load = function(){
      this.url = define.imagePathMonster + "dragonfly.png";
      this.pic = new Framework.AnimationSprite({url:this.url, col:7, row:4, loop: true, speed: 7});
      this.walkDir = {x:0, y:0};
      this.counter = 0;
      this.name = 'dragonfly';
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
    }

    this.update = function(){
      if(this.counter > 100){
        var randomDir = Math.floor(Math.random() * 4);
        this.counter = 0;
      }
      this.counter++;
      this.move(randomDir);
      this.checkMonsterDead();
      this.revive();
      this.pic.update();

      if(this.player.currentHP > 0 && this.player.isAttacked === false){
        this.touchPlayer();
      }

      if(this.player.resistCounter === 0){
        this.player.isAttacked = false;
        this.isTouchingPlayer = false;
        this.player.resistCounter = this.player.resistTime;
      }
    }

    this.setPosition = function(pos){
      this.pic.position = {
        x: pos.x * 32 + 16,
        y: pos.y * 32 + 16
      };
    }
}
Dragonfly.prototype = Object.create(Monster.prototype);
Dragonfly.prototype.constructor = Monster;

Dragonfly.prototype.move = function(randomDir){
  switch (randomDir) {
    case 0://up
      this.walkDir = {x: 0, y: -1};
      this.pic.start({from:0, to:6, loop:true});
      break;
    case 1://left
      this.walkDir = {x: -1, y: 0};
      this.pic.start({from:21, to:27, loop:true});
      break;
    case 2://down
      this.walkDir = {x: 0, y: 1};
      this.pic.start({from:14, to:20, loop:true});
      break;
    case 3://right
      this.walkDir = {x: 1, y: 0};
      this.pic.start({from:7, to:13, loop:true});
      break;
  }
  if(this.map.canMove(this.pic.position.x + this.walkDir.x, this.pic.position.y + this.walkDir.y, randomDir)){
      this.pic.position.x += this.walkDir.x;
      this.pic.position.y += this.walkDir.y;
  }
};

Dragonfly.prototype.touchPlayer = function(){
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