goog.provide('IG.Idol');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('IG.Person');



IG.Idol = function(player){
	IG.Person.call(this, player);
	
	this.words = ["大家都来关注我啊", "我麾下6万粉丝啊", "下辈子一定关注你啊"];
	this.dieWords = ["让你不关注我","安息吧"];

	this.say();
	this.headshot.setSize(50, 50).setStroke(4,0,128,128,0.8);

	this.lightY = 105;
	this.groundY = 60;
	goog.events.listen(this, ['mousedown', 'touchstart'], this.light);
};

goog.inherits(IG.Idol, IG.Person);


IG.Idol.prototype.initBody = function()
{
	var bodyImg = new lime.fill.Frame("asserts/car" + (Math.random()*4>>0) + ".png", 0, 0, 350, 256);
	this.body.setFill(bodyImg).setSize(100,100).setPosition(0, 25);

	this.appendChild(this.body);
};

IG.Idol.prototype.initAnimation = function()
{
	var headshotSequence = new lime.animation.Sequence(
		new lime.animation.RotateBy(8).setDuration(0.6)
		,new lime.animation.RotateBy(-8).setDuration(0.6)
	);
	var headshotLoop = new lime.animation.Loop(headshotSequence);
	headshotLoop.addTarget(this.headshot);
	headshotLoop.play();
	
	var bodySequence = new lime.animation.Sequence(
		new lime.animation.RotateBy(8).setDuration(0.6)
		,new lime.animation.RotateBy(-8).setDuration(0.6)
	);
	var actionLoop = new lime.animation.Loop(bodySequence);
	actionLoop.addTarget(this.body)
	actionLoop.play();
};


IG.Person.prototype.light = function()
{
	this.runAction(new lime.animation.FadeTo(0).setDuration(.5));
	
	
	var light = new IG.Light(0, this.lightY);
	this.appendChild(light);
	this.die();
};