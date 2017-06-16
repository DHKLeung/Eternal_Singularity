Framework.Game.fps = 60;
Framework.Game.canvasWidth = 1600;
Framework.Game.canvasHeight = 900;

Framework.Game.addNewLevel({menu: new MyMenu()});
Framework.Game.addNewLevel({gameLevel1: new GLevel1()});
Framework.Game.addNewLevel({skillShowcase: new SkillShowcase()});
Framework.Game.start();