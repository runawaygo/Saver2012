//set main namespace
goog.provide('IG');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

goog.require('IG.Light');
goog.require('IG.Ground');

goog.require('IG.GameState');
goog.require('IG.EndState');
goog.require('IG.ScoreBoard');


goog.require('IG.Person');
goog.require('IG.Idol');
goog.require('IG.Data');
goog.require('IG.Bomb');
goog.require('IG.Arrived');
goog.require('IG.Soul');
goog.require('IG.Test');
goog.require('lime.audio.Audio');


IG.start = function(data){
	var friendCollection = data.friends.concat([]);
	var idoleCollection = data.idoles.concat([])
	var bombCollection = data.bombs.concat([])
	
	
	var g_width  = 1440;
	var g_height = 900;
	
	var director = new lime.Director(document.body,g_width,g_height);
	var scene = new lime.Scene();
	var startScene = new lime.Scene();
	var endScene = new lime.Scene();
	var target = new lime.Layer().setPosition(g_width/2,g_height/2);
	var topLayer = new lime.Layer().setPosition(g_width/2,g_height/2).setSize(g_width,g_height);
	
	

	
	// var startTarget = new lime.GameStart
	
	director.backgroundSound = new lime.audio.Audio('asserts/volum/back.mp3');
	
	director.backgroundSound.stop();
	director.backgroundSound.play();
	// backgournd

	var backgroundImg = new lime.fill.Frame('asserts/background.jpg',0,0,1440,900);
	var backgroundSprite = new lime.Sprite().setFill(backgroundImg).setSize(g_width,g_height);
	target.appendChild(backgroundSprite);
	
	scene.appendChild(target);
	var target2 = new lime.Layer().setPosition(g_width/2,g_height/2);	
	
	//dies
	this.deadPersons = [];
	
	// friends
	this.persons = [];

	
	var getRandomPoint = function(){
		var rX = Math.random();
		var rY = Math.random();
		var x = (g_width-150) * (rX - 0.5) + 150;
		var y = g_height*(rY - 0.5);
		return {x:x,y:y};
	}
	
	// bomb
	this.bombs= [];

	
	// idols
	this.idols = [];
	
	lime.scheduleManager.scheduleWithDelay(function(){
		var r  = Math.random();
		if(r<0.2)
		{
			if(idoleCollection.length == 0) idoleCollection = data.idoles.concat([]);
			
			var idol = new IG.Idol(idoleCollection.shift());
			var _self = this;		

			idol.onDie = function(){
				_self.deadPersons.unshift(idol.data);
				lime.scheduleManager.callAfter(function(){
					var soul = IG.createSoul(idol.data,this.getPosition());
					target2.appendChild(soul);
				},this,500);
			};

			var r = Math.random();
			idol.setPosition((g_width - 100)/2, g_height*(r - 0.5));

			idol.startMove();
			this.idols.unshift(idol);
			target2.appendChild(idol);
		}
		else if(r<0.5)
		{
			if(bombCollection.length == 0) bombCollection = data.bombs.concat([]);
			var bomb = new IG.Bomb(bombCollection.shift());
			bomb.setPosition(getRandomPoint());
			
			goog.events.listen(bomb, ['touchstart', 'mousedown'], function(e){
				bomb.die();
				lime.scheduleManager.callAfter(function(){
					var soul = IG.createSoul(bomb.data,bomb.getPosition());
					target2.appendChild(soul);
				},this,500);
			});
			
			this.bombs.unshift(bomb);
			target2.appendChild(bomb);
		}
		else
		{
			if(friendCollection.length == 0) friendCollection = data.friends.concat([]);
			var person = new IG.Person(friendCollection.shift());
			var r = Math.random();
			person.setPosition((g_width - 100)/2, g_height*(r - 0.5));
			person.startMove();
			this.persons.unshift(person);
			target2.appendChild(person);
		}
		
	},this,1000);
		
	// boat
	this.onBoatPersons = [];
	var b_width = 150;

	var boat=new lime.Sprite().setSize(b_width,g_height).setPosition(-g_width/2+b_width/2,0);
	target2.appendChild(boat);
	
	// endScene.endAudio = new lime.audio.Audio("/asserts/bomb/end.mp3");
	window.xxx = function(){
		// endScene.endAudio.stop();
		// endScene.endAudio.play();
		
		director.replaceScene(endScene);
		
	};
	
	this.victory = function(){
		this.scoreBoard = new IG.EndState();
		topLayer.appendChild(this.scoreBoard);
	
		
	};
	
	// this.victory();
	this.arrived = function(player){
		var vPlayer = new IG.Arrived(player);
		var count = this.onBoatPersons.length;
		
		console.log(count);
		
		
		console.log(count);
		
		if(count > 5) 
			this.victory();
		this.onBoatPersons.unshift(vPlayer);
		var position = vPlayer.getPosition();
		if(count < 9)
			vPlayer.setPosition(position.x - b_width/4, 140 + count * 75 - g_height/2+35);
		else
			vPlayer.setPosition(position.x + b_width/4, 300 + (count - 9) * 75 - g_height/2+35);
		boat.appendChild(vPlayer);
	}
	

	this.idolArrived = function(player){
		for(i=0;i<3;i++){
			var person = this.onBoatPersons.shift();
			if(person === undefined) return;
			person.die();
			this.deadPersons.unshift(person.data);
		}
	}
	
	lime.scheduleManager.schedule(function(dt){
		for(i=this.idols.length-1;i>=0;i--)
		{
			var idol = this.idols[i];
			var position=idol.getPosition();
			var x=-g_width/2+150;
			if(idol.status==2) continue;
			
			if(x>position.x)
			{
				idol.endMove();
				idol.removeDomElement();
				idol.setOpacity(0);
				this.idolArrived(idol.data);
			}
		}

		for(i=0;i<this.persons.length;i++){
			var currentPerson = this.persons[i];
			
			var position = currentPerson.getPosition();
			var x = -g_width/2 + 150;
	
			if(currentPerson.status == 2) continue;
			
			if(x>position.x){
				currentPerson.endMove();	
				currentPerson.setOpacity(0);
				this.arrived(currentPerson.data);
			}
			for(j=this.bombs.length-1;j>=0;j--){
				if(!this.bombs[j]) continue;
				var bomb = this.bombs[j];
				
				var bombPosition = this.bombs[j].getPosition();
				var xDelta = position.x - bombPosition.x;
				var yDelta = position.y - bombPosition.y;
				var distance = Math.sqrt(xDelta*xDelta + yDelta*yDelta);
				if(distance<50){
					currentPerson.endMove();
					currentPerson.setOpacity(0);
					currentPerson.removeDomElement();
					bomb.die();
					this.bombs[j] = undefined;
					
					this.deadPersons.unshift(bomb.data);
					
					lime.scheduleManager.callAfter(function(){
						var soul = IG.createSoul(currentPerson.data,position);
						target2.appendChild(soul);
					},this,500);
					break;
				}
			}
		}
	},this);
	
	
	//director
	var gameState = new IG.GameState();
	startScene.appendChild(gameState.start);
	//gameState.start.startAudio = new lime.audio.Audio('asserts/bomb/start.mp3');
	endScene.appendChild(gameState.end);
	
	goog.events.listen(gameState.start, ['touchstart', 'mousedown'], function(e){
		
		director.replaceScene(scene);
	});
	
	

	
	scene.appendChild(target2);
	scene.appendChild(topLayer);
	director.makeMobileWebAppCapable();
	director.replaceScene(startScene);
}



//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('IG.start', IG.start);

IG.createSoul = function(player,position){
	var soul = new IG.Soul(player);
	var r = Math.random();
	soul.setPosition(position);
	soul.startMove();
	return soul;
};

IG.beginScene = function(){
	
};

IG.endScene = function(){
	
};


