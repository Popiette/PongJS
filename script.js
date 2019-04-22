class Point{
	constructor(y, x){
		this.x = x;
		this.y = y;
	}
}

class Rectangle{
	
	constructor(posTop, posLeft, height, width, moveTop, moveLeft){
		this.posTop = posTop;
		this.posLeft = posLeft;
		this.height = height;
		this.width = width;
		this.moveTop = moveTop;
		this.moveLeft = moveLeft;
	}

	move(){
		this.posTop += this.moveTop;
		this.posLeft += this.moveLeft;
	}

	getCoordinates(x, y){
		return new Point(this.posTop + y*this.height,
			this.posLeft + x*this.width);
	}

}

var screenSize = 400;

var screenPosTop = 100;
var screenPosLeft = 100;

var ball = new Rectangle(300, 300, 10, 10, 0, 1);
var racket1 = new Rectangle(280, 150, 40, 10, 0, 0);
var racket2 = new Rectangle(280, 450, 40, 10, 0, 0);

var score1 = 0;
var score2 = 0;

var pause = true;
var finished = false;

initPositions();

window.onload = function (){
	console.log("Hello !");
	window.addEventListener("keydown", setRacketsMove);
	window.addEventListener("keyup", unsetRacketsMove);
	window.setInterval(moveBall, 10);
}

function setRacketsMove(e){
	if(e.key == "a"){
		racket1.moveTop = -1;
	}
	else if(e.key == "z"){
		racket1.moveTop = 1;
	}
	else if(e.key == "ArrowLeft"){
		racket2.moveTop = -1;
	}
	else if(e.key == "ArrowRight"){
		racket2.moveTop = 1;
	}
	else if(e.key == "Enter"){
		pause = !pause;
	}
}

function unsetRacketsMove(e){
	if(e.key == "a" || e.key == "z"){
		racket1.moveTop = 0;
	}
	else if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
		racket2.moveTop = 0;
	}
}

function moveBall(){
	if(!pause && !finished){
		collisions();
		ball.move();
		racket1.move();
		racket2.move();
		window.document.getElementById("ball").style.top = ball.posTop + "px";
		window.document.getElementById("ball").style.left = ball.posLeft + "px";

		window.document.getElementById("player1").style.top = racket1.posTop + "px";
		window.document.getElementById("player2").style.top = racket2.posTop + "px";
	}
}

function collisions(){
	var ballPosLeftWidth = ball.posLeft + ball.width;
	var ballPosTopHeight = ball.posTop + ball.height;

	if(ballPosTopHeight >= screenSize + screenPosTop
		|| ball.posTop <= screenPosTop){
		ball.moveTop = - ball.moveTop;
	}
	
	if(ballPosLeftWidth >= screenSize + screenPosTop
		|| ball.posLeft <= screenPosTop){
		ball.moveLeft = - ball.moveLeft;
	}

	if(ball.posLeft == screenPosLeft){
		score2 ++;
		updateScores();
		initPositions();
	}
	if(ballPosLeftWidth == screenPosLeft + screenSize){
		score1 ++;
		updateScores();
		initPositions();
	}

	if(ball.posLeft == racket1.posLeft + racket1.width
		&& ball.posTop >= racket1.posTop - (ball.height - 1)
		&& ball.posTop <= racket1.posTop + racket1.height)
	{
		ball.moveLeft = 1;
		ball.moveTop = racket1.moveTop;
	}
	else if(ballPosLeftWidth == racket2.posLeft
		&& ball.posTop >= racket2.posTop - (ball.height -1)
		&& ball.posTop <= racket2.posTop + racket2.height)
	{
		ball.moveLeft = -1;
		ball.moveTop = racket2.moveTop;
	}
}

function initPositions(){
	ball.posTop = 300;
	ball.posLeft = 300;
	ball.moveTop = 0;
	ball.moveLeft = 1;

	racket1.posTop = 280;
	racket1.posLeft = 150;
	racket1.moveTop = 0;

	racket2.posTop = 280;
	racket2.posLeft = 450;
	racket2.moveTop = 0;

	pause = true;
}

function updateScores(){
	window.document.getElementById("score").innerHTML
			= score1 + " - " + score2;
	if(score1 >= 5){
		printVictory(1);
	}else if(score2 >= 5){
		printVictory(2);	
	}

}

function printVictory(winner){
	finished = true;
	var message = "";
	if(winner == 1){
		message = "<p>Le joueur 1 a gagné !</p>";
	}else{
		message = "<p>Le joueur 2 a gagné !</p>";
	}

	var screen = window.document.getElementById("screen");
	screen.style.backgroundColor = "white";
	screen.innerHTML = message;
}
