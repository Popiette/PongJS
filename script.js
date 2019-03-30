class Ball{

	constructor(posTop, posLeft, size, moveTop, moveLeft){
		this.posTop = posTop;
		this.posLeft = posLeft;
		this.size = size;
		this.moveTop = moveTop;
		this.moveLeft = moveLeft;
	}

	move(){
		console.log("moveTop : " + this.moveTop + " et moveLeft : " + this.moveLeft);
		this.posTop += this.moveTop;
		this.posLeft += this.moveLeft;
	}
}

var screenSize = 400;

var screenPosTop = 100;
var screenPosLeft = 100;

var ball = new Ball(400, 175, 10, 1, 1);

window.onload = function (){
	console.log("Hello !");
	window.setInterval(moveBall, 10);
}

function moveBall(){
	if(ball.posTop - screenPosTop + ball.size >= screenSize 
		|| ball.posTop - screenPosTop <= 0){
		ball.moveTop = - ball.moveTop;
	}
	
	if(ball.posLeft - screenPosLeft + ball.size >= screenSize
		|| ball.posLeft - screenPosLeft <= 0){
		ball.moveLeft = - ball.moveLeft;
	}
	ball.move();
	window.document.getElementById("ball").style.top = ball.posTop + "px";
	window.document.getElementById("ball").style.left = ball.posLeft + "px";
}
