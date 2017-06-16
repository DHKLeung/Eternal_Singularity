var WarriorData = function(){
    PlayerData.call(this);
}
WarriorData.prototype = Object.create(PlayerData.prototype);
WarriorData.prototype.constructor = PlayerData;

WarriorData.prototype.createHpTable = function(){
    this.hpTable.push(100);
    for(var level = 2; level <= 100; level++){
      var previousHp = this.hpTable[level-2];
      var currentHp = 0;
      if(level < 51){
        currentHp = Math.round(previousHp * 1.1);
      }
      else{
        currentHp = Math.round(previousHp * 1.03);
      }
      this.hpTable.push(currentHp);
    }
};

WarriorData.prototype.createMpTable = function(){
  this.mpTable.push(100);
  for(var level = 2; level <= 100; level++){
    var previousMp = this.mpTable[level-2];
    var currentMp = Math.round(previousMp * 1.05);
    this.mpTable.push(currentMp);
  }
};

WarriorData.prototype.createApTable = function(){
  this.apTable.push(1000);
  for(var level = 2; level <= 100; level++){
    var currentAp = this.apTable[level-2] + 50;
    this.apTable.push(currentAp);
  }
};

WarriorData.prototype.createAtkTable = function(){
  for(var level = 1; level <= 50; level++){
    var currentAtk = level;
    if(level >= 6){
      currentAtk = Math.round(this.atkTable[level-2] * 1.1);
    }
    this.atkTable.push(currentAtk);
  }
}