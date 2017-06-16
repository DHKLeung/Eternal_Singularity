var Boss = function(map,player){
    Monster.call(this, 500000, 1000, 0, player, map);//Call the parent's constructor(hp,atk,exp,player)
    this.load = function(){
      this.url1 = define.imagePathMonster + 'inquisitor.png';
      this.url2 = define.imagePathEffect + 'ice_001.png';
      this.url3 = define.imagePathEffect + '005.png';
      this.pic = new Framework.AnimationSprite({url:this.url1, col:3, row:4, loop: true, speed: 1});
      this.icePic = new Framework.AnimationSprite({url:this.url2, col:5, row:6, loop: true, speed: 30});
      this.guardPic = new Framework.AnimationSprite({url:this.url3, col:5, row:4, loop: true, speed: 1});
      this.guardPic.scale = 1.8;
      this.pic.scale = 1.2;
      this.frostbolt = new Frostbolt(map,this);
      this.frostbolt.load();
      this.blackball = new BlackBall(map,this,12);
      this.blackball.load();
      this.boomerang = new Boomerang(map,this);
      this.boomerang.load();
      this.thunder = new Thunder(map,this);
      this.thunder.load();
      this.counter = 0;
      this.alpha = 0;
      this.defenderArr = [];
      this.deadDevilCounter = 2;
      this.ballAngleOffset = 0;
      this.isUsingSkill = false;
      this.canBeAttacked = false;
      this.name = 'boss';
    }
    this.init = function(){
      this.guardPic.position = {
        x: this.pic.position.x,
        y: this.pic.position.y
      }
    }

    this.initDefenderArr = function(){
      for(var i = 0; i < this.map.monsterArr.length; i++){
        if(this.map.monsterArr[i].name === 'defender' && this.defenderArr.length < 2){
          this.defenderArr.push(this.map.monsterArr[i]);
        }
      }
    }

    this.draw = function(ctx){
      var picPos = this.pic.position;
      var screenPos = this.map.screenPosition;
      var playerPos = this.player.playerPic.position;
      var monsterArr = this.map.monsterArr;

      ctx.fillStyle = 'rgba(118, 116, 122, 0.9)';
      if(!this.isDead){
          ctx.fillRect(450, 10, 500, 20);
      }
      ctx.fillStyle = 'rgba(65, 9, 34, 0.93)';
      ctx.fillRect(450, 10, 500*(this.currentHP/this.hp), 20);
      this.printDamageReceived(ctx);
      for(var i = 0; i < this.frostbolt.picArr.length; i++){
        this.map.drawOtherObj(this.frostbolt.picArr[i]);
      }
      if(this.blackball.isDrawed){
        for(var i = 0; i < this.blackball.picArr.length; i++){
          this.map.drawOtherObj(this.blackball.picArr[i])
        }
      }

      if(this.boomerang.isDrawed && this.boomerang.coolDownCounter > 850 && !this.isDead)
      for(var i = 0; i < this.boomerang.picArr.length; i++){
        this.map.drawOtherObj(this.boomerang.picArr[i]);
      }
      this.frostbolt.effectPic.draw();
      this.icePic.draw();
      this.thunder.draw();
      for(var i = 0; i < monsterArr.length; i++){
        if(monsterArr[i].name === 'devil'){
            if(!monsterArr[i].isDead){
              this.map.drawOtherObj(this.guardPic);
            }
            else{
              if(monsterArr[i].reviveTimeCounter > 0 && monsterArr[i].reviveTimeCounter < 2){
                this.deadDevilCounter--;
              }
            }
        }
      }
      if(this.isDead){
        this.map.isWin = true;
      }
    }

    this.update = function(){
      this.counter++;
      this.frostbolt.counter++;
      if(this.counter % 100 === 0){
        this.pic.start({from:0, to:2, loop:false});
        this.guardPic.start({from:0, to:0, loop:false});
      }

      if(this.frostbolt.counter % 100 === 0){
        this.isUsingSkill = false;
      }

      if(this.deadDevilCounter == 0){
        this.canBeAttacked = true;
      }
      else{
        this.canBeAttacked = false;
      }

      this.checkMonsterDead();

      this.pic.update();
      this.frostbolt.update();
      this.blackball.update();
      this.boomerang.update();
      this.thunder.update();
      this.thunder.effectPic.update();
      this.icePic.update();
      this.guardPic.update();

      if(this.currentHP <= this.hp / 2){
          this.map.isHeavyRain = true;
          this.usingThunder();
      }

      if(this.player.currentHP > 0 && !this.isDead){
        if(this.player.isAttacked === false){
          this.touchPlayer();
        }
        this.usingBlackBall();
        if(!this.isUsingSkill){
          this.usingFrostBolt();
          this.usingBoomerang();
        }
      }

      if(this.player.resistCounter === 0){
        this.player.isAttacked = false;
        this.isTouchingPlayer = false;
        this.player.resistCounter = this.player.resistTime;
      }
    }

    this.usingThunder = function(){
      if(this.thunder.canAttack && !this.isDead){
        this.thunder.isDrawed = true;
        this.thunder.isAttack = true;
        this.thunder.attack();
      }
    }

    this.usingBoomerang = function(){
      if(this.boomerang.canAttack && !this.isDead){
        this.boomerang.isDrawed = true;
        this.boomerang.isAttack = true;
        this.boomerang.attack();
      }
    }

    this.usingBlackBall = function(){
      if(this.blackball.canAttack && !this.isDead){
        this.ballAngleOffset += 10;
        this.blackball.isDrawed = true;
        this.blackball.isAttack = true;
        this.initDefenderArr();
        for(var i = 0; i < this.defenderArr.length; i++){
          if(!this.defenderArr[i].isDead && this.blackball.ballNumber <= 36 && this.counter % 700 === 0){
            this.blackball.pushBall();
          }
        }
        if(this.defenderArr.length === 0){
            this.blackball.picArr.splice(11, this.blackball.picArr.length-12);
        }
        this.blackball.attack(this.ballAngleOffset);
      }
    }

    this.usingFrostBolt = function(){
      if(this.frostbolt.canAttack){
        this.isUsingSkill = true;
        this.frostbolt.isAttack = true;
        this.icePic.position = {
          x: this.pic.position.x,
          y: this.pic.position.y
        }

        this.icePic.start({from:0, to:29, loop:false});
        this.frostbolt.attack();
      }
    }

    this.setPosition = function(pos){
      this.pic.position = {
        x: pos.x * 32 + 16,
        y: pos.y * 32 + 16
      };
    }
}
Boss.prototype = Object.create(Monster.prototype);
Boss.prototype.constructor = Monster;

Boss.prototype.touchPlayer = function(){
    var picPos = this.pic.position;
    var playerPos = this.player.playerPic.position;
    if(Math.abs(picPos.x - playerPos.x) < 90 && Math.abs(picPos.y - playerPos.y) < 80 && !this.isDead){
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