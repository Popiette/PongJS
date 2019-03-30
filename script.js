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

}

var screenSize = 400;

var screenPosTop = 100;
var screenPosLeft = 100;

var ball = new Rectangle(400, 175, 10, 10, 1, 1);
var racket1 = new Rectangle(280, 150, 40, 10, 0, 0);
var racket2 = new Rectangle(280, 450, 40, 10, 0, 0);

window.onload = function (){
	console.log("Hello !");
	window.setInterval(moveBall, 10);
}

function moveBall(){
	if(ball.posTop - screenPosTop + ball.height >= screenSize 
		|| ball.posTop - screenPosTop <= 0){
		ball.moveTop = - ball.moveTop;
	}
	
	if(ball.posLeft - screenPosLeft + ball.width >= screenSize
		|| ball.posLeft - screenPosLeft <= 0){
		ball.moveLeft = - ball.moveLeft;
	}
	ball.move();
	window.document.getElementById("ball").style.top = ball.posTop + "px";
	window.document.getElementById("ball").style.left = ball.posLeft + "px";
}
