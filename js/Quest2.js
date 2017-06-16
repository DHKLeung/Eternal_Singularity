var Quest2 = function(map, player, questUI){
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

Quest2.prototype = Object.create(QuestInterface.prototype);
Quest2.prototype.constructor = QuestInterface;

Quest2.prototype.load = function(){
    this.title = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest2/title.png');
    this.titleHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest2/title_hover.png');
    this.content = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest2/content.png');
    this.rewardInfo = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest2/rewardInfo.png');
}

Quest2.prototype.init = function(){
    this.title.scale = 0.45;
    this.titleHover.scale = this.title.scale;
    this.content.scale = 0.05;
    this.submitBtn.scale = 0.35;
    this.rewardInfo.scale = 0.38;

    this.rewardInfo.position = {
      x: 630,
      y: 320
    };

    this.monsterKilledCounter = 0;
};

Quest2.prototype.drawInfo = function(ctx){
  if(!this.isCompleted && this.isTrigger && this.questUI.isHover){
      ctx.fillStyle = 'black';
      ctx.font = 'bold 22px freeScript ';
      ctx.fillText('Dragonfly: ' + this.monsterKilledCounter + ' / 10' ,1080, 278);
  }
};

Quest2.prototype.setTriggeringCondition = function(){
    if(this.player.level >= 2 && this.questUI.quest1.isCompleted){
        this.isTrigger = true;
    }
};

Quest2.prototype.processingQuest = function(){
    var monsterArr = this.map.monsterArr;
    if(this.isTrigger){
      for(var i = 0; i < monsterArr.length; i++){
        if(monsterArr[i].name === 'dragonfly' && monsterArr[i].isDead){
          if(monsterArr[i].reviveTimeCounter > 0 && monsterArr[i].reviveTimeCounter < 2){
            this.monsterKilledCounter++;
          }
        }
      }
    }
};

Quest2.prototype.checkCompleted = function(){
    if(this.monsterKilledCounter >= 10){// >= 10
      this.isCompleted = true;
    }
}

Quest2.prototype.getReward = function(){
    var propertyArr = this.player.bag.propertyArr;
    var propObj = {
       type: 4,
       number: 5
    };

    if(this.isCompleted && this.canReceiveReward){
      this.player.exp += 30;
      this.player.money += 10;
      if(!this.player.bag.isPropertyExist(propObj)){
          this.player.bag.propertyArr.push(propObj);
      }
      else{
         this.player.bag.addProperty(propObj);
      }
      this.canReceiveReward = false;
    }
};

Quest2.prototype.takeAwayProperties = function(){

};