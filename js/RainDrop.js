var RainDrop = function(){
    this.clearColor = 'rgba(0, 0, 0, 0.1)';
    this.init = function(){
      this.windowSize = {
        width: Framework.Game.getCanvasWidth(),
        height: Framework.Game.getCanvasHeight()
      };
      this.position = {
        x: this.randomNumber(0, this.windowSize.width),
        y: this.randomNumber(-10, -300)
      };
      this.color = 'rgba(162, 221, 221, 0.36)';
      this.velocity = this.randomNumber(4, 8);
      this.hit = this.randomNumber(this.windowSize.height * 0.1, this.windowSize.height * 0.9);
      this.size = 2;
      this.circleWidth = 2.5;
      this.circleHeight = 1;
      this.a = 1;
      this.va = 0.96;
      this.vw = 3;
      this.vh = 1;
    }

    this.randomNumber = function(min, max){
      return Math.random() * (max - min) + min;
    }

    this.draw = function(ctx){
      if(this.position.y < this.hit){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size * 15);
      }
      else{
        ctx.beginPath();
  			ctx.moveTo(this.position.x, this.position.y - this.circleHeight / 2);

  		  ctx.bezierCurveTo(
  			  this.position.x + this.circleWidth / 2, this.position.y - this.circleHeight / 2,
  				this.position.x + this.circleWidth / 2, this.position.y + this.circleHeight / 2,
  				this.position.x, this.position.y + this.circleHeight / 2);

  			ctx.bezierCurveTo(
  				this.position.x - this.circleWidth / 2, this.position.y + this.circleHeight / 2,
  				this.position.x - this.circleWidth / 2, this.position.y - this.circleHeight / 2,
  				this.position.x, this.position.y - this.circleHeight / 2);

  			ctx.strokeStyle = 'rgba(162, 221, 221, '+this.a+')';
  			ctx.stroke();
  			ctx.closePath();
      }
      this.changeRainPosition();
    }

    this.changeRainPosition = function(){
      if(this.position.y < this.hit){
        this.position.x -= 1;
        this.position.y += this.velocity;
      }
      else{
        if(this.a > 0.03){
          this.circleWidth += this.vw;
          this.circleHeight += this.vh;
          if(this.circleWidth > 10){
            this.a *= this.va;
            this.vw *= 0.98;
            this.vh *= 0.98;
          }
        }
        else{
          this.init();
        }
      }
    }
}