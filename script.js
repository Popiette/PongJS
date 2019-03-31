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

window.onload = function (){
	console.log("Hello !");
	window.addEventListener("keydown", setRacketsMove);
	window.addEventListener("keyup", unsetRacketsMove);
	window.setInterval(moveBall, 10);
}

function setRacketsMove(e){
	console.log("Touche pressée !");
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
}

function unsetRacketsMove(e){
	console.log("Touche relachée !");
	if(e.key == "a" || e.key == "z"){
		racket1.moveTop = 0;
	}
	else if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
		racket2.moveTop = 0;
	}
}

function moveBall(){
	collisions();
	ball.move();
	racket1.move();
	racket2.move();
	window.document.getElementById("ball").style.top = ball.posTop + "px";
	window.document.getElementById("ball").style.left = ball.posLeft + "px";

	window.document.getElementById("player1").style.top = racket1.posTop + "px";
	window.document.getElementById("player2").style.top = racket2.posTop + "px";
	
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
