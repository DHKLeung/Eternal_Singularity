var MyMenu = Framework.exClass(Framework.GameMainMenu , {
    load: function(){
        this.menu = new Framework.Sprite(define.imagePathCanvas + "CoverPhoto2.png");
        this.startbtn = new Framework.Sprite(define.imagePathStartPage + "start_btn.png");
        this.startbtn_hover = new Framework.Sprite(define.imagePathStartPage + "start_btn_hover.png");
        this.startbtn2 = new Framework.Sprite(define.imagePathStartPage + "start_btn2.png");
        this.startbtn_hover2 = new Framework.Sprite(define.imagePathStartPage + "start_btn_hover2.png");
        this.linkBtn = new Framework.Sprite(define.imagePath + "linkBtn.png");
        this.linkBtn_hover = new Framework.Sprite(define.imagePath + "linkBtn_hover.png");
        this.ballPic = new Framework.Sprite(define.imagePathEffect + 'iceball.png');

        this.iceBallArr = [];
        for(var i = 0; i < 50; i++){
          this.iceBall = new IceBall();
          this.iceBall.load();
          this.iceBall.init();
          this.iceBallArr.push(this.iceBall);
        }

        this.audio = new Framework.Audio({
            initSong1:{
               mp3: define.musicPath + 'Begin.mp3'
            }
        });
        this.audio.play({name: 'initSong1', loop: true});
    },

    loadingProgress: function(context){
        context.globalAlpha = 0.8;
        context.fillRect(0, 0, 1360, 700);
    },

    initialize: function(){
        //position
        this.startbtn.position = {
            x : 685,
            y : 300
        };
        this.startbtn_hover.position = this.startbtn.position;

        this.startbtn2.position = {
            x: 680,
            y: 390
        };
        this.startbtn_hover2.position = this.startbtn2.position;

        this.linkBtn.position = {
            x: 1280,
            y: 50
        };
        this.linkBtn_hover.position = this.linkBtn.position;

        this.menu.position = {
          x: Framework.Game.getCanvasWidth() / 2,
          y: Framework.Game.getCanvasHeight() / 2
        };
        this.ballPic.position = {
          x: -10,
          y: -10
        }
        //scale
        this.menu.scale = 0.68;
        this.startbtn.scale = 0.5;
        this.startbtn_hover.scale = 0.5;
        this.startbtn2.scale = 0.5;
        this.startbtn_hover2.scale = 0.5;
        this.linkBtn.scale = 0.35;
        this.linkBtn_hover.scale = 0.35;
        //boolean
        this.isStartbtnHover = false;
        this.isStartbtn2Hover = false;
        this.isLinkBtnHover = false;

        this.counter = 0;
    },

    update: function(){
        this.ballPic.draw();
        this.ballPic.position.y--;
        for(var i in this.iceBallArr){
          this.iceBallArr[i].update();
        }
    },

    draw: function(ctx){
        this.menu.draw();
        for(var i in this.iceBallArr){
            this.iceBallArr[i].draw();
        }
        if(!this.isStartbtnHover){
            this.startbtn.draw();
        }
        else{
            this.startbtn_hover.draw();
        }
        if(!this.isLinkBtnHover){
            this.linkBtn.draw();
        }
        else {
            this.linkBtn_hover.draw();
        }
        if(!this.isStartbtn2Hover){
            this.startbtn2.draw();
        }
        else{
            this.startbtn_hover2.draw();
        }
    },

    mousemove:function(e){
        if(e.x >= 602 && e.x <= 758 && e.y >= 264 && e.y <= 318){
            this.isStartbtnHover = true;
        }
        else{
            this.isStartbtnHover = false;
        }
        if(e.x >= 1250 && e.x <= 1300 && e.y >= 26 && e.y <= 69){
            this.isLinkBtnHover = true;
        }
        else{
            this.isLinkBtnHover = false;
        }
        if(e.x >= 565 && e.x <= 787 && e.y >= 343 && e.y <= 418){
            this.isStartbtn2Hover = true;
        }
        else{
            this.isStartbtn2Hover = false;
        }
    },

    click:function(e){
        if(e.x >= 602 && e.x <= 758 && e.y >= 264 && e.y <= 318){
           console.log("Go to next level!");
           this.audio.stop('initSong1');
           Framework.Game.goToNextLevel();
        }
        if(e.x >= 565 && e.x <= 787 && e.y >= 343 && e.y <= 418){
           console.log("Go to SkillShowcase Map!");
           Framework.Game.goToLevel('skillShowcase');
        }

        if(e.x >= 1250 && e.x <= 1300 && e.y >= 26 && e.y <= 69){
            window.open("Game_Info/MainPage/index.html");
        }
    },
});