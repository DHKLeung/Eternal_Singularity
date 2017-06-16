var Thunder = function(map,monster){
    Skill.call(this, 10, 1, 0, 0, 5, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
    this.monster = monster;
    this.load = function(){
      this.url = define.imagePathEffect + '008.png';
      this.url2 = define.imagePathEffect + 'fire_001.png';
      this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:3, loop:true, speed:5});
      this.effectPic = new Framework.AnimationSprite({url:this.url2, col:5, row:4, loop:true, speed:5});
      this.effectPic.scale = 0.65;
      this.pic.position = {
        x: -20,
        y: -20
      };
      this.effectPic.position = {
        x: -500,
        y: -500
      }
      this.drawEff = false;
    }

    this.draw = function(){
      if(this.isDrawed){
        this.map.drawOtherObj(this.pic);
        this.effectPic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y - 10
        }
        if(this.drawEff){
          this.map.drawOtherObj(this.effectPic);
        }
      }
    }
}

Thunder.prototype = Object.create(Skill.prototype);
Thunder.prototype.constructor = Skill;

Thunder.prototype.canHitMonster = function(i){
      var playerPos = this.player.playerPic.position;
      var dirDifference = {
        x: playerPos.x - this.pic.position.x,
        y: playerPos.y - this.pic.position.y
      };

      if(Math.abs(dirDifference.x) < 33 && Math.abs(dirDifference.y) < 33){
          return true;
      }
      return false;
};

Thunder.prototype.attack = function(){
    var playerPos = this.player.playerPic.position;
    var row = Math.floor(Math.random() * 22), col = Math.floor(Math.random() * 43);

    this.pic.position = {
      x: col * 32,
      y: row * 32
    };

    this.pic.start({from:0, to:12, loop:false});
    if(this.canHitMonster(i)){
      this.effectPic.start({from:0, to:18, loop:false})
      if(this.player.currentHP > Math.floor(this.player.healthPoint * 0.8)){
        this.player.currentHP -= Math.floor(this.player.healthPoint * 0.8);
      }
      else{
        this.player.currentHP = 0;
      }
      this.player.isAttacked = true;
      this.drawEff = true;
    }
};