goog.provide('IG.God');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');



IG.God = function(){
	lime.Sprite.call(this);
	var headshot = new lime.Circle().setSize(100,100);
	var headshotImg = new lime.fill.Frame('asserts/1.jpeg',0,0,180,180);
	headshot.setFill(headshotImg);
	this.appendChild(headshot);
};


goog.inherits(IG.God, lime.Sprite);