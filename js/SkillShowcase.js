var SkillShowcase = Framework.Class(Framework.Level , {
	load: function(){
	    this.allMap = new TestMap();
	    this.allMap.load();
        this.allMap.generateMonsters();
	},
	loadingProgress: function(context, requestInfo){
        context.fillRect(0, 0, 1360, 700);
	},

    initialize: function() {
	    this.allMap.initialize();
    },

    update: function() {
		this.allMap.update();
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
            } else {
                Framework.Game.exitFullScreen();
                this.isFullScreen = false;
            }
        }
    },

	keyup:function(e, list){
		this.allMap.player.keyup(e, list);
	},

	mousemove:function(e){
		this.allMap.mousemove(e);
	},

    click: function (e) {
        this.allMap.click(e);
    },
});