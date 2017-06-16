var Teleport = function(map){
    Skill.call(this, 0, 0.5, 0, 0, 0, map);//ctor(damage, coolDownTime, hpCost, mpCost, maxMonsterHit)
    this.load = function(){
        this.url = define.imagePathEffect + '006.png';
        this.pic = new Framework.AnimationSprite({url:this.url, col:5, row:5, loop:true, speed:12});
    }

    this.draw = function(){
      if(this.isDrawed){
        this.isUsingSkill = true;
        this.pic.position = {
          x: this.player.playerPic.position.x,
          y: this.player.playerPic.position.y
        };
        this.map.drawOtherObj(this.pic);
      }
    }
}

Teleport.prototype = Object.create(Skill.prototype);
Teleport.prototype.constructor = Skill;

Teleport.prototype.changeDamage = function(){

};

Teleport.prototype.changeMpCost = function(){

};

Teleport.prototype.levelUp = function(){

};

Teleport.prototype.move = function(walkDir){
    this.player.playerPic.position.x += walkDir.x * 32;
    this.player.playerPic.position.y += walkDir.y * 32;
    this.pic.start({from:0, to:24, loop:false});
}