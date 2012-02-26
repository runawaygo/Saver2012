goog.provide('IG.Soul');

goog.require('lime.Circle');
goog.require('lime.fill.Frame');
goog.require('lime.Label');

goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

IG.Soul = function(){
	lime.Sprite.call(this);
 	this.SPEED = .15;
	this.status = 0;
	this.setSize(100,100);
	
	var headshot = this.headshot = new lime.Circle()
		.setSize(88,100)
		.setStroke('6',0,128,128,0.4);

	var headshotImg = new lime.fill.Frame('asserts/1.jpeg',0,0,180,180);
	headshot.setFill(headshotImg);
	
	
		
	var actionSequence = new lime.animation.Sequence(
		new lime.animation.MoveBy(20,0)
		,new lime.animation.MoveBy(-20,0)
	);
	
	var actionLoop = new lime.animation.Loop(actionSequence);
	
	actionLoop.addTarget(headshot);
	actionLoop.play();

	var soulEffect = new lime.Sprite().setSize(150,150);	
	
	var scoreLabel = new lime.Label();
	scoreLabel.setText('+100').setFontColor('#7400b6').setFontSize(26).setFontWeight('bold');
	
	this.appendChild(scoreLabel);
	this.appendChild(soulEffect);
	this.appendChild(headshot);

	goog.events.listen(this,['mousedown','touchstart'],function(e){
		actionLoop.stop();
		this.endMove();
		
		var frameAnimation =  new lime.animation.KeyframeAnimation();
		var base = 120001;

		for(i=0;i<34;i++)
		{	
			base+=i;
			frameAnimation.addFrame(new lime.fill.Frame('asserts/soul/Untitled-'+ base +'.png',0,0,349,435));
		}
		
		frameAnimation.setLooping(false);
		frameAnimation.addTarget(soulEffect);

		frameAnimation.play();
		
		headshot.runAction(new lime.animation.Spawn(
		            new lime.animation.FadeTo(0).setDuration(.5),
		            new lime.animation.ScaleTo(2).setDuration(0.7)
		        ).setEasing(lime.animation.Easing.EASEOUT));
		
		scoreLabel.runAction(new lime.animation.Spawn(
		            new lime.animation.FadeTo(0).setDuration(1.5),
		            new lime.animation.ScaleTo(2).setDuration(1.7),
			new lime.animation.MoveBy(0,-20).setDuration(2)
		        ).setEasing(lime.animation.Easing.EASEOUT));
	});

};


goog.inherits(IG.Soul, lime.Sprite);

IG.Soul.prototype.startMove = function()
{
	lime.scheduleManager.schedule(this.move, this);
	this.status = 1;
};

IG.Soul.prototype.endMove = function(){
	lime.scheduleManager.unschedule(this.move,this);
	this.status = 2;
	
}

IG.Soul.prototype.move = function(dt){
	var position  = this.getPosition();
	this.setPosition(position.x, position.y - this.SPEED * dt);
};