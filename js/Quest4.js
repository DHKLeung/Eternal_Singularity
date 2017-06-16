var Quest4 = function(map, player, questUI){
    QuestInterface.call(this, map, player, questUI);
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
        this.content.scale = 0.05;
      }

      if(this.isTrigger && this.alertCounter < 180){
        this.alertCounter++;
        this.alert.draw();
      }
    }

    this.update = function(){
      this.setTriggeringCondition();
      this.processingQuest();

      if(this.content.scale < 0.37){
        this.content.scale += 0.0045;
      }

      this.titleHover.position = this.title.position;
      this.content.position = {//width = 420
        x: 230,
        y: 304
      };
      this.submitBtn.position ={
        x: this.content.position.x - 20,
        y: this.content.position.y + 70
      };
      this.closeContentPos = {
        x: this.content.position.x + 159,
        y: this.content.position.y - 50
      };
    }
}

Quest4.prototype = Object.create(QuestInterface.prototype);
Quest4.prototype.constructor = QuestInterface;

Quest4.prototype.load = function(){
    this.title = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest4/title.png');
    this.titleHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest4/title_hover.png');
    this.content = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest4/content.png');
    this.rewardInfo = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest4/rewardInfo.png');
}

Quest4.prototype.init = function(){
    this.title.scale = 0.45;
    this.titleHover.scale = this.title.scale;
    this.content.scale = 0.05;
    this.submitBtn.scale = 0.35;
    this.rewardInfo.scale = 0.38;

    this.rewardInfo.position = {
      x: 630,
      y: 320
    };

    this.antKilledCounter = 0;
    this.spiderKilledCounter = 0;
};

Quest4.prototype.drawInfo = function(ctx){
  if(!this.isCompleted && this.isTrigger && this.questUI.isHover){
      ctx.fillStyle = 'black';
      ctx.font = 'bold 22px freeScript ';
      ctx.fillText('Ant: ' + this.antKilledCounter + ' / 10' ,1080, 278);
      ctx.fillText('Spider: ' + this.spiderKilledCounter + ' / 3' ,1080, 306);
  }
};

Quest4.prototype.setTriggeringCondition = function(){
    if(this.player.level >= 6 && this.questUI.quest3.isCompleted){
        this.isTrigger = true;
    }
};

Quest4.prototype.processingQuest = function(){
    var monsterArr = this.map.monsterArr;
    if(this.isTrigger){
      for(var i = 0; i < monsterArr.length; i++){
        if(monsterArr[i].name === 'ant' && monsterArr[i].isDead){
          if(monsterArr[i].reviveTimeCounter > 0 && monsterArr[i].reviveTimeCounter < 2){
            this.antKilledCounter++;
          }
        }
        else if(monsterArr[i].name === 'spider' && monsterArr[i].isDead){
          if(monsterArr[i].reviveTimeCounter > 0 && monsterArr[i].reviveTimeCounter < 2){
            this.spiderKilledCounter++;
          }
        }
      }
    }
};

Quest4.prototype.checkCompleted = function(){
    if(this.antKilledCounter >= 10 && this.spiderKilledCounter >= 3){// >= 10
      this.isCompleted = true;
    }
}

Quest4.prototype.getReward = function(){
    var propertyArr = this.player.bag.propertyArr;
    var hpPotion = {
       type: 4,
       number: 5
    };
    var mpPotion = {
      type: 5,
      number: 5
    };
    var zircon = {
      type: 11,
      number: 3
    };
    var itemArr = [];
    itemArr.push(hpPotion);
    itemArr.push(mpPotion);
    itemArr.push(zircon);

    if(this.isCompleted && this.canReceiveReward){
      this.player.exp += 600;
      this.player.money += 60;
      for(var i = 0; i < itemArr.length; i++){
        if(!this.player.bag.isPropertyExist(itemArr[i])){
            this.player.bag.propertyArr.push(itemArr[i]);
        }
        else{
           this.player.bag.addProperty(itemArr[i]);
        }
      }
      this.canReceiveReward = false;
    }
};
Quest4.prototype.takeAwayProperties = function(){

};