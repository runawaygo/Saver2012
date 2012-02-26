goog.provide('IG.Bomb');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.Sprite');
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

IG.Bomb = function(player){
	lime.Sprite.call(this);
	this.RADIUS = 20;
    this.SPEED = .25;

	this.data= player;
	this.status = 0;
	this.setSize(100, 100);
    this.setAnchorPoint(.5, .5);
	
	this.effectSprite = new lime.Sprite().setSize(150,150);
	
	
	var bomb = this.bomb = new lime.Sprite().setSize(90,100);
	var bombImg = new lime.fill.Frame('asserts/bomber.png',90,0,90,100);
	bomb.setFill(bombImg);
	this.appendChild(bomb);
	
	var headshot = this.headshot = new lime.Circle().setSize(50,50);
	var headshotImg = new lime.fill.Frame(player.profile_image_url, 0, 0, 50, 50);
	headshot.setFill(headshotImg);
	this.appendChild(headshot);
	this.appendChild(this.effectSprite);
};

goog.inherits(IG.Bomb, lime.Sprite);

IG.Bomb.prototype.die = function(){		
	var frameAnimation =  new lime.animation.KeyframeAnimation();
	var base = 90000;

	for(i=0;i<18;i++)
	{	
		base++;
		frameAnimation.addFrame(new lime.fill.Frame('asserts/bomb/Untitled-'+base+'.png',0,0,211,191));
	}
	
	this.headshot.setOpacity(0);
	this.bomb.setOpacity(0);
	
	
	this.runAction(new lime.animation.FadeTo(0));
	
	frameAnimation.setLooping(false);
	frameAnimation.addTarget(this.effectSprite);
	frameAnimation.play();
}