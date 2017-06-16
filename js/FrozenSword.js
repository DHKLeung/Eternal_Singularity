var FrozenSword = function(map){
     Skill.call(this, 2, 15, 0, 6, 3, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.load = function(){
       this.url = define.imagePathEffect + 'Warrior/005.png';
       this.url2 = define.imagePathEffect + '001.png';
       this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:3, loop:true, speed:5});
       this.effectPic = new Framework.AnimationSprite({url:this.url2, col:5, row:4, loop:true, speed:8});
       this.picArr = [];
       for(var i = 0; i < 150; i++){
         this.picArr.push(this.pic);
       }
     }

     this.init = function(){
       this.abilityList = [0, 6, 6.5, 7, 7.5, 8];
       this.mpCostList = [0, 60, 80, 100, 120, 140];
       this.pic.scale = 1.2;

       this.pic.position = {
          x: -500,
          y: -500
       }
       this.effectPic.position = {
          x: -500,
          y: -500
       }
     }

     this.draw = function(){
       var monsterArr = this.map.monsterArr;

       if(this.player.frozenSword.isDrawed){
         for(var i = 0; i < monsterArr.length; i++){
           if(!this.map.monsterArr[i].isDead){
             this.picArr[i].position = {
               x: monsterArr[i].pic.position.x,
               y: monsterArr[i].pic.position.y
             }
             if(this.map.mapType === 'scroll'){
               this.map.drawOtherObj(this.picArr[i]);
             }
             else{
               this.picArr[i].draw();
             }
           }
         }

         this.effectPic.position = this.player.playerPic.position;
         if(this.map.mapType === 'scroll'){
           this.map.drawOtherObj(this.effectPic);
         }
         else{
           this.effectPic.draw();
         }
       }
     }
}

FrozenSword.prototype = Object.create(Skill.prototype);
FrozenSword.prototype.constructor = Skill;

FrozenSword.prototype.levelUp = function(){
    this.level = 5;
};

FrozenSword.prototype.canHitMonster = function(direction,i){
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;
    var dirDifference = {
      x: playerPos.x - monsterArr[i].pic.position.x,
      y: playerPos.y - monsterArr[i].pic.position.y
    };

    switch (direction) {
      case 0:
        if(Math.abs(dirDifference.x) <= 96 && dirDifference.y <= 96 && dirDifference.y >= 0){
            return true;
        }
        return false;
      case 1:
        if(dirDifference.x <= 96 && dirDifference.x >= 0 && Math.abs(dirDifference.y) <= 96){
             return true;
           }
        return false;
      case 2:
        if(Math.abs(dirDifference.x) <= 96 && dirDifference.y >= -96 && dirDifference.y <= 0){
             return true;
           }
        return false;
      case 3:
        if(dirDifference.x >= -96 && dirDifference.x <= 0 && Math.abs(dirDifference.y) <= 96){
             return true;
           }
        return false;
    }
};

FrozenSword.prototype.attack = function(){
    var monsterArr = this.map.monsterArr;

    this.pic.start({from:0, to:13, loop:false});
    this.effectPic.start({from:0, to:16, loop:false});

    for(var i = 0; i < monsterArr.length; i++){//Determine if player hits the monster
      if(monsterArr[i].canBeAttacked){
           if(monsterArr[i].currentHP >= this.damage){
             monsterArr[i].currentHP -= this.damage;
           }
           else{
             monsterArr[i].currentHP = 0;
           }
      }
    }
};