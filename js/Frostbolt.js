var Frostbolt = function(map,monster){
     Skill.call(this, 1000, 5, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
     this.monster = monster;
     this.load = function(){
       this.url1 = define.imagePathEffect + '015.png';
       this.url2 = define.imagePathEffect + 'water_002.png';
       this.picArr = [];
       for(var i = 0; i < 10; i++){
         this.pic = new Framework.AnimationSprite({url:this.url1, col:5, row:3, loop:true, speed:3});
         this.pic.scale = 1;
         this.pic.position = {
           x: -100,
           y: -500
         }
         this.picArr.push(this.pic);
       }
       this.effectPic = new Framework.AnimationSprite({url:this.url2, col:5, row:2, loop:true, speed:3});
       this.counter = 0;
       this.isAttack = true;
     }
}
Frostbolt.prototype = Object.create(Skill.prototype);
Frostbolt.prototype.constructor = Skill;

Frostbolt.prototype.update = function(){
    var playerPos = this.player.playerPic.position;
    var monsterArr = this.map.monsterArr;
    for(var i = 0; i < this.picArr.length; i++){
      this.picArr[i].update();
    }
    this.effectPic.update();

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

Frostbolt.prototype.canHitMonster = function(i){
      var playerPos = this.player.playerPic.position;
      var dirDifference = {
        x: playerPos.x - this.picArr[i].position.x,
        y: playerPos.y - this.picArr[i].position.y
      };

      if(Math.abs(dirDifference.x) < 100 && Math.abs(dirDifference.y) < 100){
          return true;
      }
      return false;
};

Frostbolt.prototype.attack = function(){
    var playerPos = this.player.playerPic.position;
    var screenRow = Math.floor(this.map.screenPosition.y/32), screenCol = Math.floor(this.map.screenPosition.x/32);

    for(var i = 0; i < this.picArr.length; i++){
      if(this.map.mapType === 'scroll'){
        while(true){
          var row = Math.floor(Math.random() * 37), col = Math.floor(Math.random() * 85);
          if(row >= screenRow + 1 && row <= screenRow + 21 && col >= screenCol+1 && col <= screenCol + 42){
              break;
          }
        }
      }
      else{
          var row = Math.floor(Math.random() * 22), col = Math.floor(Math.random() * 43);
      }

      this.picArr[i].position = {
        x: col * 32 + 64,
        y: row * 32 - 64
      };

      this.picArr[i].start({from:0, to:14, loop:false});

      if(this.canHitMonster(i)){
        this.effectPic.position = {
          x: playerPos.x,
          y: playerPos.y-30
        };
        this.effectPic.start({from:0, to:9, loop:false});
        if(this.player.currentHP <= this.damage){
            this.player.currentHP = 0;
        }
        else{
            this.player.currentHP -= Math.floor(this.damage * (1-this.player.def));
        }
        this.player.isAttacked = true;
      }
    }
}