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

goog.require('IG.Idol');

goog.require('IG.Data');
goog.require('IG.Bomb');
goog.require('IG.Person');
goog.require('IG.Arrived');
goog.require('IG.Soul');
goog.require('IG.Test');

IG.start = function(){
	var players = new IG.Data().getData();
	var g_width  = 1440;
	var g_height = 900;
	
	var director = new lime.Director(document.body,g_width,g_height);
	var scene = new lime.Scene();
	var target = new lime.Layer().setPosition(g_width/2,g_height/2);
	
	// backgournd

	var backgroundImg = new lime.fill.Frame('asserts/background.jpg',0,0,1440,900);
	var backgroundSprite = new lime.Sprite().setFill(backgroundImg).setSize(g_width,g_height);
	target.appendChild(backgroundSprite);
	
	scene.appendChild(target);
	
	var target2 = new lime.Layer().setPosition(g_width/2,g_height/2);	
	// friends
	this.persons = [];
	for(i=0;i<players.length;i++){
		var person = new IG.Person(players[i]);
		var r = Math.random();
		person.setPosition((g_width - 100)/2, g_height*(r - 0.5));
		person.startMove();
		this.persons.unshift(person);
		target2.appendChild(person);
	}
	
	for(i=0;i<players.length;i++){
		var person = new IG.Person(players[i]);
		var r = Math.random();
		person.setPosition((g_width - 100)/2, g_height*(r - 0.5));
		person.startMove();
		this.persons.unshift(person);
		target2.appendChild(person);
	}
	// for(j=0;j<3;j++)
	for(i=0;i<players.length;i++){
		var person = new IG.Person(players[i]);
		var r = Math.random();
		person.setPosition((g_width - 100)/2, g_height*(r - 0.5));
		person.startMove();
		this.persons.unshift(person);
		target2.appendChild(person);
	}
	
	var getRandomPoint = function(){
		var rX = Math.random();
		var rY = Math.random();
		var x = (g_width-150) * (rX - 0.5) + 150;
		var y = g_height*(rY - 0.5);
		return {x:x,y:y};
	}
	
	// bomb
	this.bombs= [];
	
	for(i=0;i<players.length;i++){
		var bomb = new IG.Bomb();
		bomb.setPosition(getRandomPoint());
		this.bombs.unshift(bomb);
		target2.appendChild(bomb);
	}
	
	
	// idols
	this.idols = [];
	lime.scheduleManager.callAfter(function(){
	for(i=0;i<players.length;i++){
		var idol = new IG.Idol(players[i]);
		var r = Math.random();
		idol.setPosition((g_width - 100)/2, g_height*(r - 0.5));
		
		idol.startMove();
		this.idols.unshift(idol);
		target2.appendChild(idol);
	}
	},this,5000);
	
	// boat

	this.onBoatPersons = [];
	var b_width = 150;

	var boat=new lime.Sprite().setSize(b_width,g_height).setPosition(-g_width/2+b_width/2,0);
	target2.appendChild(boat);
	
	this.arrived = function(player){
		var vPlayer = new IG.Arrived();
		var count = this.onBoatPersons.length;
		
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
		}
	}

	//director

	scene.appendChild(target2);
	director.makeMobileWebAppCapable();
	director.replaceScene(scene);
	
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
			for(j=0;j<this.bombs.length;j++){
				var bomb = this.bombs[j];
				
				var bombPosition = this.bombs[j].getPosition();
				var xDelta = position.x - bombPosition.x;
				var yDelta = position.y - bombPosition.y;
				var distance = Math.sqrt(xDelta*xDelta + yDelta*yDelta);
				if(distance<50){
					currentPerson.endMove();
					currentPerson.setOpacity(0);
					bomb.setOpacity(0);
					
					currentPerson.removeDomElement();
					bomb.removeDomElement();
					
					var soul = IG.createSoul(currentPerson.data,position);
					target2.appendChild(soul);
					break;
				}
			}
		}
	},this);
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

