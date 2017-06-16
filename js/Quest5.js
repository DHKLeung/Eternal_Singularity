var Quest5 = function(map, player, questUI){
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

Quest5.prototype = Object.create(QuestInterface.prototype);
Quest5.prototype.constructor = QuestInterface;

Quest5.prototype.load = function(){
    this.title = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest5/title.png');
    this.titleHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest5/title_hover.png');
    this.content = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest5/content.png');
    this.rewardInfo = new Framework.Sprite(define.imagePathCharacter + 'Quest/Quest5/rewardInfo.png');
}

Quest5.prototype.init = function(){
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

Quest5.prototype.drawInfo = function(ctx){
  if(!this.isCompleted && this.isTrigger && this.questUI.isHover){
      ctx.fillStyle = 'black';
      ctx.font = 'bold freeScript ';
      ctx.fillText('Spider: ' + this.monsterKilledCounter + ' / 5' ,1080, 278);
  }
};

Quest5.prototype.setTriggeringCondition = function(){
    if(this.player.level >= 8 && this.questUI.quest4.isCompleted){
        this.isTrigger = true;
    }
};

Quest5.prototype.processingQuest = function(){
    var monsterArr = this.map.monsterArr;
    if(this.isTrigger){
      for(var i = 0; i < monsterArr.length; i++){
        if(monsterArr[i].name === 'spider' && monsterArr[i].isDead){
          if(monsterArr[i].reviveTimeCounter > 0 && monsterArr[i].reviveTimeCounter < 2){
            this.monsterKilledCounter++;
            console.log(this.monsterKilledCounter);
          }
        }
      }
    }
};

Quest5.prototype.checkCompleted = function(){
    var bag = this.player.bag;
    var propertyArr = this.player.bag.propertyArr;
    var conditionCount = 0;

    for(var i = 0; i < propertyArr.length; i++){
      if(propertyArr[i].type === 10 || propertyArr[i].type === 11){
        if(propertyArr[i].number >= 5){
          conditionCount++;
        }
      }
    }

    if(bag.isPropertyExist({type:30,number:1})){
      conditionCount++;
    }

    if(this.monsterKilledCounter >= 5 && conditionCount === 3){//>= 3 && === 3
      this.isCompleted = true;
    }
};

Quest5.prototype.getReward = function(){
    var propertyArr = this.player.bag.propertyArr;
    var hpPotion = {
       type: 4,
       number: 20
    };
    var mpPotion = {
      type: 5,
      number: 20
    };

    var itemArr = [];
    itemArr.push(hpPotion);
    itemArr.push(mpPotion);

    if(this.isCompleted && this.canReceiveReward){
      this.player.exp += 1300;
      this.player.money += 100;
      for(var i = 0; i < itemArr.length; i++){
        if(!this.player.bag.isPropertyExist(itemArr[i])){
            this.player.bag.propertyArr.push(itemArr[i]);
        }
        else{
           this.player.bag.addProperty(itemArr[i]);
        }
      }
      this.canReceiveReward = false;
      this.takeAwayProperties(propertyArr);
    }
}

Quest5.prototype.takeAwayProperties = function(propertyArr){
    for(var i = 0; i < propertyArr.length; i++){
        if(propertyArr[i].type === 10 || propertyArr[i].type === 11){
          this.player.bag.propertyArr[i].number -= 5;
        }
        if(propertyArr[i].type === 30){
          this.player.bag.propertyArr[i].number--;
        }
    }
};