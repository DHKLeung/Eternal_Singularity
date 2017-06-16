var Bag = function(player){
    this.load = function(){
        this.player = player;
        this.bagPic = new Framework.Sprite(define.imagePathCharacter + 'bag/bag.png');
        this.bagPicHover = new Framework.Sprite(define.imagePathCharacter + 'bag/bag_hover.png');
        this.field = new Framework.Sprite(define.imagePathCharacter + 'bag/field.png');
        this.moneyField = new Framework.Sprite(define.imagePathCharacter + 'bag/moneyField.png');
        this.clusterInbag = new Cluster();
        this.clusterInbag.load();
        this.medicineInBag = new Medicine();
        this.medicineInBag.load();
        this.questItem = new QuestItem();
        this.questItem.load();
    }

    this.init = function(){
        this.bagPic.scale = 0.5;
        this.bagPicHover.scale = 0.5;
        this.moneyField.scale = 0.35;

        this.isHover = false;
        this.drawField = false;
        this.isBagOpened = false;
        this.propertyArr = new Array();//Index 0 is the property type, index 1 is amount of the property
        this.capacity = 30;
        this.bagPic.position = {
          x: 1289,
          y: 630
        };
        this.bagPicHover.position = this.bagPic.position;
        this.moneyField.position = {
          x: 1055,
          y: 580
        };
    }

    this.update = function(){
        this.bagPic.update();
        this.bagPicHover.update();
        this.clusterInbag.update();
        this.medicineInBag.update();
        this.removeProperty();
    }

    this.draw = function(ctx){
        if(!this.isHover){
            this.bagPic.draw();
        }
        else{
            this.bagPicHover.draw();
        }
        if(this.drawField){
            for(var row = 0; row < 6; row++){
              for(var col = 0; col < 5; col++){
                 this.field.position ={
                   x: 65 * col + 1000,
                   y: 65 * row + 210
                 };
                 this.field.draw();
              }
            }
            this.moneyField.draw();
            ctx.fillStyle = 'rgb(34, 27, 31)';
            ctx.fillText(this.player.money, this.moneyField.position.x-38, this.moneyField.position.y+10);
        }
        if(this.isBagOpened){
          for(var i = 0; i < this.propertyArr.length; i++){
            var picPosition = {
              x: 65 * (i%5) + 995,
              y: 65 * Math.floor(i/5) + 200
            };
            switch (this.propertyArr[i].type) {//30~ => quest item
              case 1:
                this.clusterInbag.blue_cluster.position = picPosition;
                this.clusterInbag.blue_cluster.draw();
                break;
              case 2:
                this.clusterInbag.red_cluster.position = picPosition;
                this.clusterInbag.red_cluster.draw();
                break;
              case 3:
                this.clusterInbag.green_cluster.position = picPosition;
                this.clusterInbag.green_cluster.draw();
                break;
              case 4:
                this.medicineInBag.hpPotion.position = picPosition;
                this.medicineInBag.hpPotion.draw();
                break;
              case 5:
                this.medicineInBag.mpPotoin.position = picPosition;
                this.medicineInBag.mpPotoin.draw();
                break;
              case 10:
                this.clusterInbag.tourmaline.position = picPosition;
                this.clusterInbag.tourmaline.draw();
                break;
              case 11:
                this.clusterInbag.zircon.position = picPosition;
                this.clusterInbag.zircon.draw();
                break;
              case 30:
                this.questItem.aged_scroll.position = picPosition;
                this.questItem.aged_scroll.draw();
                break;
              case 31:
                this.questItem.perfect_scroll.position = picPosition;
                this.questItem.perfect_scroll.draw();
                break;
            }
            ctx.fillStyle = 'rgb(8, 17, 3)';
            ctx.fillText(this.propertyArr[i].number, picPosition.x-25, picPosition.y+25);

          }
        }
    }

    this.isPropertyExist = function(propObj){
        if(this.propertyArr.length === 0){return false;}
        for(var i = 0; i < this.propertyArr.length; i++){
            if(this.propertyArr[i].type === propObj.type){
                return true;
            }
        }
        return false;
    }

    this.addProperty = function(propObj){
        for(var i = 0; i < this.propertyArr.length; i++){
            if(this.propertyArr[i].type === propObj.type){
                this.propertyArr[i].number += propObj.number;
            }
        }
    }

    this.removeProperty = function(){
        for(var i = 0; i < this.propertyArr.length; i++){
            if(this.propertyArr[i].number === 0){
                this.propertyArr.splice(i, 1);
            }
        }
    }

    this.getPropertyNumber = function(propType){
        for(var i = 0; i < this.propertyArr.length; i++){
            if(this.propertyArr[i].type === propType){
              return this.propertyArr[i].number;
            }
        }
    }

    this.mousemove = function(e){
        if(e.x > 1262 && e.x < 1315 && e.y > 599 && e.y < 655){
            this.isHover = true;
        }
        else {
            this.isHover = false;
        }
    }

    this.click = function(e){
        if(e.x > 1262 && e.x < 1315 && e.y > 599 && e.y < 655){
            if(!this.drawField){
                this.drawField = true;
            }
            else{
                this.drawField = false;
            }
            if(!this.isBagOpened){
                this.isBagOpened = true;
            }
            else{
                this.isBagOpened = false;
            }
        }
    }
}