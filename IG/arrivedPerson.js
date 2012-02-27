goog.provide('IG.Arrived');

goog.require('lime.Sprite');
goog.require('lime.Circle');
goog.require('lime.Label');

goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');


IG.Arrived = function(player){
	lime.Sprite.call(this);
	this.setSize(55,55);
	this.data = player;
	
	var headshot = this.headshot = new lime.Circle().setSize(55,55);
	var headshotImg = new lime.fill.Frame(player.profile_image_url, 0, 0, 180, 180);
	headshot.setFill(headshotImg).setStroke('3',0,128,128,0.4);
	
	var action = new lime.animation.Loop(new lime.animation.Sequence(
		new lime.animation.MoveBy(0,4)
		,new lime.animation.MoveBy(0,-4)
	));
	
	action.addTarget(headshot);
	action.play();
	
	var label = this.label = new lime.Label()
		.setPosition('auto',20)
		.setSize(120,26)
		.setText(Math.random()>0.5?'我勒个去!':'Help!')
		.setFontColor('#7400b6')
		.setFontSize(26)
		.setFontWeight('bold')
		.setOpacity(0);
		
	goog.events.listen(this,['mousedown','touchstart'],function(e){
		this.die();
	});
	
	lime.scheduleManager.callAfter(this,function(){alert("superwolf")},100);
	
	this.appendChild(headshot);
	this.appendChild(label);
};


goog.inherits(IG.Arrived, lime.Sprite);


IG.Arrived.prototype.die = function(){

	this.runAction(new lime.animation.MoveTo(100,-350).setDuration(1.3));
	this.headshot.runAction(
		new lime.animation.Sequence(
			new lime.animation.Delay(2.3)
			,new lime.animation.Spawn(	
				new lime.animation.FadeTo(0).setDuration(1)
				,new lime.animation.MoveBy(0,80).setDuration(0.3)
			)
		)
	);
	this.label.runAction(
		new lime.animation.Sequence(
			new lime.animation.Delay(3.3)
			,new lime.animation.FadeTo(1).setDuration(1)
			,new lime.animation.FadeTo(0)
		)
	);
	
}