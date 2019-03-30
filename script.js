var screenSize = 400;

var screenPosTop = 100;
var screenPosLeft = 100;

var posBallTop = 400;
var posBallLeft = 175;

var ballMoveTop = 1;
var ballMoveLeft = 1;

window.onload = function (){
	console.log("Hello !");
	window.setInterval(moveBall, 10);
}

function moveBall(){
	if(posBallTop - screenPosTop + 10 >= screenSize 
		|| posBallTop - screenPosTop <= 0){
		ballMoveTop = -ballMoveTop;
	}
	
	if(posBallLeft - screenPosLeft + 10 >= screenSize
		|| posBallLeft - screenPosLeft <= 0){
		ballMoveLeft = -ballMoveLeft;
	}
	posBallTop += ballMoveTop;
	posBallLeft += ballMoveLeft;
	window.document.getElementById("ball").style.top = posBallTop + "px";
	window.document.getElementById("ball").style.left = posBallLeft + "px";
}
