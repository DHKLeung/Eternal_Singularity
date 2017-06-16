var GLevel1 = Framework.Class(Framework.Level , {
	load: function(){
		this.allMap = new Map1();
		this.allMap.load();
        this.allMap.generateMonsters();

        this.audio = new Framework.Audio({
             song1:{
               mp3: define.musicPath + 'Normal.mp3'
             },
             song2:{
               mp3: define.musicPath + 'Boss.mp3'
             }
        });
        this.audio.play({name: 'song1', loop: true});
	},
	loadingProgress: function(context, requestInfo){
        context.fillRect(0, 0, 1360, 700);
	},

    initialize: function() { 
	    this.allMap.initialize();
	    this.playSongCounter = 0;
    },

    update: function() { 
		this.allMap.update();
	    if(this.allMap.player.isChangeMap){
			this.allMap.generateMonsters();
		}
		if(this.allMap.player.currentMap === 4 && this.playSongCounter === 0){
			this.playSongCounter++;
			this.audio.stop('song1');
			this.audio.play({name: 'song2', loop: true});
		}
    },

    draw: function(parentCtx){
		this.allMap.draw(parentCtx);
    },

    keydown:function(e, list){
	    this.allMap.player.keydown(e, list);

		if(e.key === 'F11') {
            if(!this.isFullScreen) {
                Framework.Game.fullScreen();
                this.isFullScreen = true;
            } 
            else {
                Framework.Game.exitFullScreen();
                this.isFullScreen = false;
            }
        }
    },

	keyup:function(e, list){
		this.allMap.player.keyup(e, list);
	},

	mousemove:function(e){
	    this.allMap.player.bag.mousemove(e);
		this.allMap.player.questUI.mousemove(e);
		this.allMap.player.skillUI.mousemove(e);
		this.allMap.treasureChest.mousemove(e);
		this.allMap.mousemove(e);
	},

	touchstart: function (e) {

	},

    click: function (e) {
		this.allMap.player.bag.click(e);
		this.allMap.player.questUI.click(e);
		this.allMap.player.skillUI.click(e);
		this.allMap.treasureChest.click(e);
        this.allMap.click(e);
    },
});