var Quest3 = function(map, player, questUI){
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
      this.closeContentPos = {
        x: this.content.position.x + 159,
        y: this.content.position.y - 105
      };
    }
}

Quest3.prototype = Object.create(QuestInterface.prototype);
Quest3.prototype.constructor = QuestInterface;

Quest3.prototype.load = function(){
    this.title = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest3/title.png');
    this.titleHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest3/title_hover.png');
    this.content = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest3/content.png');
    this.rewardInfo = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest3/rewardInfo.png');
}

Quest3.prototype.init = function(){
    this.title.scale = 0.45;
    this.titleHover.scale = this.title.scale;
    this.content.scale = 0.05;//to 0.37
    this.submitBtn.scale = 0.35;
    this.rewardInfo.scale = 0.38;

    this.content.position = {//width = 420
      x: 230,
      y: 304
    };

    this.submitBtn.position ={
      x: this.content.position.x - 20,
      y: this.content.position.y + 70
    };

    this.rewardInfo.position = {
      x: 630,
      y: 320
    };

    this.monsterKilledCounter = 0;
};

Quest3.prototype.drawInfo = function(ctx){
  if(!this.isCompleted && this.isTrigger && this.questUI.isHover){
      ctx.fillStyle = 'black';
      ctx.font = 'bold 22px freeScript ';
      ctx.fillText('Ant: ' + this.monsterKilledCounter + ' / 3' ,1080, 278);
  }
};

Quest3.prototype.setTriggeringCondition = function(){
    if(this.player.level >= 4 && this.questUI.quest2.isCompleted){
        this.isTrigger = true;
    }
};

Quest3.prototype.processingQuest = function(){
    var monsterArr = this.map.monsterArr;
    if(this.isTrigger){
      for(var i = 0; i < monsterArr.length; i++){
        if(monsterArr[i].name === 'ant' && monsterArr[i].isDead){
          if(monsterArr[i].reviveTimeCounter > 0 && monsterArr[i].reviveTimeCounter < 2){
            this.monsterKilledCounter++;
            console.log(this.monsterKilledCounter);
          }
        }
      }
    }
};

Quest3.prototype.checkCompleted = function(){
    var propertyArr = this.player.bag.propertyArr;
    var conditionCount = 0;

    for(var i = 0; i < propertyArr.length; i++){
      if(propertyArr[i].type === 1 || propertyArr[i].type === 2 || propertyArr[i].type === 3){
        if(propertyArr[i].number >= 3){
          conditionCount++;
        }
      }
    }
    if(this.monsterKilledCounter >= 3 && conditionCount === 3){//>= 3 && === 3
      this.isCompleted = true;
    }
}

Quest3.prototype.getReward = function(){
    var propertyArr = this.player.bag.propertyArr;
    var propObj = {
       type: 5,
       number: 5
    };
    var questItem = {
       type: 30,
       number: 1
    };

    if(this.isCompleted && this.canReceiveReward){
      this.player.exp += 200;
      this.player.money += 30;
      this.player.bag.propertyArr.push(questItem);
      if(!this.player.bag.isPropertyExist(propObj)){
          this.player.bag.propertyArr.push(propObj);
      }
      else{
         this.player.bag.addProperty(propObj);
      }

      this.canReceiveReward = false;
      this.takeAwayProperties(propertyArr);
    }
}

Quest3.prototype.takeAwayProperties = function(propertyArr){
    for(var i = 0; i < propertyArr.length; i++){
        if(propertyArr[i].type === 1 || propertyArr[i].type === 2 || propertyArr[i].type === 3){
          this.player.bag.propertyArr[i].number-=3;
        }
    }
};