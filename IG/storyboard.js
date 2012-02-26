goog.provide('IG.ScoreBoard');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

IG.ScoreBoard = function(){
	lime.Sprite.call(this);
	this.init();
};

goog.inherits(IG.ScoreBoard, lime.Sprite);

IG.ScoreBoard.prototype.init = function()
{
	var jifenImg = new lime.fill.Frame("asserts/jifen.png", 0, 0, 286, 68);
	this.score = new lime.Sprite().setFill(jifenImg).setSize(286,68).setPosition(0, 25);

	var jishuImg = new lime.fill.Frame("asserts/jishu.png", 0, 0, 257, 63);
	this.num = new lime.Sprite().setFill(jishuImg).setSize(257,63).setPosition(0, 25);

	this.initNum(0);
	this.initScore(0);

	this.num.setPosition(100, 300);
	this.score.setPosition(100, -300);
}

IG.ScoreBoard.prototype.initNum = function(num)
{
	this.numText = new lime.Label();
	this.numText.setText(num).setFontSize(48).setFontColor('#e92a2a').setAlign('left').
		setPosition(33, 0).setAnchorPoint(0, .5);
	this.num.appendChild(this.numText);
	this.appendChild(this.num);
};

IG.ScoreBoard.prototype.initScore = function(num)
{
	this.scoreText = new lime.Label();
	this.scoreText.setText(num).setFontSize(48).setFontColor('#76008f').setAlign('left').
		setPosition(30, 0).setAnchorPoint(0, .5);;
	this.score.appendChild(this.scoreText);
	this.appendChild(this.score);
};

IG.ScoreBoard.prototype.setNum = function(num)
{
	num = num>999?999:num;
	this.numText.setText(num);
};

IG.ScoreBoard.prototype.setScore = function(num)
{
	num = num>999?999:num;
	this.scoreText.setText(num);
};