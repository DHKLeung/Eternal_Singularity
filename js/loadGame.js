var loadGameEnd;
(function(){//anonymous function
    var  importJS = function(jsConf, src, lookFor) {
        var headID = document.getElementsByTagName("head")[0];
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if(jsConf.length > 0) {
                importJS(jsConf, lookFor);
            }else
      			{
      				  loadGameEnd = true;
      			}
        });
    }

    var wait_for_script_load = function(jsConf, callback) {
        var interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = '';
            }

            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                    clearInterval(interval);
                    callback();
                }
            }, 50);
    }
    var listScript =
    [
        { src: 'js/Define.js', lookFor: 'define' },
        { src: 'js/MyMenu.js', lookFor: 'MyMenu'},
        { src: 'js/BaseMap.js', lookFor: 'BaseMap'},
        { src: 'js/TestMap.js', lookFor: 'TestMap' },
        { src: 'js/Map1.js', lookFor: 'Map1' },
        { src: 'js/Map2.js', lookFor: 'Map2' },
        { src: 'js/Map3.js', lookFor: 'Map3' },
        { src: 'js/Map4.js', lookFor: 'Map4' },
        { src: 'js/Map5.js', lookFor: 'Map5' },
        { src: 'js/GameLevel1.js', lookFor: 'GLevel1' },
        { src: 'js/Arrays.js', lookFor: 'Arrays'},
        { src: 'js/PlayerData.js', lookFor: 'PlayerData'},
        { src: 'js/WarriorData.js', lookFor: 'WarriorData'},
        { src: 'js/QuestInterface.js', lookFor: 'QuestInterface'},
        { src: 'js/Quest1.js', lookFor: 'Quest1'},
        { src: 'js/Quest2.js', lookFor: 'Quest2'},
        { src: 'js/Quest3.js', lookFor: 'Quest3'},
        { src: 'js/Quest4.js', lookFor: 'Quest4'},
        { src: 'js/Quest5.js', lookFor: 'Quest5'},
        { src: 'js/Player.js', lookFor: 'Player'},
        { src: 'js/SkillShowcase.js', lookFor: 'SkillShowcase'},
        { src: 'js/Skill.js', lookFor: 'Skill'},
        { src: 'js/SkillUI.js', lookFor: 'SkillUI'},
        { src: 'js/QuestUI.js', lookFor: 'QuestUI'},
        { src: 'js/BlackHole.js', lookFor: 'BlackHole'},
        { src: 'js/BasicAttack.js', lookFor: 'BasicAttack'},
        { src: 'js/VCut.js', lookFor: 'VCut'},
        { src: 'js/BurstCut.js', lookFor: 'BurstCut'},
        { src: 'js/CrossCut.js', lookFor: 'CrossCut'},
        { src: 'js/SwordLight.js', lookFor: 'SwordLight'},
        { src: 'js/Light.js', lookFor: 'Light'},
        { src: 'js/MicroShield.js', lookFor: 'MicroShield'},
        { src: 'js/DarkForce.js', lookFor: 'DarkForce'},
        { src: 'js/FrozenSword.js', lookFor: 'FrozenSword'},
        { src: 'js/HeroSlash.js', lookFor: 'HeroSlash'},
        { src: 'js/PotentialPower.js', lookFor: 'PotentialPower'},
        { src: 'js/Teleport.js', lookFor: 'Teleport'},
        { src: 'js/Thunder.js', lookFor: 'Thunder'},
        { src: 'js/BlackBall.js', lookFor: 'BlackBall'},
        { src: 'js/FireBall.js', lookFor: 'FireBall'},
        { src: 'js/Boomerang.js', lookFor: 'Boomerang'},
        { src: 'js/FireStrike.js', lookFor: 'FireStrike'},
        { src: 'js/Frostbolt.js', lookFor: 'Frostbolt'},
        { src: 'js/Bag.js', lookFor: 'Bag'},
        { src: 'js/Monster.js', lookFor:'Monster'},
        { src: 'js/Dragonfly.js', lookFor: 'Dragonfly'},
        { src: 'js/Ant.js', lookFor: 'Ant'},
        { src: 'js/Spider.js', lookFor: 'Spider'},
        { src: 'js/Calavera.js', lookFor: 'Calavera'},
        { src: 'js/Devil.js', lookFor: 'Devil'},
        { src: 'js/Defender.js', lookFor: 'Defender'},
        { src: 'js/Boss.js', lookFor: 'Boss'},
        { src: 'js/Property.js', lookFor: 'Property'},
        { src: 'js/QuestItem.js', lookFor: 'QuestItem'},
        { src: 'js/Cluster.js', lookFor: 'Cluster'},
        { src: 'js/Medicine.js', lookFor: 'Medicine'},
        { src: 'js/TreasureChest.js', lookFor: 'TreasureChest'},
        { src: 'js/RainDrop.js', lookFor: 'RainDrop'},
        { src: 'js/IceBall.js', lookFor: 'IceBall'},
        { src: 'js/MainGame.js'}

    ]
    importJS(listScript);
})();