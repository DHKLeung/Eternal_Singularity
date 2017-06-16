var Defender = function(map, player){
    Monster.call(this, 200000, 100, 131072, player, map);//Call the parent's constructor(hp,atk,exp,player)
    this.load = function(){
      this.url = define.imagePathMonster + "boss4.png";
      this.pic = new Framework.AnimationSprite({url:this.url, col:3, row:4, loop: true, speed: 1});
      this.pic.scale = 0.8;
      this.counter = 0;
      this.name = 'defender';
    }

    this.draw = function(ctx){
      var picPos = this.pic.position;
      var screenPos = this.map.screenPosition;
      var playerPos = this.player.playerPic.position;

      if(this.map.mapType === 'scroll'){
        ctx.fillStyle = 'rgba(118, 116, 122, 0.69)';
        if(!this.isDead){
            ctx.fillRect(picPos.x-screenPos.x-90, picPos.y-screenPos.y-50, 180, 10);
        }
        ctx.fillStyle = 'rgb(35, 96, 10)';
        ctx.fillRect(picPos.x-screenPos.x-90, picPos.y-screenPos.y-50, 180*(this.currentHP/this.hp), 10);
      }
      else{
        ctx.fillStyle = 'rgba(118, 116, 122, 0.69)';
        if(!this.isDead){
            ctx.fillRect(picPos.x-90, picPos.y-50, 180, 10);
        }
        ctx.fillStyle = 'rgb(35, 96, 10)';
        ctx.fillRect(picPos.x-90, picPos.y-50, 180*(this.currentHP/this.hp), 10);
      }
    }

    this.update = function(){
      this.pic.update();
      this.checkMonsterDead();
      this.counter++;
      if(this.counter % 120 === 0){
        this.pic.start({from:0, to:2, loop:false});
      }
    }

    this.setPosition = function(pos){
      this.pic.position = {
        x: pos.x * 32 + 16,
        y: pos.y * 32 + 16
      };
    }
}
Defender.prototype = Object.create(Monster.prototype);
Defender.prototype.constructor = Monster;