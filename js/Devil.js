var Devil = function(map,player){
    Monster.call(this, 170000, 300, 7, player, map);//Call the parent's constructor(hp,atk,exp,player)
    this.load = function(){
      this.url1 = define.imagePathMonster + "boss.png";
      this.url2 = define.imagePathEffect + '010.png';
      this.pic = new Framework.AnimationSprite({url:this.url1, col:3, row:4, loop: true, speed: 1});
      this.strikePic = new Framework.AnimationSprite({url:this.url2, col:5, row:3, loop:true, speed:12});
      this.strikePic.scale = 0.5;
      this.strikePic.rotation = 180;
      this.pic.scale = 1.5;
      this.fireStrike = new FireStrike(map,this);
      this.fireStrike.load();
      this.walkDir = {x:0, y:0};
      this.direction = 0;
      this.walkCounter = 0;
      this.fireStrikeCounter = 0;
      this.isUsingSkill = false;
      this.name = 'devil';
      for(var i = 0; i < this.map.monsterArr.length; i++){
        if(this.map.monsterArr[i].name === 'boss'){
          this.boss = this.map.monsterArr[i];
        }
      }
    }

    this.draw = function(ctx){
      var picPos = this.pic.position;
      var screenPos = this.map.screenPosition;
      var playerPos = this.player.playerPic.position;


      if(this.map.mapType === 'scroll'){
        ctx.fillStyle = 'rgba(118, 116, 122, 0.69)';
        if(!this.isDead){
            ctx.fillRect(picPos.x-screenPos.x-90, picPos.y-screenPos.y-50, 180, 10);
        }
        ctx.fillStyle = 'rgb(9, 4, 23)';
        ctx.fillRect(picPos.x-screenPos.x-90, picPos.y-screenPos.y-50, 180*(this.currentHP/this.hp), 10);
      }
      else{
        ctx.fillStyle = 'rgba(118, 116, 122, 0.69)';
        if(!this.isDead){
            ctx.fillRect(picPos.x-90, picPos.y-50, 180, 10);
        }
        ctx.fillStyle = 'rgb(9, 4, 23)';
        ctx.fillRect(picPos.x-90, picPos.y-50, 180*(this.currentHP/this.hp), 10);
      }
      this.map.drawOtherObj(this.fireStrike.pic);
      this.strikePic.draw();
    }

    this.update = function(){
      if(this.walkCounter > 120){
        var randomDir = Math.floor(Math.random() * 4);
        this.walkCounter = 0;
      }

      if(this.closeToPlayer()){
        this.tracePlayer();
      }
      else{
        this.move(randomDir);
      }

      if(!this.boss.isDead){
        this.revive();
      }
      this.walkCounter++;

      this.checkMonsterDead();
      this.pic.update();
      this.fireStrike.update();
      this.strikePic.update();
      this.fireStrikeCounter++;

      if(this.fireStrikeCounter % 100 === 0){
        this.isUsingSkill = false;
      }

      if(this.player.currentHP > 0 && !this.isDead){
        if(this.player.isAttacked === false){
          this.touchPlayer();
        }

        if(this.closeToPlayer() && !this.isUsingSkill){
          this.usingFireStrike();
        }
      }

      if(this.player.resistCounter === 0){
        this.player.isAttacked = false;
        this.isTouchingPlayer = false;
        this.player.resistCounter = this.player.resistTime;
      }
    }

    this.closeToPlayer = function(){
      var playerPos = this.player.playerPic.position;
      if(Math.abs(this.pic.position.x - playerPos.x) < 180 && Math.abs(this.pic.position.y - playerPos.y) < 180){
          return true;
      }
      return false;
    }

    this.usingFireStrike = function(){
      if(this.fireStrike.canAttack){
        this.isUsingSkill = true;
        this.fireStrike.isAttack = true;
        this.fireStrike.pic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y
        };
        this.strikePic.position = {
          x: this.pic.position.x,
          y: this.pic.position.y
        }
        this.fireStrike.pic.start({from:0, to:11, loop:false});
        this.strikePic.start({from:0, to:11, loop:false});
        this.fireStrike.attack(this.direction);
      }
    }

    this.setPosition = function(pos){
      this.pic.position = {
        x: pos.x * 32 + 16,
        y: pos.y * 32 + 16
      };
    }

    this.tracePlayer = function(){
        var playerPos = this.player.playerPic.position;
        if(this.pic.position.x < playerPos.x && this.pic.position.y < playerPos.y){//Left top
            this.walkDir = {x: 0, y: 0.3};
            this.traceMove(2);
            this.walkDir = {x: 0.3, y: 0};
            this.traceMove(3);
            if(this.walkCounter < 3){
              if(Math.abs(this.pic.position.x - playerPos.x) <= 96){
                this.pic.start({from:0, to:2, loop:true});
              }
              else{
                this.pic.start({from:6, to:8, loop:true});
              }
            }
        }

        else if(this.pic.position.x > playerPos.x && this.pic.position.y < playerPos.y){//Right top
            this.walkDir = {x: 0, y: 0.3};
            this.traceMove(2);
            this.walkDir = {x: -0.3, y: 0};
            this.traceMove(1);
            if(this.walkCounter < 3){
              if(Math.abs(this.pic.position.x - playerPos.x) <= 96){
                this.pic.start({from:0, to:2, loop:true});
              }
              else{
                this.pic.start({from:3, to:5, loop:true});
              }
            }
        }

        else if(this.pic.position.x < playerPos.x && this.pic.position.y > playerPos.y){//Left down
            this.walkDir = {x: 0, y: -0.3};
            this.traceMove(0);
            this.walkDir = {x: 0.3, y: 0};
            this.traceMove(3);
            if(this.walkCounter < 3){
              if(Math.abs(this.pic.position.x - playerPos.x) <= 96){
                this.pic.start({from:9, to:11, loop:true});
              }
              else{
                this.pic.start({from:6, to:8, loop:true});
              }
            }
        }

        else if(this.pic.position.x > playerPos.x && this.pic.position.y > playerPos.y){//Right down
            this.walkDir = {x: 0, y: -0.3};
            this.traceMove(0);
            this.walkDir = {x: -0.3, y: 0};
            this.traceMove(1);
            if(this.walkCounter < 3){
              if(Math.abs(this.pic.position.x - playerPos.x) <= 96){
                this.pic.start({from:9, to:11, loop:true});
              }
              else{
                this.pic.start({from:3, to:5, loop:true});
              }
            }
        }
    }
    this.traceMove = function(dir){
      this.direction = dir;
      if(this.map.canMove(this.pic.position.x + this.walkDir.x, this.pic.position.y + this.walkDir.y, dir)){
          this.pic.position.x += this.walkDir.x;
          this.pic.position.y += this.walkDir.y;
      }
    }
}

Devil.prototype = Object.create(Monster.prototype);
Devil.prototype.constructor = Monster;

Devil.prototype.move = function(randomDir){
  this.direction = randomDir;
  switch (randomDir) {
    case 0://up
      this.walkDir = {x: 0, y: -0.3};
      this.pic.start({from:9, to:11, loop:true});
      break;
    case 1://left
      this.walkDir = {x: -0.3, y: 0};
      this.pic.start({from:3, to:5, loop:true});
      break;
    case 2://down
      this.walkDir = {x: 0, y: 0.3};
      this.pic.start({from:0, to:2, loop:true});
      break;
    case 3://right
      this.walkDir = {x: 0.3, y: 0};
      this.pic.start({from:6, to:8, loop:true});
      break;
  }
  if(this.map.canMove(this.pic.position.x + this.walkDir.x, this.pic.position.y + this.walkDir.y, randomDir)){
      this.pic.position.x += this.walkDir.x;
      this.pic.position.y += this.walkDir.y;
  }
};

Devil.prototype.revive = function(){
    if(this.isDead){
        this.reviveTimeCounter++;
    }

    if(this.reviveTimeCounter === 7201){
        this.boss.deadDevilCounter++;
    }

    if(this.reviveTimeCounter > 7200){
        this.isDead = false;
        this.currentHP = this.hp;
        this.currentAtk = this.atk;
        this.canGainExp = true;
        this.reviveTimeCounter = 0;
    }
};

Devil.prototype.touchPlayer = function(){
    var picPos = this.pic.position;
    var playerPos = this.player.playerPic.position;
    if(Math.abs(picPos.x - playerPos.x) < 50 && Math.abs(picPos.y - playerPos.y) < 50 && !this.isDead){
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

Devil.prototype.attack = function(){

};