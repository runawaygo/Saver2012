goog.provide('IG.EndState');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.Sprite');
goog.require('lime.Button');
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

IG.EndState = function(){
	lime.Sprite.call(this);
	
	this.setPosition(1, 1);
	this.setSize(1440, 900);
	this.init();
};

goog.inherits(IG.EndState, lime.Sprite);

IG.EndState.prototype.init = function()
{
	var backImg = new lime.fill.Frame("asserts/jiyou.png", 0, 0, 1440, 900);
	this.setFill(backImg).setSize(1440,900).setPosition(0, 0);

	var imgOn1 = new lime.fill.Frame("asserts/xiayiguan.png", 0, 0, 157, 46);
	var imgOn2 = new lime.fill.Frame("asserts/chongwan.png", 0, 0, 142, 50);
	var imgDown1 = new lime.fill.Frame("asserts/xiayiguancopy.png", 0, 0, 157, 46);
	var imgDown2 = new lime.fill.Frame("asserts/chongwancopy.png", 0, 0, 142, 50);

	this.buttonNext = new lime.Button(new lime.Sprite().setFill(imgOn1), new lime.Sprite().setFill(imgDown1));
	this.buttonReplay = new lime.Button(new lime.Sprite().setFill(imgOn2), new lime.Sprite().setFill(imgDown2));

	this.buttonNext.setPosition(200, 100);
	this.buttonReplay.setPosition(0, 103);

	this.appendChild(this.buttonNext);
	this.appendChild(this.buttonReplay);

	this.scoreBoard = new IG.ScoreBoard().setPosition(200, 0);
	this.appendChild(this.scoreBoard);


	goog.events.listen(this.buttonReplay, ['click', 'touchstart'], this.replay);
	goog.events.listen(this.buttonNext, ['click', 'touchstart'], this.next);

}

IG.EndState.prototype.replay = function()
{
};

IG.EndState.prototype.next = function()
{
	window.xxx();

};