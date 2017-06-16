var TreasureChest = function(map){
    this.map = map;
    this.player = map.player;
    this.load = function(){
      this.url1 = define.imagePathCharacter + 'treasure_chest.png';
      this.url2 = define.imagePathCharacter + 'treasure_chest_hover.png';
      this.url3 = define.imagePathItem + 'mission_item/Perfect_scroll.png';
      this.pic = new Framework.Sprite(this.url1);
      this.picHover = new Framework.Sprite(this.url2);
      this.perfect_scroll = new Framework.Sprite(this.url3);
    };

    this.init = function(){
      this.pic.position = {
        x: 2680,
        y: 1132
      };
      this.picHover.position = this.pic.position;
      this.perfect_scroll.position = this.pic.position;
      this.pic.scale = 0.2;
      this.picHover.scale = 0.2;
      this.isPicHover = false;
      this.drawPic = true;
      this.picMoveOffset = 0;
      this.picMoveCounter = 0;
    };

    this.draw = function(ctx){
      if(!this.drawPic && this.map.propertyArr[35][83] !== 0){
        this.map.drawOtherObj(this.perfect_scroll);
        this.picMoveCounter++;
        if(this.picMoveCounter < 30){
          this.picMovingUp();
          this.perfect_scroll.rotation += 18;
        }
        else if(this.picMoveCounter >= 30 && this.picMoveCounter <= 60){
          this.picMovingDown();
          this.perfect_scroll.rotation += 18;
        }
      }
    };

    this.update = function(){
      this.perfect_scroll.update();
    };

    this.picMovingUp = function(){
      this.perfect_scroll.position.y-=2;
    };

    this.picMovingDown = function(){
      this.perfect_scroll.position.y+=2;
    };

    this.mousemove = function(e){
        if(e.x + this.map.screenPosition.x >= 2643 && e.x + this.map.screenPosition.x <= 2725 &&
           e.y + this.map.screenPosition.y >= 1093 && e.y + this.map.screenPosition.y <= 1177){
            this.isPicHover = true;
        }
        else{
            this.isPicHover = false;
        }
    };

    this.click = function(e){
      if(e.x + this.map.screenPosition.x >= 2643 && e.x + this.map.screenPosition.x <= 2725 &&
         e.y + this.map.screenPosition.y >= 1093 && e.y + this.map.screenPosition.y <= 1177){
          this.getReward();
      }
    };

    this.getReward = function(){
      if(this.player.level >= 10){
          this.drawPic = false;
          this.map.propertyArr[35][83] = 31;
      }
    };
}