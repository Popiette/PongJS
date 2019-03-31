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
	window.setInterval(moveBall, 10);
}

function moveBall(){
	collisions();
	ball.move();
	window.document.getElementById("ball").style.top = ball.posTop + "px";
	window.document.getElementById("ball").style.left = ball.posLeft + "px";
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
