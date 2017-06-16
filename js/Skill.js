var Skill = function(damage, coolDownTime, hpCost, mpCost, mmH, map){
    this.damage = damage;
    this.abilityList = [];
    this.mpCostList = [];
    this.hpCostList = [];
    this.coolDownTime = coolDownTime;
    this.hpCost = hpCost;
    this.mpCost = mpCost;
    this.maxMonsterHit = mmH;
    this.canAttack = true;
    this.map = map;
    this.player = map.player;
    this.level = 0;
    this.monsterNumber = 0;
    this.coolDownCounter = this.coolDownTime * 100;
    this.isAttack = false;
    this.isDrawed = false;
}

Skill.prototype.update = function(){
    var i = this.monsterNumber;
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;
    this.pic.update();
    this.changeDamage();
    this.changeMpCost();
    this.levelUp();

    if(this.isAttack && this.coolDownCounter > 0){
      this.coolDownCounter--;
    }

    if(this.coolDownCounter < this.coolDownTime * 100){
      this.canAttack = false;
    }
    if(this.coolDownCounter === 0){
      this.isAttack = false;
      this.canAttack = true;
      this.coolDownCounter = this.coolDownTime * 100;
    }
};

Skill.prototype.changeDamage = function(){
    this.damage = Math.round(this.player.atk * this.abilityList[this.level]);
};

Skill.prototype.changeMpCost = function(){
    this.mpCost = this.mpCostList[this.level];
};

Skill.prototype.changeHpCost = function(){
    this.hpCost = this.hpCostList[this.level];
};

Skill.prototype.levelUp = function(){

};

Skill.prototype.move = function(){

};

Skill.prototype.attack = function(){

};

Skill.prototype.removeObstacle = function(){

};

Skill.prototype.canHitMonster = function(){

};

Skill.prototype.recover = function(){

};

Skill.prototype.buff = function(){

};