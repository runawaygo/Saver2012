goog.provide("IG.Person");


goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');

goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.SpriteSheet');
goog.require('lime.ASSETS.walk.plist')
goog.require('lime.ASSETS.light.plist')
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence')
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateBy');


IG.Person = function(player){
	lime.Sprite.call(this);
	this.RADIUS = 20;
    this.SPEED = .15;

	this.status = 0;
	this.data = player;

	this.setSize(100, 100);
    this.setAnchorPoint(.5, .5);
	
	this.labelWrapper = new lime.RoundedRect();
	this.label = new lime.Label();
	this.player = player;
	this.headshot = new lime.Circle()
	this.body = new lime.Sprite();
		
	this.alive = true;

	this.words = ["请不要叫我屌丝", "啊！僵尸粉！"]
	this.dieWords = ["安息吧"];

	this.init(player);


	this.say();

	this.lightY = 125;
	this.groundY = 90;

};

goog.inherits(IG.Person, lime.Sprite);


IG.Person.prototype.startMove = function()
{
	this.labelWrapper.runAction(new lime.animation.FadeTo(0));
	lime.scheduleManager.callAfter(function(){
		lime.scheduleManager.schedule(this.move, this);
	},this,1000);
	this.status = 1;
};

IG.Person.prototype.endMove = function(){
	lime.scheduleManager.unschedule(this.move,this);
	this.status = 2;
	
}

IG.Person.prototype.move = function(dt){
	var position  = this.getPosition();
	this.setPosition(position.x - this.SPEED * dt,this.getPosition().y);
};

IG.Person.prototype.init = function(player)
{
	this.initBody();
	this.initHeadshot(player);
	this.initLabel();
	this.initAnimation();
};

IG.Person.prototype.initHeadshot = function(player)
{
	var headshotImg = new lime.fill.Frame(player.profile_image_url, 0, 0, 50, 50);
	this.headshot.setFill(headshotImg).setSize(50,50).setPosition(3, -10).setStroke(4,"#23a400");

	this.appendChild(this.headshot);
};

IG.Person.prototype.initBody = function()
{
	var frames = new lime.SpriteSheet('asserts/walk.png', lime.ASSETS.walk.plist);
	this.body.setSize(45, 60).setPosition(4, 4).setRotation(-4).setFill(frames.getFrame('1.png'));

	var anim = new lime.animation.KeyframeAnimation();
	anim.delay = 1/6;
	for(var i=1;i<=3;i++){
	   anim.addFrame(frames.getFrame(i + '.png'));
	}
	this.body.runAction(anim);

	this.appendChild(this.body);
};

IG.Person.prototype.initLabel = function()
{
	this.labelWrapper.setPosition(0,-60).setStroke(3,'#ceb368').setFill('#ffe498')
			.setSize(150,30);
		this.label.setText("").setFontSize(16).setFontColor('#bc7100').setAlign('center');
	this.labelWrapper.appendChild(this.label);
	this.appendChild(this.labelWrapper);
};

IG.Person.prototype.initAnimation = function()
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
	//actionLoop.addTarget(this.body)
	//actionLoop.play();	
};


IG.Person.prototype.say = function()
{
	var words = this.alive?this.words:this.dieWords; 
	var n = (Math.random()*words.length) >>0;
	this.label.setText(words[n]);
};

IG.Person.prototype.die = function()
{
	if(this.onDie) this.onDie();
	this.alive = false;
	var anim = new lime.animation.FadeTo(0).setDuration(.4);
	var ground = new IG.Ground(0, this.groundY);
	this.appendChild(ground);
	this.runAction(anim);
}





