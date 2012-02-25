goog.provide("IG.Person");

goog.require('lime.Circle');
goog.require('lime.Sprite');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence')
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateBy');



IG.Person = function(player){
	lime.Sprite.call(this);
	this.setSize(100, 100);
    this.setAnchorPoint(.5, .5);

	var car = new lime.fill.Frame('asserts/car.png',20,40,90,90);
	var carNode = new lime.Sprite().setSize(100,100).setFill(car).setPosition(50,70).setRotation(-5);
	
	var headshot = new lime.fill.Frame(player.profile_image_url,0,0,180,180);
	var headshotNode = new lime.Circle().setSize(50,50).setStroke(4,0,128,128,0.6).setFill(headshot).setPosition(30,40).setOpacity(0.9);
	
	lime.scheduleManager.schedule(this.move, this);
	
	var headshotSequence = new lime.animation.Sequence(
		new lime.animation.MoveBy(6,0).setDuration(0.6)
		,new lime.animation.MoveBy(-6,0).setDuration(0.6)
	);
	var headshotLoop = new lime.animation.Loop(headshotSequence);
	headshotLoop.addTarget(headshotNode);
	headshotLoop.play();
	
	var carSequence = new lime.animation.Sequence(
		new lime.animation.RotateBy(8).setDuration(0.6)
		,new lime.animation.RotateBy(-8).setDuration(0.6)
	);
	var actionLoop = new lime.animation.Loop(carSequence);
	actionLoop.addTarget(carNode)
	actionLoop.play();
	

	this.appendChild(carNode);
	this.appendChild(headshotNode);
	
};

goog.inherits(IG.Person, lime.Sprite);

IG.Person.prototype.move = function(dt){
	
};



