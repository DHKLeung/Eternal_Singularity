(function(window){
    var define ={}, mainPath = '';
    Object.defineProperties(define, {
	    'mainPath': {
	      value: mainPath,
		  writable: false
	    },
	    'jsPath': {
		  value: mainPath + 'js/',
		  writable: false
	    },
	    'musicPath': {
		  value: mainPath + 'music/',
		  writable: false
	    },
	    'imagePath': {
		  value: mainPath + 'image/',
		  writable: false
	    },
	    'imagePathStartPage': {
		  value: mainPath + 'image/StartPage/',
		  writable: false
	    },
	    'imagePathEffect': {
		  value: mainPath + 'image/Effect/',
		  writable: false
	    },
	    'imagePathMonster': {
		  value: mainPath + 'image/Monster/',
		  writable: false
	    },
	    'imagePathMap': {
		  value: mainPath + 'image/MapPicture/',
		  writable: false
	    },
	    'imagePathCanvas': {
		  value: mainPath + 'image/canvas/',
		  writable: false
	    },
	    'imagePathCharacter': {
		  value: mainPath + 'image/Character/',
		  writable: false
	    },
	    'imagePathByTeacher': {
		  value: mainPath + 'image/byTeacher/',
		  writable: false
	    },
	    'imagePathItem': {
		  value: mainPath + 'image/item/',
		  writable: false
	    }
    });
    window.define = define;
})(window)