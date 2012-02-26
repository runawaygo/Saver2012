goog.provide('IG.GameState');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

IG.GameState = function(){
	lime.Sprite.call(this);
	this.init();
};

goog.inherits(IG.GameState, lime.Sprite);

IG.GameState.prototype.init = function()
{
	var startImg = new lime.fill.Frame("asserts/start.jpg", 0, 0, 1440, 900);
	this.start = new lime.Sprite().setFill(startImg).setSize(1440, 900).setPosition(720,450);

	var endImg = new lime.fill.Frame("asserts/end.jpg", 0, 0, 1440, 900);
	this.end = new lime.Sprite().setFill(endImg).setSize(1440 , 900).setPosition(720,450);

	this.initStart(0);
	this.initEnd(0);
}

IG.GameState.prototype.initStart = function(num)
{
	this.appendChild(this.start);
};

IG.GameState.prototype.initEnd = function(num)
{
	this.appendChild(this.end);
};

IG.GameState.prototype.end = function()
{
	
};

IG.GameState.prototype.start = function()
{
	
};