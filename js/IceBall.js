var IceBall = function(){
    this.load = function(){
      this.url = define.imagePathEffect + 'snowball2.png';
      this.pic = new Framework.Sprite(this.url);
    }

    this.init = function(){
      this.windowSize = {
        width: Framework.Game.getCanvasWidth(),
        height: Framework.Game.getCanvasHeight()
      };
      this.pic.position = {
        x: this.randomNumber(100, this.windowSize.width),
        y: this.randomNumber(-10, -300)
      };
      this.velocity = this.randomNumber(4, 8);
      this.hit = this.randomNumber(this.windowSize.height * 0.8, this.windowSize.height * 0.9);
    }

    this.draw = function(){
      this.pic.draw();
    }

    this.update = function(){

      if(this.pic.position.y < this.hit){
        this.pic.position.x -= this.velocity / 30;
        this.pic.position.y += this.velocity / 10;
      }
      else {
        this.init();
      }
    }

    this.randomNumber = function(min, max){
      return Math.random() * (max - min) + min;
    }
}