goog.provide('IG.Light');

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
goog.require('lime.ASSETS.ground.plist')
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence')
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateBy');

IG.Light = function(x, y){
	lime.Sprite.call(this);
	
	this.setPosition(x, y);
	this.setSize(550, 400);
	this.setAnchorPoint(.5, 1);
	this.init();
};

goog.inherits(IG.Light, lime.Sprite);

IG.Light.prototype.init = function()
{
	var frames = new lime.SpriteSheet('asserts/light.png', lime.ASSETS.light.plist);
	this.setFill(frames.getFrame('9.png'));

	var anim = this.anim = new lime.animation.KeyframeAnimation();
	anim.delay = 1/11;
	anim.looping = false;
	for(var i=1;i<=9;i++){
	   anim.addFrame(frames.getFrame(i + '.png'));
	}
	this.runAction(anim);
}

IG.Light.prototype.play = function()
{
	this.runAction(this.anim);
};