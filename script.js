//TODO
	//add button to do row by row
	//add bytton to do animation
	//add button to do it automatically

//Gets the canvas
var mainCanvas = document.getElementById("myCanvas");
var smallCanvas = document.getElementById("startCanvas");
//instances 2d on it
var sctx = smallCanvas.getContext("2d");
var ctx = mainCanvas.getContext("2d");

//initialize Board parameters
var bw;
var bh;
var p;

//initialize board tracking parameters;
let i = 0;

let n = prompt("Enter number of Rows", "");
while(isNaN(parseInt(n))){
	n = prompt("Enter number of Rows", "");
}

n = Math.floor(n) * 40;

let m = prompt("Enter number of Columns", "");
while(isNaN(parseInt(n))){
	m = prompt("Columns", "");
}

m = Math.floor(m) * 40;

mainCanvas.height = n;
mainCanvas.width = m;
smallCanvas.width = m;

//---------------EVENT LISTENERS---------------//

smallCanvas.addEventListener("mousedown", function(e){
	onClick(smallCanvas, e);
});

//---------------OBJECTS---------------//
function Parents(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
}

//---------------OBJECT FUNCTIONS---------------//
Parents.prototype.evaluate = function(){
	if(this.x == 0){
		if(this.y == 0){
			if(this.z == 0){ /*000*/ return 0; }
			else{ /*001*/ return 1;}
		}
		else{
			if(this.z == 0){ /*010*/ return 1; }
			else{ /*011*/ return 1; }
		}
	}else{
		if(this.y == 0){
			if(this.z == 0){ /*100*/ return 1; }
			else{ /*101*/ return 0; }
		}
		else{
			if(this.z == 0){ /*110*/ return 0; }
			else{ /*111*/ return 0; }
		}
	}
}

//---------------FUNCTIONS---------------//

function onClick(smallCanvas, event){
	let rect = smallCanvas.getBoundingClientRect();
	let x = Math.floor(event.clientX - rect.left);
	let y = Math.floor(event.clientY - rect.top);
	//40 wide, only need top x and left y
	//to get x: x / 40 floor?
	x = Math.floor(x / 40);
	y = Math.floor(y / 40);
	
	sctx.beginPath();
	sctx.rect(x * 40 + 0.5, y * 40 + 0.5, 40, 40);
	sctx.fill();
	
	console.log(x + ", " + y);
}

function drawBoard(){
	//creating grid on main canvas
	// Box width
	bw = mainCanvas.width;
	// Box height
	bh = mainCanvas.height;
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

function doRow(){
	//initialize needed variables
	let x = -1;
	let y = -1;
	let z = -1;
	let result = -1;
	var ImageData;
	if(i == 0){
		start();
		return;
	}
	for(let j = 0; j < mainCanvas.width; j+=40){
		//if i == 1 or i + 40 == maincanvas.width
		//three times
	//above i - 20: j + 20 
		ImageData = ctx.getImageData(j + 20, i - 20, 1, 1);
		if(ImageData.data[3] == 255){ y = 1; }
		else{ y = 0; }

	//left i - 20: j - 20
		//check to make sure j isnt out of bounds of the canvas
		if(j - 20 < 0){ x = 0; }
		else{
			ImageData = ctx.getImageData(j - 20, i - 20, 1, 1);
			if(ImageData.data[3] == 255){ x = 1; }
			else{ x = 0; }
		}

	//right i - 20: j + 60
		//check to make sure j isnt out of bounds of the canvas
		if(j + 60 > mainCanvas.width){ z = 0; }
		else{
			ImageData = ctx.getImageData(j + 60, i - 20, 1, 1);
			if(ImageData.data[3] == 255){ z = 1; }
			else{ z = 0; }
		}

		let test = new Parents(x, y, z);
		result = test.evaluate();

		if(result == 1){
			ctx.beginPath();
			ctx.rect(j, i, 40, 40);
			ctx.fill();
		}
	}
	i += 40;
}

function animationFrame(){
	doRow();
}

function start(){
	ctx.drawImage(smallCanvas, 0, 0);
	i += 40;
}

function reset(){
	sctx.clearRect(0, 0, smallCanvas.width, smallCanvas.height);
	ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	i = 0;
	drawBoard();
}

function step() {
	doRow();
	setTimeout(2000);
	if(i < mainCanvas.height){
		window.requestAnimationFrame(step);
	}
	else{
		console.log("STOPPED");
	}
}

//---------------MAIN PROGRAM---------------//

drawBoard();