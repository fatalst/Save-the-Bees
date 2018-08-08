//points counter
var points = 0;
var totalPoints = 0;
//lives counter
var lives = 5;
//level counter
var level = 1;

//pause button



//points needed to win a level
var levelPoints = 50;
var levelUp = false;

flowerHit = false;
flowerHit2 = false;
flowerHit3 = false;
withBee = false;
deadBee = false;

//updating the points
function updatePoints(){
	document.getElementById("pointCount").innerHTML = points.toString() + " Points";
}

//updating the lives
function updateLives(){
	document.getElementById("liveCount").innerHTML = lives.toString() + " Lives";
}

//updating the levels
function updateLevel(){
	document.getElementById("levelCount").innerHTML = "Level " + level.toString();
}

//write points you had upon death
function updateDeathPoints(){
	document.getElementById("deadPoints").innerHTML = "You had " + totalPoints.toString() + " points.";
}

//level screen changing function (not called yet)
var facts = [
	"About 10 million beehives, worth about &#36;2 billion dollars, have been lost since 2006.",
	"Bees are responsible for about a third of all the food we eat.",
	"Planting lavender, cilantro, poppies, sunflowers, fennel, thyme, and other plants in your yard can help the bees.",
	"Without bees we wouldn't lose just honey - we also wouldn't have foods like avocados, cucumbers, onions, apples, and cherries.",
	"The pesticides that you can buy in supermarkets are around 40 times more toxic than the ones farmers are allowed to use.",
	"Italy, France, and Germany have already banned pesticides on their farms.",
	"Many cosmetics, including lotion, soap, shampoo, and lipstick, use honey as a natural ingredient.",
	"Half the world's diet relies on fat and oil from oilseeds like cotton, coconut, and sunflower, which depend on bee pollination to grow.",
	"Cotton is a huge source of money to the economy and a huge source of fiber for clothing, and needs bees to grow.",
	"Alfalfa is a plant that is used to feed cows and relies on bees to pollinate it.  Without bees, these cows would have no food.",
	"Insecticides can last a very long time in pollen and nectar, which bees need to survive.",
	"Even at non-lethal doses, pesticides can hurt a bee, disrupting it's navigation and make them vulnerable to disease."
];

var i = 0;

function levelPage(){
	document.getElementById("myCanvas").style.display = 'none';
	document.getElementById("pointCount").style.display = 'none';
	document.getElementById("liveCount").style.display = 'none';
	document.getElementById("levelCount").style.display = 'none';
	document.getElementById("pause").style.display = 'none';
	document.getElementById("levelX").style.display = 'block';
	document.getElementById("levelName").innerHTML = "LEVEL " + level.toString() + "<button type='button' class='btn' onclick='location.reload();' style='margin-top: -20px; margin-right: 10px; right: 10px; float: right;'>X</button>";
	document.getElementById("paragraph").innerHTML = facts[i];
	i++;
	if(i === facts.length - 1){
		i = 0;
	}
	document.getElementById("numPoints").innerHTML = "You need " + levelPoints.toString() + " points to beat this level.";
}

//pollen move boolean
var pollenMove = true;

//boolean to make sure you don't lose lives or collect pollen while on menu screen
var playing = false;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Canvas commands go here
function background(){
	var my_gradient=ctx.createLinearGradient(0,0,0,170);
	my_gradient.addColorStop(0,"#C3F0FF");
	my_gradient.addColorStop(1,"#33CCFF");
	ctx.fillStyle=my_gradient;
	ctx.fillRect(0,0,1000,500);
	ctx.fillStyle = "#47A347";
	ctx.fillRect(0,450,1000,500);
	cloud1.drawCloud();
	cloud2.drawCloud();
	cloud3.drawCloud();
}

//cloud object
function Cloud(x, y, id){
	this.x = x;
	this.y = y;
	this.id = id;
	
	this.drawCloud = function(){
		var img = document.getElementById(id);
		ctx.drawImage(img, this.x, this.y);
	}
	
	this.moveCloud = function(speed){
		this.x = this.x - speed;
	}
}

//bee object
function Bee(x, y){
	this.x = x;
	this.y = y;

	this.drawBee = function(id){
		var img = document.getElementById(id);
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.moveBeeUp = function(){
		this.y = this.y - 40;
	}
	
	this.moveBeeDown = function(speed){
		this.y = this.y + speed;
	}
}


//flower object
function Flower(x, y){
	this.x = x;
	this.y = y;

	this.drawFlower = function(id){
		var img = document.getElementById(id);
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.moveFlower = function(){
		this.x = this.x - 4;
	}
}

//bad flower object
function BadFlower(x, y){
	this.x = x;
	this.y = y;

	this.drawBadFlower = function(id){
		var img = document.getElementById(id);
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.moveBadFlower = function(){
		this.x = this.x - 4;
	}
}

//pollen object
function Pollen(x, y){
	this.x = x;
	this.y = y;
	
	this.drawPollen = function(){
		var img = document.getElementById("pollen");
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.movePollen = function(){
		this.x = this.x - 4;
	}
	
	this.movePollenDown = function(){
		this.y = this.y + 4;
	}
	
}

//gas object
function Gas(x, y){
	this.x = x;
	this.y = y;
	
	this.drawGas = function(){
		var img = document.getElementById("gas");
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.moveGas = function(){
		this.x = this.x - 5;
	}
}

var bee = new Bee(10,0);
bee.drawBee('bee');

function checkKey(event){

	//if up arrow is pressed
	if(playing){
		if(!deadBee){
			if(bee.y > 2){
				if (event.keyCode === 38){
					bee.moveBeeUp();
					background();
					pollen.drawPollen();
					gas.drawGas();
					gas2.drawGas();
					if(withBee){
						bee.drawBee('beepollen');
					}
					else{
						bee.drawBee('bee');
					}
					
					if(flowerHit){
						flower.drawFlower('open');
					}
					else{
						flower.drawFlower('closed');
					}
					if(withBee){
						pollen.y = pollen.y - 40;
					}
					if(flowerHit2){
						flower2.drawFlower('open');
					}
					else{
						flower2.drawFlower('closed');
					}
					if(flowerHit3){
						flower3.drawBadFlower('badOpen');
					}
					else{
						flower3.drawBadFlower('badClosed');
					}
				}
			}
		}
	}
	
	//if down arrow is pressed
	/* if(bee.y < 400){
		if (event.keyCode === 40){
			bee.moveBeeDown();
			background();
			pollen.drawPollen();
			gas.drawGas();
			bee.drawBee();
			if(flowerHit){
				flower.drawFlower('open');
			}
			else{
				flower.drawFlower('closed');
			}
			if(!pollenMove){
				pollen.y = pollen.y + 20;
			}
		}
	} */
	
	//if space key is pressed
	if(event.keyCode === 32){
		if(withBee){
			bee.drawBee('bee');
			p = setInterval(function(){pollen.movePollenDown()}, 15);
			withBee = false;
		}
		withBee = false; 
	}
}

//draws all the objects
var pollen = new Pollen(Math.random()*1000+1000, Math.random()*300);
var gas = new Gas(Math.random()*1000+1000, Math.random()*300);
var gas2 = new Gas(Math.random()*1000+1000, Math.random()*300);
var flower = new Flower(Math.random()*1000, 350);
var flower2 = new Flower(Math.random()*200, 350);
var flower3 = new BadFlower(Math.random()*900, 370);
var cloud1 = new Cloud(Math.random()* 200, Math.random()*300, 'cloud1');
var cloud2 = new Cloud(Math.random()* 200 + 400, Math.random()*300, 'cloud2');
var cloud3 = new Cloud(Math.random()* 200 + 600, Math.random()*300, 'cloud3');


//basically the main function
function moveAcross(){
	
	if(!(document.getElementById("myCanvas").style.display == 'none')){
		playing = true;
	}
	
	if(playing){
		if(bee.y + 62 < 600){
			if(deadBee){
				bee.moveBeeDown(5);
			}
			else{
				bee.moveBeeDown(2);
			}
			background();
			pollen.drawPollen();
			if(deadBee){
				bee.drawBee('deadbee');
			}
			else if(withBee){
				bee.drawBee('beepollen');
			}
			else{
				bee.drawBee('bee');
			}
			gas.drawGas();
			gas2.drawGas();
			if(flowerHit){
				flower.drawFlower('open');
			}
			else{
				flower.drawFlower('closed');
			}
			if(!pollenMove && withBee) {
				pollen.y = pollen.y+2;

			}
		}
	}
	
	//if bee falls off screen
	if(playing){
		if(bee.y > 510){
			deadBee = false;
			bee.y = 10;
			p = setInterval(function(){pollen.movePollenDown()}, 15);
			clearInterval(p);
			lives--;
			updateLives();
		}
	}
	
	if(!pollenMove){
		if(bee.y > 510){
			deadBee = false;
			pollenMove: true;
			clearInterval(p);
			pollen.y = Math.random()*300;
			pollen.x = 1100;
			bee.y = 10;
			lives--;
			updateLives();
		}
	}
	
	
	//moves back if it's off the screen
	if(gas.x < -60){
		gas.x = Math.random()*1000+1000;
		gas.y = Math.random()*300;
	}
	
	if(gas2.x < -60){
		gas2.x = Math.random()*1000+1000;
		gas2.y = Math.random()*300;
	} 
	
	if(pollen.x < -60){
		pollen.x = 1100;
		pollen.y =  Math.random()*300;
	}
	
	if(flower.x < - 150){
		flower.x = Math.random()*1500 + 1000;
		flowerHit = false;
		flower.drawFlower('closed');
	}
	
	if(flower2.x < - 150){
		flower2.x = Math.random()*1500 + 1000;
		flowerHit2 = false;
		flower2.drawFlower('closed');
	} 
	
	if(flower3.x < - 150){
		flower3.x = Math.random()*1500 + 1000;
		flowerHit3 = false;
		flower3.drawBadFlower('badClosed');
	} 

	
	if(cloud1.x < -165){
		cloud1.x = 1100;
		cloud1.y = Math.random()*300;
	}
	
	if(cloud2.x < -225){
		cloud2.x = 1100;
		cloud2.y = Math.random()*300;
	}
	
	if(cloud3.x < -300){
		cloud3.x = 1100;
		cloud3.y = Math.random()*300;
	}
	
	if(playing){
		//moves and redraws everything
		flower.moveFlower();
		flower2.moveFlower();
		flower3.moveBadFlower();
		cloud1.moveCloud(1);
		cloud2.moveCloud(1);
		cloud3.moveCloud(1);
		gas.moveGas();
		gas2.moveGas();
		background();
		if(deadBee){
			bee.drawBee('deadbee');
		}
		else if(withBee){
			bee.drawBee('beepollen');
		}
		else{
			bee.drawBee('bee');
		} 
		gas.drawGas();
		gas2.drawGas();
	}
	
	if(flowerHit){
		flower.drawFlower('open');
	}
	else{
		flower.drawFlower('closed');
	}
	
	if(flowerHit2){
		flower2.drawFlower('open');
	}
	else{
		flower2.drawFlower('closed');
	}
	
	if(flowerHit3){
		flower3.drawBadFlower('badOpen');
	}
	else{
		flower3.drawBadFlower('badClosed');
	}
	
	

	
	//moves pollen across the screen
	if(playing){
		if(pollenMove){
			pollen.movePollen();
			pollen.drawPollen();
			withBee = false;
			
		}
		else{
			pollen.drawPollen();
			withBee = false;
		}
	}
	
	//pollen & bee collision
	if(pollen.x > bee.x + 78){
		pollenMove = true;
	}
	
	if(playing){
		if(!deadBee){
			if(pollen.x < bee.x + 78 && ((pollen.y < bee.y + 62)&& (pollen.y + 50 > bee.y))){
				pollenMove = false;
				withBee = true;
			}
		}
	}
	
	//if pollen DOESN'T hit the flower
	if(pollen.y > 450){
		pollen.y = Math.random()*300;
		pollen.x = 1100;
		pollenMove = true;
		clearInterval(p);
	}

	//if pollen DOES hit the flower

	if(!withBee){
		if(pollen.y + 52 > flower.y && ((pollen.x < flower.x + 85) && (pollen.x + 52 > flower.x))){
			pollen.y = Math.random()*300;
			pollen.x = 1100;
			pollenMove = true;
			clearInterval(p);
			points = points + 10;
			totalPoints = totalPoints + 10;
			updatePoints();
			flowerHit = true;
			flower.drawFlower('open');
		} 
	}
	
	//second one
	if(!withBee){
		if(pollen.y + 55 > flower2.y + 5 && ((pollen.x < flower2.x + 100) && (pollen.x + 55 > flower2.x - 5))){
			pollen.y = Math.random()*300;
			pollen.x = 1100;
			pollenMove = true;
			clearInterval(p);
			points = points + 10;
			totalPoints = totalPoints + 10;
			updatePoints();
			flowerHit2 = true;
			flower2.drawFlower('open');
		} 
	}

	
	//bad flower
	if(!withBee){
		if(pollen.y + 55 > flower3.y + 5 && ((pollen.x < flower3.x + 100) && (pollen.x + 55 > flower3.x - 5))){
			pollen.y = Math.random()*300;
			pollen.x = 1100;
			pollenMove = true;
			clearInterval(p);
			points = points - 10;
			totalPoints = totalPoints - 10;
			updatePoints();
			flowerHit3 = true;
			flower3.drawBadFlower('badOpen');
		} 
	}
	
	//gas and bee collision
	if(playing){
		if(gas.x < bee.x + 78 && ((gas.y < bee.y + 62) && (gas.y + 74 > bee.y)) && !pollenMove){
			deadBee = true;
			gas.x = 1100;
			gas.y = Math.random()*300;
			pollen.x = 1100;
			pollenMove = true;
			clearInterval(p);
		}
		else if(gas.x < bee.x + 78 && ((gas.y < bee.y + 62)&& (gas.y + 62 > bee.y)) && pollenMove){
			deadBee = true;
			gas.x = 1100;
			gas.y = Math.random()*300;
			p = setInterval(function(){pollen.movePollenDown()}, 15);
			clearInterval(p);
		}
	}
	
	if(playing){
		if(gas2.x < bee.x + 78 && ((gas2.y < bee.y + 62)&& (gas2.y + 62 > bee.y)) && !pollenMove){
			deadBee = true;
			gas2.x = 1100;
			gas2.y = Math.random()*300;
			pollen.x = 1100;
			pollenMove = true;
			clearInterval(p);
		}
		else if(gas2.x < bee.x + 78 && ((gas2.y < bee.y + 62)&& (gas2.y + 62 > bee.y)) && pollenMove){
			deadBee = true;
			gas2.x = 1100;
			gas2.y = Math.random()*300;
			p = setInterval(function(){pollen.movePollenDown()}, 15);
			clearInterval(p);
		}
	} 

	//level changing
	if(points === levelPoints){
		levelUp = true;
	}
	
	if(levelUp){
		playing = false;
		levelPoints = levelPoints + 50;
		level++;
		updateLevel();
		levelPage();
		points = 0;
		updatePoints();
		levelUp = false;
		bee.y = 10;
		gas.x = 1000;
		gas2.x = 1100;
	}
	
	//end screen
	if(lives === 0){
		document.getElementById("myCanvas").style.display = 'none';
		document.getElementById("pointCount").style.display = 'none';
		document.getElementById("liveCount").style.display = 'none';
		document.getElementById("levelCount").style.display = 'none';
		document.getElementById("pause").style.display = 'none';
		if(totalPoints === 420){
			document.getElementById("seinfeld").style.display = 'block';
		}
		else{
			document.getElementById("dead").style.display = 'block';
			updateDeathPoints();
		}
	}
}

//calls function
setInterval(function(){moveAcross();},15);
