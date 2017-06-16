var PlayerData = function(){
    this.expTable = [];
    this.hpTable = [];
    this.mpTable = [];
    this.apTable = [];
    this.atkTable = [];
    this.createExpTable();
    this.createHpTable();
    this.createMpTable();
    this.createApTable();
    this.createAtkTable();
}

PlayerData.prototype.createExpTable = function(){
    for(var level = 1; level < 100; level++){
      var exp = 0;
      if(level < 21){
        exp = Math.round(Math.pow(level,3) + 9);
      }
      else if(level >= 21 && level < 41){
        exp = Math.round(Math.pow(level,3) * 1.5);
      }
      else if(level >= 41 && level < 61){
        exp = Math.round(Math.pow(level,3.3));
      }
      else if(level >= 61 && level < 81){
        exp = Math.round(Math.pow(level,3.5));
      }
      else{
        exp = Math.round(Math.pow(level,3.5) * 1.3);
      }
      this.expTable.push(exp);
    }
};

PlayerData.prototype.createHpTable = function(){

};

PlayerData.prototype.createMpTable = function(){

};

PlayerData.prototype.createApTable = function(){

};

PlayerData.prototype.createAtkTable = function(){

};