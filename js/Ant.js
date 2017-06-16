var Ant = function(map,player){
    Monster.call(this, 50, 15, 3, player, map);//Call the parent's constructor(hp,atk,exp,player)
    this.load = function(){
      this.url = define.imagePathMonster + "ant.png";
      this.pic = new Framework.AnimationSprite({url:this.url, col:3, row:4, loop: true, speed: 3});
      this.pic.scale = 0.8;
      this.walkDir = {x:0, y:0};
      this.counter = 0;
      this.name = 'ant';
    }

    this.draw = function(ctx){
      var picPos = this.pic.position;
      var screenPos = this.map.screenPosition;
      var playerPos = this.player.playerPic.position;

      ctx.fillStyle = 'rgb(76, 13, 89)';
      ctx.fillRect(picPos.x-screenPos.x-30, picPos.y-screenPos.y-30, 60*(this.currentHP/this.hp), 10);
      if(this.isTouchingPlayer){
        this.printDamageReceived(ctx);
      }
    }

    this.update = function(){
      if(this.counter > 90){
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

Ant.prototype = Object.create(Monster.prototype);
Ant.prototype.constructor = Monster;

Ant.prototype.move = function(randomDir){
  switch (randomDir) {
    case 0://up
      this.walkDir = {x: 0, y: -1};
      this.pic.start({from:9, to:11, loop:true});
      break;
    case 1://left
      this.walkDir = {x: -1, y: 0};
      this.pic.start({from:3, to:5, loop:true});
      break;
    case 2://down
      this.walkDir = {x: 0, y: 1};
      this.pic.start({from:0, to:2, loop:true});
      break;
    case 3://right
      this.walkDir = {x: 1, y: 0};
      this.pic.start({from:6, to:8, loop:true});
      break;
  }
  if(this.map.canMove(this.pic.position.x + this.walkDir.x, this.pic.position.y + this.walkDir.y, randomDir)){
      this.pic.position.x += this.walkDir.x;
      this.pic.position.y += this.walkDir.y;
  }
};

Ant.prototype.touchPlayer = function(){
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