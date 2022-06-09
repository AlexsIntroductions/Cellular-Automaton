//Gets the canvas
var canvas = document.getElementById("myCanvas");
var smallCanvas = document.getElementById("startCanvas");
//instances 2d on it
var sctx = smallCanvas.getContext("2d");
var ctx = canvas.getContext("2d");


smallCanvas.addEventListener("mousedown", function(e){
	onClick(smallCanvas, e);
});

function onClick(smallCanvas, event){
	let rect = smallCanvas.getBoundingClientRect();
	let x = Math.floor(event.clientX - rect.left);
	let y = Math.floor(event.clientY - rect.top);
	//40 wide, only need top x and left y
	//to get x: x / 40 floor?
	x = Math.floor(x / 40);
	y = Math.floor(y / 40);
	
	sctx.rect(x * 40, y * 40, 40, 40);
	sctx.fill();
	
	console.log(x + ", " + y);
}

//initialize Board parameters
var bw;
var bh;
var p;
function drawBoard(){
	//creating grid on main canvas
	// Box width
	bw = canvas.width;
	// Box height
	bh = canvas.height;
	// Padding
	p = 0;
    for (var x = 0; x <= bw; x += 40) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 40) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
	
	//Creating Grid on smaller canvas
	// Box width
	bw = smallCanvas.width;
	// Box height
	bh = smallCanvas.height;
	// Padding
	p = 0;
    for (var x = 0; x <= bw; x += 40) {
        sctx.moveTo(0.5 + x + p, p);
        sctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 40) {
        sctx.moveTo(p, 0.5 + x + p);
        sctx.lineTo(bw + p, 0.5 + x + p);
    }
    sctx.strokeStyle = "black";
    sctx.stroke();
}

function animationFrame(){
	
}

function start(){
	ctx.drawImage(smallCanvas, 0, 0);
}

function reset(){
	sctx.clearRect(0, 0, smallCanvas.width, smallCanvas.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard();
}



function step() {
	setCanvasSize();
    drawBoard();
	setTimeout(100);
    window.requestAnimationFrame(step);
}

drawBoard();
//window.requestAnimationFrame(step);