var QuestUI = function(map){
    this.load = function(){
        this.bookPic = new Framework.Sprite(define.imagePathCharacter + 'Quest/Book.png');
        this.bookPicHover = new Framework.Sprite(define.imagePathCharacter + 'Quest/Book_hover.png');
        this.uiPic = new Framework.Sprite(define.imagePathCharacter + 'Quest/UI.png');
        this.alertPic = new Framework.Sprite(define.imagePathCharacter + 'Quest/alert.png');
        this.processingInfoPic = new Framework.Sprite(define.imagePathCharacter + 'Quest/processingInfo.png');
        this.map = map;
        this.player = this.map.player;
        this.questArr = [];
        this.quest1 = new Quest1(this.map, this.player, this);
        this.questArr.push(this.quest1);
        this.pushQuests();
    }

    this.init = function(){
        this.isHover = false;
        this.drawUI = false;
        this.isUIOpened = false;
        this.showCounter = 0;
        this.showRewardInfo = false;

        this.bookPic.scale = 0.2;
        this.bookPicHover.scale = 0.2;
        this.uiPic.scale = 0.1;
        this.alertPic.scale = 0.6;
        this.processingInfoPic.scale = 0.5;

        this.bookPic.position = {
          x: 1193,
          y: 630
        };
        this.bookPicHover.position = this.bookPic.position;
        this.processingInfoPic.position = {
          x: this.bookPic.position.x,
          y: this.bookPic.position.y - 250
        };

        this.alertPic.position = {
          x: this.bookPic.position.x - 50,
          y: this.bookPic.position.y
        };

        this.uiPic.position = {
          x: 660,
          y: 300
        };
    }

    this.update = function(){
        this.bookPic.update();
        this.bookPicHover.update();
        if(this.uiPic.scale <= 0.5){
          this.uiPic.scale += 0.0065;
        }

        for(var i = 0; i < this.questArr.length; i++){
          this.questArr[i].update();
          if(this.questArr[i].isCompleted && this.showCounter === 0){
              this.showRewardInfo = true;
          }
          if(this.showCounter > 180){
            this.showRewardInfo = false;
            this.showCounter = 0;
            this.questArr.splice(i, 1);
          }
        }

        if(this.showRewardInfo){
            this.showCounter++;
        }
    }

    this.draw = function(ctx){
        if(this.isHover === false){
            this.bookPic.draw();
        }
        else{
            this.bookPicHover.draw();
            this.processingInfoPic.draw();
            this.drawQuestInfo(ctx);
        }
        if(this.drawUI === true){
            this.uiPic.draw();
            this.drawQuests(ctx);
        }
        else{
          this.uiPic.scale = 0.2;
        }
    }

    this.drawQuests = function(ctx){
        for(var i = 0; i < this.questArr.length; i++){
          var picPosition = {
            x: 620,
            y: 150 + i * 60
          };
          if(this.questArr[i].isTrigger && this.questArr[i].isCompleted === false){
            this.questArr[i].title.position = picPosition;
            this.questArr[i].titleHover.position = picPosition;
            this.questArr[i].draw(ctx);
          }
          if(this.showRewardInfo){
            this.questArr[0].rewardInfo.draw();
          }
        }
    }

    this.drawQuestInfo = function(ctx){
        for(var i = 0; i < this.questArr.length; i++){
          this.questArr[i].drawInfo(ctx);
        }
    }

    this.pushQuests = function(){
        this.quest2 = new Quest2(this.map, this.player, this);
        this.questArr.push(this.quest2);
        this.quest3 = new Quest3(this.map, this.player, this);
        this.questArr.push(this.quest3);
        this.quest4 = new Quest4(this.map, this.player, this);
        this.questArr.push(this.quest4);
        this.quest5 = new Quest5(this.map, this.player, this);
        this.questArr.push(this.quest5);
    }

    this.mousemove = function(e){
        if(e.x > 1150 && e.x < 1233 && e.y > 595 && e.y < 655){
            this.isHover = true;
        }
        else {
            this.isHover = false;
        }

        for(var i = 0; i < this.questArr.length; i++){
          var submitBtnPos = this.questArr[i].submitBtn.position;
          if(e.x > 474 && e.x < 764 && e.y > 127 + i * 60 && e.y < 153 + i * 60){
              this.questArr[i].isHover = true;
          }
          else {
              this.questArr[i].isHover = false;
          }
          if(this.questArr[i].drawContent === true){//Check if the submit button is pressed
            if(e.x > submitBtnPos.x - 50 && e.x < submitBtnPos.x + 50 &&
               e.y > submitBtnPos.y - 20 && e.y < submitBtnPos.y + 20){
              this.questArr[i].isSubmitBtnHover = true;
            }
            else {
              this.questArr[i].isSubmitBtnHover = false;
            }
          }
        }
    }

    this.click = function(e){
        if(e.x > 1150 && e.x < 1233 && e.y > 595 && e.y < 655){
            if(this.drawUI === false){
                this.drawUI = true;
            }
            else{
                this.drawUI = false;
            }
            if(this.isUIOpened === false){
                this.isUIOpened = true;
            }
            else{
                this.isUIOpened = false;
            }
        }
        for(var i = 0; i < this.questArr.length; i++){
          var closeContentPos = this.questArr[i].content.position;
          var submitBtnPos = this.questArr[i].submitBtn.position;
          if(e.x > 474 && e.x < 764 && e.y > 127 + i * 60 && e.y < 153 + i * 60){
              this.questArr[i].drawContent = true;
          }
          else if(e.x > closeContentPos.x + 210 || e.x < closeContentPos.x - 210 ||
                  e.y > closeContentPos.y + 125 ||  e.y < closeContentPos.y - 125){
              this.questArr[i].drawContent = false;
          }

          if(this.questArr[i].drawContent === true){//Check if the submit button is pressed
            if(e.x > submitBtnPos.x - 50 && e.x < submitBtnPos.x + 50 &&
               e.y > submitBtnPos.y - 20 && e.y < submitBtnPos.y + 20){
              this.questArr[i].checkCompleted();
              this.questArr[i].getReward();
            }
          }
        }
    }
}