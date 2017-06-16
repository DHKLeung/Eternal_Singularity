var Player = function(map){
    this.map = map;
    this.alpha = 1;
    this.delta = 0.02;

    this.load = function(){
        this.url1 = define.imagePathCharacter + 'bodyRes.png';
        this.url2 = define.imagePathCharacter + 'corpse.png';
        this.url3 = define.imagePathEffect + '006.png';
        this.playerPic = new Framework.AnimationSprite({url:this.url1, col:9, row:8, loop:false, speed:1});
        this.corpsePic = new Framework.Sprite(this.url2);
        this.basicAttack = new BasicAttack(map);
        this.basicAttack.load();
        this.teleport = new Teleport(map);
        this.teleport.load();
        this.vCut = new VCut(map);
        this.vCut.load();
        this.burstCut = new BurstCut(map);
        this.burstCut.load();
        this.crossCut = new CrossCut(map);
        this.crossCut.load();
        this.swordLight = new SwordLight(map);
        this.swordLight.load();
        this.light = new Light(map);
        this.light.load();
        this.microShield = new MicroShield(map);
        this.darkForce = new DarkForce(map);
        this.darkForce.load();
        this.frozenSword = new FrozenSword(map);
        this.frozenSword.load();
        this.potentialPower = new PotentialPower(map);
        this.potentialPower.load();
        this.heroSlash = new HeroSlash(map);
        this.heroSlash.load();
        this.bag = new Bag(this);
        this.bag.load();
        this.questUI = new QuestUI(map);
        this.questUI.load();
        this.skillUI = new SkillUI(map);
        this.skillUI.load();
        this.data = new WarriorData();

        this.audio = new Framework.Audio({
             initSong1:{
               mp3: define.musicPath + 'slash.mp3'
             },
             initSong2:{
               mp3: define.musicPath + 'VCut.mp3'
             },
             initSong3:{
               mp3: define.musicPath + 'BurstCut.mp3'
             },
             initSong4:{
               mp3: define.musicPath + 'thunder.mp3'
             }
        });
    }

    this.init = function(){
        this.currentMap = 0;
        this.walkDir = {x:0,y:0};
        this.bag.init();
        this.questUI.init();
        this.skillUI.init();
        this.isWalking = false;
        this.isAttacked = false;
        this.isScreenMove = false;
        this.isChangeMap = false;
        this.drawChangeMapEff = false;
        this.isMovingScreen = false;
        this.isInCheatMode = false;

        this.direction = 0;//0:up, 1:left, 2:down, 3:right
        this.screenPosOffset = 0;
        this.resistTime = 270;
        this.resistCounter = this.resistTime;
        this.playerPic.scale = 0.5;
        //player basic info
        this.money = 0;
        this.exp = 0;
        this.atk = 1;
        for(var i = 1; i < this.level; i++){
          this.atk += this.data.atkTable[i];
        }
        this.def = 0;
        this.healthPoint = this.data.hpTable[this.level-1];
        this.manaPoint = this.data.mpTable[this.level-1];
        this.actionPoiot = this.data.apTable[this.level-1];
        this.currentHP = this.healthPoint;
        this.currentMP = this.manaPoint;
        this.currentAP = this.actionPoiot;
        this.playerSpeed = 0;
        //Skills
        this.basicAttack.init();
        this.vCut.init();
        this.burstCut.init();
        this.crossCut.init();
        this.swordLight.init();
        this.darkForce.init();
        this.frozenSword.init();
        this.potentialPower.init();
        this.heroSlash.init();
    }

    this.setPlayerLevel = function(level){
        this.level = level;
    }

    this.setPosition = function(pos,screenPos){
        this.position = pos;
        this.playerPic.position = {
           x:this.position.x * 32 + 16 ,
           y:this.position.y * 32 + 16
        };
    }

    this.update = function(){
        this.corpsePic.position = this.playerPic.position;
        if(this.isKeyPress &&
           this.map.canMove(this.playerPic.position.x + this.walkDir.x, this.playerPic.position.y +this.walkDir.y, this.direction) &&
           this.currentAP > 0 && this.currentHP > 0){
            this.isScreenMove = true;
            this.walk(this.walkDir);
        }
        else{
            this.isScreenMove = false;
        }

        if(this.currentAP < this.actionPoiot){
            this.currentAP += 1;
        }

        if(this.resistCounter > 0 && this.isAttacked){
            this.resistCounter--;
        }

        if(this.isKeyPress){
          if(this.resistCounter < 61){
              this.playerPic.start({from: (this.direction+4) * 9, to: (this.direction+4) * 9 + 8, loop: true});
          }
          else{
              this.playerPic.start({from: this.direction * 9, to: this.direction * 9 + 8, loop: true});
          }
        }
        else{
            this.playerPic.start({from: this.direction * 9, to: this.direction * 9, loop: true});
        }
        // if(this.isMovingScreen && this.playerPic.position.y > 300 && this.playerPic.position.y < 1100){
        //     this.screenPosOffset++;
        //     this.map.screenPosition.y += this.walkDir.y;
        // }
        //
        // if(this.screenPosOffset > 32){
        //     this.screenPosOffset = 0;
        //     this.isMovingScreen = false;
        // }
        this.basicAttack.update();
        this.vCut.update();
        this.burstCut.update();
        this.crossCut.update();
        this.swordLight.update();
        this.frozenSword.update();
        this.frozenSword.effectPic.update();
        this.light.update();
        this.microShield.update();
        this.darkForce.update();
        this.potentialPower.update();
        this.heroSlash.update();

        this.playerPic.update();
        this.teleport.update();
        this.bag.update();
        this.questUI.update();
        this.skillUI.update();

        this.checkLevelUp();

        if(this.isInCheatMode){
            this.def = 1;
        }
    }
    this.walk = function(movePos){
        if(this.isWalking){
          if(movePos.x > 0){//Move Right
              this.direction = 3;
          }
          else if(movePos.x < 0){//Move Left
              this.direction = 1;
          }
          if(movePos.y > 0){//Move Down
              this.direction = 2;
          }
          else if(movePos.y < 0){//Move Up
              this.direction = 0;
          }
          this.playerPic.position.x += movePos.x;
          this.playerPic.position.y += movePos.y;
          if(this.currentAP >= 0){
              this.currentAP -= 2;
          }
        }
        else{
          this.playerPic.stop();
        }
    }
    this.checkLevelUp = function(){
        if(this.exp >= this.data.expTable[this.level-1]){
            this.exp -= this.data.expTable[this.level-1];
            this.healthPoint = this.data.hpTable[this.level];
            this.manaPoint = this.data.mpTable[this.level];
            this.actionPoiot = this.data.apTable[this.level];
            this.currentHP = this.healthPoint;
            this.currentMP = this.manaPoint;
            this.currentAP = this.actionPoiot;
            this.atk += this.data.atkTable[this.level-1];
            this.level++;
        }
    }

    this.isKeyPress = false;
    this.key = "";
    this.keydown = function(e, list){
        var playerPos = this.playerPic.position;

        if(e.key === 'Right'){
          this.key = "Right";
          this.isKeyPress = true;
          this.walkDir = {x: 2 + this.playerSpeed, y: 0};
          this.direction = 3;
          this.isWalking = true;
        }
        if(e.key === 'Left'){
          this.key = "Left";
          this.isKeyPress = true;
          this.walkDir = {x: -2 - this.playerSpeed, y: 0};
          this.direction = 1;
          this.isWalking = true;
        }
        if(e.key === 'Up'){
          this.key = "Up";
          this.isKeyPress = true;
          this.walkDir = {x: 0, y: -2 - this.playerSpeed};
          this.direction = 0;
          this.isWalking = true;
        }
        if(e.key === 'Down'){
          this.key = "Down";
          this.isKeyPress = true;
          this.walkDir = {x: 0, y: 2 + this.playerSpeed};
          this.direction = 2;
          this.isWalking = true;
        }
        if(e.key === 'X'){
          this.key = 'X';
          this.isKeyPress = false;

          if(this.basicAttack.canAttack){
            this.basicAttack.isAttack = true;
            this.basicAttack.isDrawed = true;
            this.basicAttack.pic.position = {
                x: this.playerPic.position.x + this.walkDir.x * 15,
                y: this.playerPic.position.y + this.walkDir.y * 15
            };
            this.basicAttack.attack(playerPos.x + this.walkDir.x * 12, playerPos.y + this.walkDir.y * 12, this.direction);
            // this.audio.play({name: 'initSong1'});
          }

        }

        if(e.key === 'C'){
            this.key = 'C';
            this.isKeyPress = false;

            if(this.currentMP >= this.vCut.mpCost && this.vCut.canAttack && this.level >= 5){
              this.currentMP -= this.vCut.mpCost;
              this.vCut.isAttack = true;
              this.vCut.isDrawed = true;
              this.vCut.pic.position = {
                x: this.playerPic.position.x + this.walkDir.x * 32,
                y: this.playerPic.position.y + this.walkDir.y * 32
              };
              this.vCut.attack(playerPos.x, playerPos.y, this.direction);
              // this.audio.play({name: 'initSong2'});
            }
        }

        if(e.key === 'V'){
            this.key = 'V';
            this.isKeyPress = false;

            if(this.currentMP >= this.burstCut.mpCost && this.burstCut.canAttack && this.level >= 10){
              this.burstCut.isDrawed = true;
              this.currentMP -= this.burstCut.mpCost;
              this.burstCut.isAttack = true;
              this.burstCut.pic.position = {
                x: this.playerPic.position.x + this.walkDir.x * 32,
                y: this.playerPic.position.y + this.walkDir.y * 32
              };
              this.burstCut.attack(playerPos.x, playerPos.y, this.direction);
              // this.audio.play({name: 'initSong3'});
            }
        }

        if(e.key === 'B'){
            this.key = 'B';
            this.isKeyPress = false;

            if(this.currentMP >= this.swordLight.mpCost && this.swordLight.canAttack && this.level >= 15){
              this.swordLight.isDrawed = true;
              this.currentMP -= this.swordLight.mpCost;
              this.swordLight.isAttack = true;
              this.light.isAttack = true;
              this.swordLight.pic.position = {
                x: this.playerPic.position.x + this.walkDir.x * 32,
                y: this.playerPic.position.y + this.walkDir.y * 32
              };
              this.light.pic.position = this.swordLight.pic.position;
              switch (this.direction) {
                case 0:
                  this.light.direction = 0;
                  break;
                case 1:
                  this.light.direction = 1;
                  break;
                case 2:
                  this.light.direction = 2;
                  break;
                case 3:
                  this.light.direction = 3;
                  break;
              }

              this.swordLight.attack(playerPos.x, playerPos.y, this.direction);
              // this.audio.play({name: 'initSong3'});
            }
        }

        if(e.key === 'Space'){
          this.key = 'Space';
          this.isKeyPress = false;

          if(this.currentHP >= this.crossCut.hpCost && this.crossCut.canAttack && this.level >= 18){
            this.crossCut.isDrawed = true;
            this.crossCut.isAttack = true;
            this.currentHP -= this.crossCut.hpCost;

            this.crossCut.attack(playerPos.x, playerPos.y, this.direction);
          }
        }

        if(e.key === 'ctrlKey'){
          this.key = 'ctrlKey';
          this.isKeyPress = false;

          if(this.currentMP >= this.frozenSword.mpCost && this.frozenSword.canAttack && this.level >= 25){
            this.frozenSword.isDrawed = true;
            this.currentMP -= this.frozenSword.mpCost;
            this.frozenSword.isAttack = true;

            this.frozenSword.attack();
          }
        }

        if(e.key === 'shiftKey'){
          this.key = 'shiftKey';
          this.isKeyPress = false;

          if(this.currentMP >= this.heroSlash.mpCost && this.heroSlash.canAttack &&
             this.potentialPower.isUsingSkill && this.level >= 20){
            this.currentMP -= this.heroSlash.mpCost;
            this.heroSlash.isDrawed = true;
            this.heroSlash.isAttack = true;
            this.heroSlash.pic.position = {
              x: this.playerPic.position.x + this.walkDir.x * 32,
              y: this.playerPic.position.y + this.walkDir.y * 32
            };
            switch (this.direction) {
              case 0:
                this.heroSlash.direction = 0;
                break;
              case 1:
                this.heroSlash.direction = 1;
                break;
              case 2:
                this.heroSlash.direction = 2;
                break;
              case 3:
                this.heroSlash.direction = 3;
                break;
            }
          }
        }

        if(e.key === 'A' && (this.map.mapType !== 'scroll' || this.currentMap === 4)){
            this.key = 'A';
            this.isKeyPress = false;
            if(this.map.canMove(this.playerPic.position.x + this.walkDir.x*32, this.playerPic.position.y + this.walkDir.y*32, this.direction) &&
               this.teleport.canAttack){
              this.isMovingScreen = true;
              this.teleport.isDrawed = true;
              this.teleport.isAttack = true;

              this.teleport.move(this.walkDir);
            }
        }

        if(e.key === 'S'){
            this.key = 'S';
            this.isKeyPress = false;

            if(this.currentMP >= this.darkForce.mpCost && this.darkForce.canAttack && this.level >= 13){
              this.currentMP -= this.darkForce.mpCost;
              this.darkForce.buff();
              this.darkForce.isDrawed = true;
              this.darkForce.isAttack = true;
            }
        }

        if(e.key === 'D'){
            this.key = 'D';
            this.isKeyPress = false;

            if(this.currentMP >= Math.round(this.manaPoint / 2) && this.currentHP > Math.round(this.healthPoint / 2) &&
               this.potentialPower.canAttack && this.level >= 13){
              this.potentialPower.isDrawed = true;
              this.currentMP -= Math.round(this.manaPoint / 2);
              this.currentHP -= Math.round(this.healthPoint / 2);
              this.potentialPower.isAttack = true;

              this.potentialPower.buff();
            }
        }

        if(e.key === 'Z'){//pick up
            this.key = 'Z';
            this.isKeyPress = false;
            this.pickUpProperty();
        }

        if(e.key === 'Q'){//Using HP potion
            this.key = 'Q';
            this.isKeyPress = false;
            if(this.currentMap !== 3){
              this.useNormalHpPotion();
            }
        }

        if(e.key === 'W'){//Using MP potion
            this.key = 'W';
            this.isKeyPress = false;
            this.useNormalMpPotion();
        }

        if(e.key === '1'){
            if(this.isInCheatMode){
              this.isInCheatMode = false;
            }
            else{
              this.isInCheatMode = true;
            }
            this.atk = 99999;
        }

        if(e.key === '2'){
            this.currentHP = this.healthPoint;
            this.currentMP = this.manaPoint;
        }

        if(e.key === '3'){
            this.exp += this.data.expTable[this.level-1];
        }

        this.playerPic.start({from: this.direction * 9, to: this.direction * 9, loop: true});
        this.playerPic.update();

    }

    this.pickUpProperty = function(){
        var playerPos = this.map.toArrayIndex(this.playerPic.position.x, this.playerPic.position.y, this.direction);//Transform the player's position to array index
        var propIndex = this.map.propertyArr[playerPos.row][playerPos.col];

        if(propIndex !== 0){
           var propObj = {
              type: propIndex,
              number: 1
           };

           if(!this.bag.isPropertyExist(propObj)){
               this.bag.propertyArr.push(propObj);
           }
           else{
              this.bag.addProperty(propObj);
           }

           if(this.map.mapArr[this.currentMap][playerPos.row][playerPos.col] !== 1){
             this.map.mapArr[this.currentMap][playerPos.row][playerPos.col] = 0;
           }
           this.map.propertyArr[playerPos.row][playerPos.col] = 0;
        }
    }

    this.useNormalHpPotion = function(){
        if(this.map.mapType !== 'scroll'){
          this.currentHP = this.healthPoint;
        }
        for(var i = 0; i < this.bag.propertyArr.length; i++){
            if(this.bag.propertyArr[i].type === 4 && this.bag.propertyArr[i].number > 0){
                this.bag.propertyArr[i].number--;
                if(this.currentHP/this.healthPoint >= 0.75){
                    this.currentHP = this.healthPoint;
                }
                else{
                    this.currentHP += Math.round(this.healthPoint * 0.25);
                }
            }
        }
    }

    this.useNormalMpPotion = function(){
        if(this.map.mapType !== 'scroll'){
          this.currentMP = this.manaPoint;
        }  
        for(var i = 0; i < this.bag.propertyArr.length; i++){
            if(this.bag.propertyArr[i].type === 5 && this.bag.propertyArr[i].number > 0){
                this.bag.propertyArr[i].number--;
                if(this.currentMP/this.manaPoint >= 0.75){
                    this.currentMP = this.manaPoint;
                }
                else{
                    this.currentMP += Math.round(this.manaPoint * 0.25);
                }
            }
        }
    }

    this.keyup = function(e, list){
        if(e.key){
            if(this.key === e.key)
            {
                this.isKeyPress = false;
                this.isWalking = false;
            }
        }
    }

    this.draw = function(ctx){
        ctx.fillStyle = 'black';
				ctx.font = 'bold 28px freeScript ';
				ctx.fillText('HP',23,620);
				ctx.fillText(this.currentHP + '/' + this.healthPoint,73,650);
        ctx.fillText('MP',250,620);
				ctx.fillText(this.currentMP + '/' + this.manaPoint,298,650);
        ctx.fillText('AP',480,620);
				ctx.fillText(this.currentAP + '/' + this.actionPoiot,523,650);
        ctx.fillText('Level  ' + this.level,700,620);
        ctx.fillText('Atk : ' + Math.round(this.atk), 650, 670);
        ctx.fillText('Def : ' + this.def * 100 + '%', 810, 670);

        ctx.fillText('EXP',23,670);
        ctx.fillText(this.exp + ' / ' + this.data.expTable[this.level-1], 280, 690);

        ctx.fillStyle = 'rgba(23, 24, 24, 0.50)';
        ctx.fillRect(63, 605, 150, 20);
        ctx.fillRect(290, 605, 150, 20);
        ctx.fillRect(520, 605, 150, 20);
        ctx.fillRect(73, 655, 550, 20);

				ctx.fillStyle = 'rgb(159, 29, 6)';
				ctx.fillRect(63, 605, 150*(this.currentHP/this.healthPoint), 20);
				ctx.fillStyle = 'rgb(114, 62, 159)';
				ctx.fillRect(290, 605, 150*(this.currentMP/this.manaPoint), 20);
				ctx.fillStyle = 'rgb(234, 236, 139)';
				ctx.fillRect(520, 605, 150*(this.currentAP/this.actionPoiot), 20);
        ctx.fillStyle = 'rgba(10, 213, 152, 0.86)';
        ctx.fillRect(73, 655, 550*(this.exp/this.data.expTable[this.level-1]), 20);
        
        this.basicAttack.draw();
        this.teleport.draw();
        this.vCut.draw();
        this.burstCut.draw();
        this.crossCut.draw();
        this.darkForce.draw();
        this.swordLight.draw();
        this.light.draw();
        this.frozenSword.draw();
        this.potentialPower.draw();
        this.heroSlash.draw();

        this.bag.draw(ctx);
        this.questUI.draw(ctx);
        this.skillUI.draw(ctx);

        if(this.drawChangeMapEff){
          this.alpha -= this.delta;
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, 1360, 700);
        }
        if(this.alpha <= 0){
          this.drawChangeMapEff = false;
          this.alpha = 1;
        }
    }
};