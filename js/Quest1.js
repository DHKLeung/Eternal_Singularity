var Quest1 = function(map, player, questUI){
    QuestInterface.call(this, map, player, questUI);
    this.isTrigger = true;
    this.questNum = 0;

    this.draw = function(ctx){
      if(this.questUI.uiPic.scale >= 0.5){
        if(this.isHover === false){
          this.title.draw();
        }
        else{
          this.titleHover.draw();
        }
      }

      if(this.drawContent){
        this.content.draw();
        if(this.content.scale >= 0.37){
          if(!this.isSubmitBtnHover){
            this.submitBtn.draw();
          }
          else{
            this.submitBtnHover.draw();
          }
        }
      }
      else {
        this.content.scale = 0.1;
      }
    }

    this.update = function(){
      if(this.content.scale < 0.37){
        this.content.scale += 0.0045;
      }
      this.closeContentPos = {
        x: this.content.position.x + 159,
        y: this.content.position.y - 105
      };
    }
}

Quest1.prototype = Object.create(QuestInterface.prototype);
Quest1.prototype.constructor = QuestInterface;

Quest1.prototype.load = function(){
    this.title = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest1/title.png');
    this.titleHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest1/title_hover.png');
    this.content = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest1/content.png');
    this.rewardInfo = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest1/rewardInfo.png');
}

Quest1.prototype.init = function(){
    this.title.scale = 0.45;
    this.titleHover.scale = this.title.scale;
    this.content.scale = 0.05;//to 0.37
    this.submitBtn.scale = 0.35;
    this.submitBtnHover.scale = this.submitBtn.scale;
    this.rewardInfo.scale = 0.38;

    this.title.position = {
      x: 620,
      y: 150
    };
    this.titleHover.position = this.title.position;
    this.content.position = {
      x: 230,
      y: 304
    };
    this.submitBtn.position ={
      x: this.content.position.x - 20,
      y: this.content.position.y + 70
    };
    this.submitBtnHover.position = this.submitBtn.position;

    this.rewardInfo.position = {
      x: 630,
      y: 320
    };
};

Quest1.prototype.checkCompleted = function(){
    var bag = this.player.bag;

    if(bag.getPropertyNumber(1) >= 1 && bag.getPropertyNumber(2) >= 1 && bag.getPropertyNumber(3) >= 1){
       this.isCompleted = true;
    }
};

Quest1.prototype.getReward = function(){
    var propertyArr = this.player.bag.propertyArr;
    var propObj = {
       type: 4,
       number: 5
    };

    if(this.isCompleted && this.canReceiveReward){
      this.player.exp += 15;
      if(!this.player.bag.isPropertyExist(propObj)){
          this.player.bag.propertyArr.push(propObj);
      }
      else{
         this.player.bag.addProperty(propObj);
      }
      this.canReceiveReward = false;
      this.takeAwayProperties(propertyArr);
    }
};

Quest1.prototype.takeAwayProperties = function(propertyArr){
    for(var i = 0; i < propertyArr.length; i++){
        if(propertyArr[i].type === 1 || propertyArr[i].type === 2 || propertyArr[i].type === 3){
          this.player.bag.propertyArr[i].number--;
        }
    }
};