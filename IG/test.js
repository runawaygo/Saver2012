goog.provide('IG.Test');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.KeyframeAnimation');



IG.Test = function(player){
	lime.Sprite.call(this);
	this.setSize(100,100);
	
	this.RADIUS = 20;
    this.SPEED = .45;

	this.status = 0;
	this.data = player;

	this.setSize(100, 100);
    this.setAnchorPoint(.5, .5);
  
	var frameAnimation =  new lime.animation.KeyframeAnimation();
	var base = 120001;
	
	for(i=0;i<34;i++)
	{	
		base+=i;
		frameAnimation.addFrame(new lime.fill.Frame('asserts/soul/Untitled-'+ base +'.png',0,0,349,435));
		
	}
		
	frameAnimation.setLooping(true);
	frameAnimation.addTarget(this);

	frameAnimation.play();
	
	goog.events.listen(this,['mousedown','touchstart'],function(e){
		console.log('mouse down');
	});
	
	// this.appendChild(carNode);
	// this.appendChild(headshotNode);
};

goog.inherits(IG.Test, lime.Sprite);
