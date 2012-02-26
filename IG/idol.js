goog.provide('IG.Idol');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');



IG.Idol = function(player){
	lime.Sprite.call(this);
	this.RADIUS = 20;
    this.SPEED = .45;

	this.status = 0;
	this.data = player;

	this.setSize(100, 100);
    this.setAnchorPoint(.5, .5);

	var car = new lime.fill.Frame('asserts/car.png',20,40,90,90);
	var carNode = new lime.Sprite().setSize(100,100).setFill(car).setPosition(0,20).setRotation(-5);
	
	var headshot = new lime.fill.Frame(player.profile_image_url,0,0,180,180);
	var headshotNode = new lime.Circle().setSize(50,50).setStroke(4,0,128,128,0.6).setFill(headshot).setPosition(-20,-10).setOpacity(0.9);
		
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
	
	goog.events.listen(this,['mousedown','touchstart'],function(e){
		alert('shit');
		
		console.log('mouse down');
	});
	
	
	this.appendChild(carNode);
	this.appendChild(headshotNode);
};

goog.inherits(IG.Idol, lime.Sprite);


IG.Idol.prototype.startMove = function()
{
	lime.scheduleManager.schedule(this.move, this);
	this.status = 1;
};

IG.Idol.prototype.endMove = function(){
	lime.scheduleManager.unschedule(this.move,this);
	this.status = 2;
	
}

IG.Idol.prototype.move = function(dt){
	var position  = this.getPosition();
	this.setPosition(position.x - this.SPEED * dt,this.getPosition().y);
};