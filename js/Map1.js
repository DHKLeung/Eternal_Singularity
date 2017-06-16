var Map1 = function() {
    BaseMap.call(this,'scroll');
    this.screenPosition = {//on the map
        x: 600,
        y: 323
    };//x: 600, y: 323

    this.player = new Player(this);
    this.player.load();
    this.player.init();
    this.player.setPosition({x: 38, y: 18},this.screenPosition);//x: 38, y: 18

    this.alpha = 1;
    this.alpha2 = 1;

    this.propertyAmount = 70;
    this.monsterAmount = 50;

    this.map2 = new Map2(this);
    this.map3 = new Map3(this);
    this.map4 = new Map4(this);
    this.map5 = new Map5(this);
  
    this.load = function() {
        this.linkBtn = new Framework.Sprite(define.imagePath + "linkBtn.png");
        this.linkBtn_hover = new Framework.Sprite(define.imagePath + "linkBtn_hover.png");
        this.info = new Framework.Sprite(define.imagePathMap + "UI1-1.png");
        this.grassPic = new Framework.Sprite(define.imagePathMap + "grass.png");
        this.treePic = new Framework.Sprite(define.imagePathMap + "tree.png");
        this.stonePic = new Framework.Sprite(define.imagePathMap + "stone2.png");
        this.floorPic = new Framework.Sprite(define.imagePathMap + "bg5.png");
        this.flowerPic = new Framework.Sprite(define.imagePathMap + "flower2.png");
        this.cloudPic = new Framework.Sprite(define.imagePathMap + "sky.png");

        this.cluster = new Cluster(this);
        this.cluster.load();
        this.medicine = new Medicine(this);
        this.medicine.load();
        this.treasureChest = new TreasureChest(this);
        this.treasureChest.load();
        this.blackHole = new BlackHole(this);
        this.blackHole.load();

        this.rainArr = [];
        for(var i = 0; i < 180; i++){
          this.rainDrop = new RainDrop();
          this.rainDrop.init();
          this.rainArr.push(this.rainDrop);
        }
    };

    this.initialize = function() {
        this.player.setPlayerLevel(1);
        this.player.init();
        this.treasureChest.init();

        this.linkBtn.position = {
            x: 1280,
            y: 50
        };
        this.linkBtn_hover.position = this.linkBtn.position;

        this.floorPic.position = {x: 1370, y: 600};
        this.info.position = {x:700, y:785};

        this.floorPic.scale = 1.5;
        this.linkBtn.scale = 0.35;
        this.linkBtn_hover.scale = 0.35;
        this.isLinkBtnHoveer = false;

        this.generateProperties();
        this.isWin = false;
        this.drawEff = true;
        this.disPlayChar = false;
        this.isHeavyRain = false;

        this.littleRain = 30;
        this.heavyRain = 180;
        this.charIndex = 0;
        this.charIndex2 = 0;
        this.letterSpace = 30;
        this.counter = 0;
        this.rainDropCounter = 0;
        this.displayCharCounter = 0;
    };

    this.update = function() {
        this.player.update();
        this.treasureChest.update();
        this.blackHole.update();

        this.moveScreen();
        this.checkChangeMap();

        if(this.player.isChangeMap){
          this.monsterArr.splice(0, this.monsterArr.length);
        }
        for(var i = 0; i < this.monsterArr.length; i++){
          this.monsterArr[i].update();
          if(this.monsterArr[i].isTouchingPlayer){
            this.isDrawDamage = true;
          }
        }

        if(this.player.resistCounter === 270){
          this.isDrawDamage = false;
        }

        if(this.player.currentHP <= 0 && this.player.currentMap === 3){
          this.player.setPosition({x: 1, y: 2},this.screenPosition);
          this.screenPosition = {x:0, y: 0};
          this.player.currentHP = this.player.healthPoint;
          this.player.currentMP = this.player.manaPoint;
        }

        if(this.player.currentMap === 4){
          this.rainDropCounter++;
        }

        if(this.disPlayChar){
          this.displayCharCounter++;
        }

        if(this.displayCharCounter % 15 === 1){
          if(this.isWin && this.charIndex < this.charArr.length){
            this.charIndex++;
          }
          else if(this.charIndex2 < this.charArr2.length){
            this.charIndex2++;
          }
        }
    };

    this.draw = function(ctx) {
        var screenRow = Math.floor(this.screenPosition.y / 32), screenCol = Math.floor(this.screenPosition.x / 32);
        var rowNum = 0, colNum = 0;
        var playerPos = this.player.playerPic.position;
        var screenPos = this.screenPosition;

          this.floorPic.draw();
          if(this.player.currentMap === 4){
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, 1360, 700);
          }
          for (var i = screenRow; i < screenRow+23; i++) {//38
              for (var j = screenCol; j < screenCol+44; j++) {//86
                  if(i >= 0 && i < 38 && j >= 0 && j < 86){
                    var picPosition = {
                        x: 32 * j  - this.screenPosition.x + 16,
                        y: 32 * i  - this.screenPosition.y + 16
                    }
                    switch(this.mapArr[this.player.currentMap][i][j]) {
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
                    if(this.mapArr[this.player.currentMap][i][j] < 2){
                        switch (this.propertyArr[i][j]) {
                          case 1:
                            this.cluster.blue_cluster.position = picPosition;
                            this.cluster.blue_cluster.draw();
                            break;
                          case 2:
                            this.cluster.red_cluster.position = picPosition;
                            this.cluster.red_cluster.draw();
                            break;
                          case 3:
                            this.cluster.green_cluster.position = picPosition;
                            this.cluster.green_cluster.draw();
                            break;
                          case 4:
                            this.medicine.hpPotion.position = picPosition;
                            this.medicine.hpPotion.draw();
                            break;
                          case 5:
                            this.medicine.mpPotoin.position = picPosition;
                            this.medicine.mpPotoin.draw();
                            break;
                          case 10:
                            this.cluster.tourmaline.position = picPosition;
                            this.cluster.tourmaline.draw();
                            break;
                          case 11:
                            this.cluster.zircon.position = picPosition;
                            this.cluster.zircon.draw();
                            break;
                        }
                    }
                  }
              }
          }
          if(this.player.currentMap === 4 && this.rainDropCounter > 360){
            this.generateRain(ctx);
          }

          /*-----------Draw Treasure Chest-------------*/
          if(this.player.currentMap === 3 && this.treasureChest.drawPic){
            if(this.treasureChest.isPicHover){
              this.drawOtherObj(this.treasureChest.picHover);
            }
            else{
              this.drawOtherObj(this.treasureChest.pic);
            }
          }
          this.treasureChest.draw(ctx);
          /*---------------------------------------------*/

          if(this.player.currentMap === 3){
            this.blackHole.draw(ctx);
          }

          if(this.player.currentHP > 0){
            this.drawOtherObj(this.player.playerPic);
          }
          else{
            this.drawOtherObj(this.player.corpsePic);
          }

          for(var i = 0; i < this.monsterArr.length; i++){
            if(this.monsterArr[i].currentHP > 0){
              this.drawOtherObj(this.monsterArr[i].pic);
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

          /*-------Transition scene-------*/
          if(this.drawEff){
            this.alpha -= 0.002;
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 1360, 700);
          }
          if(this.alpha <= 0){
            this.drawEff = false;
          }

          /*-------Player winning scene-------*/
          if(this.isWin && this.player.currentHP > 0){
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

          if(this.displayCharCounter > 0 && this.charIndex <= this.charArr.length && this.isWin){
            ctx.font = 'bold 36px itcblkad ';
            ctx.fillStyle = 'white';
            for(var i = 0; i < this.charIndex; i++){
              ctx.fillText(this.charArr[i], 300 + i*this.letterSpace, 160);
            }
          }

          /*-------Player losing scene-------*/
          if(this.player.currentHP <= 0){
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

          if(this.displayCharCounter > 0 && this.charIndex2 <= this.charArr2.length && this.player.currentHP <= 0){
            ctx.font = 'bold 36px chiller ';
            ctx.fillStyle = 'red';
            for(var i = 0; i < this.charIndex2; i++){
              ctx.fillText(this.charArr2[i], 300 + i*this.letterSpace, 160);
            }
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

Map1.prototype = Object.create(BaseMap.prototype);
Map1.prototype.constructor = BaseMap;

Map1.prototype.generateProperties = function(){
      var propertyType = 0;
      var row, col;
      for(var i = 0; i < this.propertyAmount; i++){
        while(true){
          row = Math.floor(Math.random() * 37);
          col = Math.floor(Math.random() * 85);
          if(this.mapArr[this.player.currentMap][row][col] > 5 &&
             this.mapArr[this.player.currentMap][row][col] < 8){
            break;
          }
        }
        if(i < 20){
          propertyType = 1;
        }
        else if(i < 40){
          propertyType = 2;
        }
        else if(i < 60){
          propertyType = 3;
        }
        else if(i < 65){
          propertyType = 4;
        }
        else if(i < 70){
          propertyType = 5;
        }
        this.propertyArr[row][col] = propertyType;
      }
};

Map1.prototype.moveScreen = function(){
    if(this.player.isWalking && this.player.isScreenMove){
      if(this.player.currentMap === 0){
        if(this.player.playerPic.position.x > 615 && this.player.playerPic.position.x < 2031){
            this.screenPosition.x += this.player.walkDir.x;
        }
        if(this.player.playerPic.position.y > 268 && this.player.playerPic.position.y < 900){
            this.screenPosition.y += this.player.walkDir.y;
        }
      }
    }
    if(this.player.currentMap === 1){
        this.map2.moveScreen();
    }
    if(this.player.currentMap === 2){
        this.map3.moveScreen();
    }
    if(this.player.currentMap === 3){
        this.map4.moveScreen();
    }
    if(this.player.currentMap === 4){
        this.map5.moveScreen();
    }
};

Map1.prototype.checkChangeMap = function(){
     var playerIndex = this.toArrayIndex(this.player.playerPic.position.x, this.player.playerPic.position.y, -1);
     var playerPos = this.player.playerPic.position;

     this.player.isChangeMap = false;
     if(this.player.currentMap === 0){
       if(playerPos.x >= 1184 && playerPos.x <= 1278 && playerPos.y <= 26){
           this.player.currentMap = 1;
           this.player.isChangeMap = true;
           this.player.drawChangeMapEff = true;
           this.screenPosition = {
               x: 732,
               y: 626
           };
           this.player.setPosition({x: 37, y: 35},this.screenPosition);
           this.clearProperties();
           this.map2.generateProperties();
       }
     }

     if(this.player.currentMap === 1){
          this.map2.checkChangeMap();
     }
     if(this.player.currentMap === 2){
          this.map3.checkChangeMap();
     }
     if(this.player.currentMap === 3){
          this.map4.checkChangeMap();
     }
};

Map1.prototype.generateMonsters = function(){
    /*-------------Normal Map-------------*/
    var calaveraNum = 0;
    for(var i = 0; i < this.monsterAmount; i++){
      while(true){
        var row = Math.floor(Math.random() * 37), col = Math.floor(Math.random() * 85);
        if(this.mapArr[this.player.currentMap][row][col] < 2){
          break;
        }
      }
      this.dragonfly = new Dragonfly(this, this.player);
      this.dragonfly.load();
      this.dragonfly.setPosition({x: col, y: row});

      this.ant = new Ant(this,this.player);
      this.ant.load();
      this.ant.setPosition({x: col, y: row});

      this.spider = new Spider(this,this.player);
      this.spider.load();
      this.spider.setPosition({x: col, y: row});

      this.calavera = new Calavera(this,this.player);
      this.calavera.load();

      if(i % 5 === 0){
        calaveraNum++;
        this.calavera.setPositionAndDirection({x: calaveraNum * 8, y: 35},0);
      }

      if((i-1) % 5 === 0){
        this.calavera.setPositionAndDirection({x: calaveraNum * 8, y: 2},2);
      }

      if(this.player.currentMap === 0){
        this.monsterArr.push(this.dragonfly);
      }
      else if(this.player.currentMap === 1){
        this.monsterArr.push(this.ant);
      }
      else if(this.player.currentMap === 2){
        this.monsterArr.push(this.spider);
      }
      else if(this.player.currentMap === 3 && (i % 5 === 0 || (i-1) % 5 === 0)){
        this.monsterArr.push(this.calavera);
      }
    }
    /*-------------Boss Map----------------*/
    for(var i = 0; i < 5; i++){
      while(true){
        var row = Math.floor(Math.random() * 21), col = Math.floor(Math.random() * 42);
        if(this.mapArr[this.player.currentMap][row][col] < 2){
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

      if(this.player.currentMap === 4){
        if(i === 0){
          this.monsterArr.push(this.boss);
        }
        else if(i < 3){
          this.monsterArr.push(this.devil);
        }
        else if(i < 5){
          if(i === 3){
            this.defender.setPosition({x: 10, y: 10});
          }
          else{
            this.defender.setPosition({x: 32, y: 10});
          }
          this.monsterArr.push(this.defender);
        }
      }
    }
};