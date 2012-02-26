goog.provide('IG.Bomb');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

IG.Bomb = function(player){
	lime.Sprite.call(this);
	this.data= player;
	var headshot = new lime.Circle().setSize(100,100);
	var headshotImg = new lime.fill.Frame('asserts/1.jpeg',0,0,180,180);
	headshot.setFill(headshotImg);
	this.appendChild(headshot);
};

goog.inherits(IG.Bomb, lime.Sprite);