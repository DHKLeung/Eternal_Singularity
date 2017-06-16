var TestMap = function() {
    BaseMap.call(this,'normal');
    this.screenPosition = {//on the map
        x: 0,
        y: 0
    };

    this.testMapArr = this.arrays.testMapArray;
    this.propertyArr = [];
    this.rainArr = [];

    this.player = new Player(this);
    this.player.load();
    this.player.init();
    this.player.setPosition({x: 21, y: 10},this.screenPosition);

    this.alpha = 1;

    this.monsterAmount = 10;
    this.counter = 0;

    this.load = function() {
        this.linkBtn = new Framework.Sprite(define.imagePath + "linkBtn.png");
        this.linkBtn_hover = new Framework.Sprite(define.imagePath + "linkBtn_hover.png");
        this.info = new Framework.Sprite(define.imagePathMap + "UI1-1.png");
        this.grassPic = new Framework.Sprite(define.imagePathMap + "grass.png");
        this.treePic = new Framework.Sprite(define.imagePathMap + "tree.png");
        this.stonePic = new Framework.Sprite(define.imagePathMap + "stone2.png");
        this.floorPic = new Framework.Sprite(define.imagePathMap + "bg.png");
        this.flowerPic = new Framework.Sprite(define.imagePathMap + "flower2.png");
        this.cloudPic = new Framework.Sprite(define.imagePathMap + "sky.png");
        this.treeCut = new Framework.Sprite(define.imagePathMap + "tree_cut.png");

        this.cluster = new Cluster(this);
        this.cluster.load();
        this.medicine = new Medicine(this);
        this.medicine.load();

        for(var i = 0; i < 200; i++){
          this.rainDrop = new RainDrop();
          this.rainDrop.init();
          this.rainArr.push(this.rainDrop);
        }

    };

    this.initialize = function() {
        this.player.setPlayerLevel(99);
        this.player.init();
        this.player.currentMap = 5;

        this.floorPic.position = this.screenPosition;
        this.linkBtn.position = {
            x: 1280,
            y: 50
        };
        this.linkBtn_hover.position = this.linkBtn.position;

        this.floorPic.scale = 1;
        this.linkBtn.scale = 0.35;
        this.linkBtn_hover.scale = 0.35;
        this.isLinkBtnHoveer = false;
        this.littleRain = 30;
        this.heavyRain = 180;

        this.info.position = {x:700, y:785};
        this.generateProperties();
        this.drawEff = true;
        this.isHeavyRain = false;
        this.isWin = false;
    };

    this.update = function() {
        this.player.update();
        this.checkChangeMap();
        this.counter++;

        if(this.player.isChangeMap){
          this.monsterArr.splice(0, this.monsterArr.length);
          console.log(this.monsterArr);
        }
        for(var i = 0; i < this.monsterArr.length; i++){
          this.monsterArr[i].update();
        }
    };

    this.draw = function(ctx) {
          ctx.fillStyle = 'black';
          ctx.fillRect(0,0,1360,700);
          for (var i = 0; i < 22; i++) {
              for (var j = 0; j < 43; j++) {
                    var picPosition = {
                        x: 32 * j  + 16,
                        y: 32 * i  + 16
                    }
                    switch(this.testMapArr[i][j]) {
                        case 0 :
                            break;
                        case 1 :
                            this.grassPic.position = picPosition;
                            this.grassPic.draw();
                            break;
                        case 6 :
                            this.flowerPic.position = picPosition;
                            this.flowerPic.draw();
                            break;
                        case 7 :
                            this.treePic.position = picPosition;
                            this.treePic.draw();
                            break;
                        case 8 :
                            this.stonePic.position = picPosition;
                            this.stonePic.draw();
                            break;
                        case 9 :
                            this.cloudPic.position = picPosition;
                            this.cloudPic.draw();
                            break;
                    }
              }
          }
          if(this.counter > 120){
            this.generateRain(ctx);
          }

          this.player.playerPic.draw();
          for(var i = 0; i < this.monsterArr.length; i++){
            if(this.monsterArr[i].currentHP > 0){
              this.monsterArr[i].pic.draw();
            }
            this.monsterArr[i].draw(ctx);
          }
          this.info.draw();
          this.player.draw(ctx);
          if(!this.isLinkBtnHoveer){
              this.linkBtn.draw();
          }
          else {
              this.linkBtn_hover.draw();
          }

          if(this.drawEff){
            this.alpha -= 0.002;
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1360, 700);
          }

          if(this.isWin){
            this.heavyRain--;
            if(this.alpha < 0.8){
              this.alpha += 0.003;
              ctx.globalAlpha = this.alpha;
            }
            else{
              this.disPlayChar = true;
            }
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1360, 700);
          }

          if(this.alpha <= 0){
            this.drawEff = false;
          }
    };

    this.generateRain = function(ctx){
        var width = this.rainDrop.windowSize.width
        var height = this.rainDrop.windowSize.height;

        ctx.fillStyle = this.rainDrop.clearColor;
        ctx.fillRect(0, 0, width, height);
        if(!this.isHeavyRain){
          for(var i = 0; i < this.littleRain; i++){
            this.rainArr[i].draw(ctx);
          }
        }
        else{
          for(var i = 0; i < this.heavyRain; i++){
            this.rainArr[i].draw(ctx);
          }
        }
    };


    this.mousemove = function(e){
        if(e.x >= 1250 && e.x <= 1300 && e.y >= 26 && e.y <= 69){
            this.isLinkBtnHoveer = true;
        }
        else{
            this.isLinkBtnHoveer = false;
        }
    };

    this.click = function(e){
        if(e.x >= 1250 && e.x <= 1300 && e.y >= 26 && e.y <= 69){
            window.open("Game_Info/MainPage/index.html");
        }
    };
}

TestMap.prototype = Object.create(BaseMap.prototype);
TestMap.prototype.constructor = BaseMap;


TestMap.prototype.canMove = function(i, j, direction) {
    this.toArrayIndex(i, j, direction);

    if(i < 16 || i > 1336){ return false; }
    if(j < 16 || j > 686){ return false; }
    if (this.testMapArr[this.arrRow][this.arrCol] > 1) {
        return false;
    }
    else {
        return true;
    }
};

TestMap.prototype.generateMonsters = function(){
    for(var i = 0; i < 5; i++){
      while(true){
        var row = Math.floor(Math.random() * 22), col = Math.floor(Math.random() * 43);
        if(this.testMapArr[row][col] < 2){
          break;
        }
      }
      this.devil = new Devil(this, this.player);
      this.devil.load();
      this.devil.setPosition({x: col, y: row});

      this.boss = new Boss(this, this.player);
      this.boss.load();
      this.boss.setPosition({x: 21, y: 10});
      this.boss.init();

      this.defender = new Defender(this, this.player);
      this.defender.load();
    }
};