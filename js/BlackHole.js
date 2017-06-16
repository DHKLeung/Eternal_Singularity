var BlackHole = function(map){
    this.load = function(){
      this.url = define.imagePathEffect + "032.png";
      this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:2, loop: true, speed: 3});
      this.pic.position = {
        x: 2254,
        y: 636
      };
      this.blackball = new BlackBall(map,this,36);
      this.blackball.load();
      this.counter = 0;
      this.ballAngleOffset = 0;
      this.map = map;
      this.player = this.map.player;
    }

    this.draw = function(ctx){
      var picPos = this.pic.position;
      var screenPos = this.map.screenPosition;
      var playerPos = this.player.playerPic.position;

      this.map.drawOtherObj(this.pic);

      if(this.blackball.isDrawed){
        for(var i = 0; i < this.blackball.picArr.length; i++){
          this.map.drawOtherObj(this.blackball.picArr[i]);
        }
      }
    }

    this.update = function(){
      this.counter++;
      this.pic.update();
      this.blackball.update();

      if(this.counter % 30 === 0){
        this.pic.start({from:0, to:3, loop:false});
      }

      if(this.counter % 360 === 0 && this.player.currentMap === 3){
        this.usingBlackBall();
      }
    }

    this.usingBlackBall = function(){
      if(this.blackball.canAttack){
        this.ballAngleOffset += 10;
        this.blackball.isDrawed = true;
        this.blackball.isAttack = true;

        this.blackball.attack(this.ballAngleOffset);
      }
    }
}