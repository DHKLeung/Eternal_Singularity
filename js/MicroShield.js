var MicroShield = function(map){
    this.map = map;
    this.player = map.player;
    this.abilityList = [0, 0.05, 0.1, 0.15, 0.2, 0.25];
    this.level = 0;
}

MicroShield.prototype = Object.create(Skill.prototype);
MicroShield.prototype.constructor = Skill;

MicroShield.prototype.update = function(){
    this.levelUp();
    this.buff();
};

MicroShield.prototype.levelUp = function(){
    for(var level = 8; level <= 12; level++){
      if(this.player.level === level){
        this.level = level - 7;
      }
    }
    if(this.player.level > 13){
      this.level = 5;
    }
};

MicroShield.prototype.buff = function(){
    if(this.player.level >= 8){
      this.player.def = this.abilityList[this.level];
    }
}