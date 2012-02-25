//set main namespace
goog.provide('IG');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.fill.Frame');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

goog.require('IG.God');
goog.require('IG.Data');
goog.require('IG.Person');


IG.start = function(){
	var data = new IG.Data().getData();
	var player = data[0];
	
	console.log(player);
	console.log(typeof player.profile_image_url);
	
	
	
	var director = new lime.Director(document.body,1024,768);
	var scene = new lime.Scene();
	var target = new lime.Layer().setPosition(512,384);
	
	var god = new IG.God();
	target.appendChild(god);
	
	
	// var car = new lime.fill.Frame('asserts/car.png',20,40,90,90);
	// var sprite1 = new lime.Circle().setSize(100,100).setFill(car);
	// var headshot = new lime.fill.Frame(player.profile_image_url,0,0,180,180);
	// var sprite2 = new lime.Circle().setSize(50,50).setFill(headshot).setOpacity(0.8);
	// 
	// target.appendChild(sprite2);	
	// target.appendChild(sprite1);
	// 
	// 
	var person = new IG.Person(player);
	target.appendChild(person);
	
	scene.appendChild(target);
	director.makeMobileWebAppCapable();
	director.replaceScene(scene);
	
	// director.setPaused(true);
	
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('IG.start', IG.start);
