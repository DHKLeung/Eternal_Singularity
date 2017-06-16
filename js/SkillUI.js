var SkillUI = function(map){
    this.map = map;
    this.player = map.player;
    this.load = function(){
        this.pic = new Framework.Sprite(define.imagePathCharacter + 'Skill/skill_icon.png');
        this.picHover = new Framework.Sprite(define.imagePathCharacter + 'Skill/skill_iconHover.png');
        this.uiPic = new Framework.Sprite(define.imagePathCharacter + 'Skill/skillUI.png');
        this.frozenSwordPic = new Framework.Sprite(define.imagePathCharacter + 'Skill/FrozenSword.png');
        this.heroSlashPic = new Framework.Sprite(define.imagePathCharacter + 'Skill/HeroSlash.png');
        this.potentialPowerPic = new Framework.Sprite(define.imagePathCharacter + 'Skill/PotentialPower.png');
        this.infoPic = new Framework.Sprite(define.imagePathCharacter + 'Skill/Skill_info.png');
    }

    this.init = function(){
        this.skillArr = [];
        this.isHover = false;
        this.isUIOpened = false;

        this.pic.scale = 0.45;
        this.picHover.scale = this.pic.scale;
        this.uiPic.scale = 0.5;
        this.frozenSwordPic.scale = 0.6;
        this.heroSlashPic.scale = 0.6;
        this.potentialPowerPic.scale = 0.6;

        this.pic.position = {
          x: 1090,
          y: 630
        }
        this.picHover.position = this.pic.position;
        this.uiPic.position = {
          x: 260,
          y: 300
        }
        this.frozenSwordPic.position = {
          x: 840,
          y: 545
        }
        this.heroSlashPic.position = {
          x: 710,
          y: 545
        }
        this.potentialPowerPic.position = {
          x: 580,
          y: 541
        }
        this.infoPic.position = {
          x: 830,
          y: 250 
        }
    }

    this.update = function(){
        this.pic.update();
    }

    this.draw = function(ctx){
        if(this.isHover === false){
            this.pic.draw();
        }
        else{
            this.picHover.draw();
        }
        if(this.isUIOpened){
            this.uiPic.draw();
            this.infoPic.draw();
            this.drawEachSkill(ctx);
        }
        this.frozenSwordPic.draw();
        this.heroSlashPic.draw();
        this.potentialPowerPic.draw();
        this.drawCoolDownTime(ctx);
    }

    this.drawEachSkill = function(ctx){
        ctx.fillStyle = 'black';
        ctx.font = 'bold 26px freeScript ';
        if(this.player.vCut.level === 0){
          ctx.fillStyle = 'red';
        }
        ctx.fillText('V-Cut  Level: ' + this.player.vCut.level, 126, 142);
        ctx.fillText('Damage: ' + Math.floor(this.player.vCut.abilityList[this.player.vCut.level] * 100 )+ '%', 126, 168);

        if(this.player.microShield.level === 0){
          ctx.fillStyle = 'red';
        }
        ctx.fillText('Micro Shield  Level: ' + this.player.microShield.level, 126, 208);

        if(this.player.burstCut.level === 0){
          ctx.fillStyle = 'red';
        }
        ctx.fillText('Burst Cut  Level: ' + this.player.burstCut.level, 126, 274);
        ctx.fillText('Damage: ' + Math.floor(this.player.burstCut.abilityList[this.player.burstCut.level] * 100 )+ '%', 126, 300);

        if(this.player.swordLight.level === 0){
          ctx.fillStyle = 'red';
        }
        ctx.fillText('Sword Light  Level: ' + this.player.swordLight.level, 126, 340);
        ctx.fillText('Damage: ' + Math.floor(this.player.swordLight.abilityList[this.player.swordLight.level] * 100 )+ '%', 126, 366);
    }

    this.drawCoolDownTime = function(ctx){
        ctx.fillStyle = 'black';
        ctx.fillText('Cooldown Time', 380, 550);
        if(this.player.potentialPower.canAttack){
          ctx.fillText('0', 620, 541);
        }
        else{
          ctx.fillText(Math.round(this.player.potentialPower.coolDownCounter/100), 620, 541);
        }

        if(this.player.heroSlash.canAttack){
          ctx.fillText('0', 750, 541);
        }
        else{
          ctx.fillText(Math.round(this.player.heroSlash.coolDownCounter/100), 750, 541);
        }

        if(this.player.frozenSword.canAttack){
          ctx.fillText('0', 880, 541);
        }
        else{
          ctx.fillText(Math.round(this.player.frozenSword.coolDownCounter/100), 880, 541);
        }
    }

    this.mousemove = function(e){
        if(e.x > 1055 && e.x < 1112 && e.y > 599 && e.y < 655){
            this.isHover = true;
        }
        else {
            this.isHover = false;
        }
    }

    this.click = function(e){
        if(e.x > 1055 && e.x < 1112 && e.y > 599 && e.y < 655){
            if(this.isUIOpened === false){
                this.isUIOpened = true;
            }
            else{
                this.isUIOpened = false;
            }
        }
    }
}