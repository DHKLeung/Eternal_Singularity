var QuestInterface = function(map, player, questUI){
  this.map = map;
  this.player = player;
  this.questUI = questUI;
  this.isReceived = false;
  this.isTrigger = false;
  this.isCompleted = false;
  this.isHover = false;
  this.isSubmitBtnHover = false;
  this.canReceiveReward = true;
  this.alertCounter = 0;

  this.submitBtn = new Framework.Sprite(define.imagePathCharacter + 'Quest/SubmitBtn.png');
  this.submitBtnHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/SubmitBtnHover.png');
  this.alert = new Framework.Sprite(define.imagePathCharacter + 'Quest/alert.png');

  this.submitBtn.scale = 0.35;
  this.submitBtnHover.scale = this.submitBtn.scale;
  this.alert.scale = 0.5;

  this.submitBtn.position ={
    x: 210,
    y: 374
  };
  this.submitBtnHover.position = this.submitBtn.position;
  this.alert.position = {
    x: 1143,
    y: 630
  };

  this.load();
  this.init();
}

QuestInterface.prototype.init = function(){

};

QuestInterface.prototype.drawInfo = function(){

};

QuestInterface.prototype.setTriggeringCondition = function(){

};

QuestInterface.prototype.processingQuest = function(){

};

QuestInterface.prototype.checkCompleted = function(){

};

QuestInterface.prototype.getReward = function(){

};

QuestInterface.prototype.takeAwayProperties = function(){

};