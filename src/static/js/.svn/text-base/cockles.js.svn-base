var step = 0;
var canvas = document.getElementById('cocCanvas');
var ctx = canvas.getContext('2d');

//动态获取高度值
var height = 600;
var width = 300;
var rangepx = 10;
var lines = ["rgba(0,222,255, 0.2)", "rgba(157,192,249, 0.2)", "rgba(0,168,255, 0.2)"];

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
    	window.mozRequestAnimationFrame ||
        function( callback ){
        	window.setTimeout(callback, 1000 / 60);
        };
})();

canvas.width = canvas.parentNode.offsetWidth;
canvas.height = canvas.parentNode.offsetHeight;

loop();

function loop(){
	var angle, deltaHeight, deltaHeightRight, averageHeight, i = lines.length;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = lines[0];	

  	step = step + 3;
  	angle = step*Math.PI/180;
  	deltaHeight = Math.sin(angle) * rangepx;
  	deltaHeightRight = Math.cos(angle) * rangepx;
  	averageHeight = 0;
  	
  	ctx.beginPath();
  	ctx.moveTo(0, height + deltaHeight + averageHeight);
  	
  	ctx.bezierCurveTo(width/2, height + 2*deltaHeight, 
  		width /2, height - 2*deltaHeightRight, 
  		width , height + deltaHeightRight+averageHeight);
  		
  	/*ctx.quadraticCurveTo(width/2, height + deltaHeight - rangepx,
  		width , height + deltaHeightRight);*/
  		
//	ctx.lineTo(width, height + deltaHeightRight)
  	ctx.lineTo(width, canvas.height);
  	ctx.lineTo(0, canvas.height);
  	ctx.lineTo(0, height + deltaHeight +　averageHeight);
  	ctx.closePath();
  	ctx.fill();
  	
	requestAnimFrame(loop);
}
