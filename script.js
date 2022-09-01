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
let cellSize = 20;

//initialize board tracking parameters;
let i = 0;
let n = 30 * cellSize;
let m = 60 * cellSize;
let setting = 2;
let rando = new Array(8);
let requestID = null;

/*
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
*/

mainCanvas.height = n;
mainCanvas.width = m;
smallCanvas.width = m;
smallCanvas.height = cellSize;

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
	switch(setting){
		case 1:
			return this.evaluateFractal();
			break;
		case 2:
			return this.evaluateElementary();
			break;
		case 3:
			return this.evaluateRandom();
			break;
		case 4:
			return this.evaluateRandomEveryRow();
			break;
		default:
			console.log("BROKEN IN EVALUATE");
			break;
	}
}

Parents.prototype.evaluateElementary = function(){
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

Parents.prototype.evaluateFractal = function(){
	if(this.x == 0){
		if(this.y == 0){
			if(this.z == 0){ /*000*/ return 0; }
			else{ /*001*/ return 1;}
		}
		else{
			if(this.z == 0){ /*010*/ return 0; }
			else{ /*011*/ return 1; }
		}
	}else{
		if(this.y == 0){
			if(this.z == 0){ /*100*/ return 1; }
			else{ /*101*/ return 0; }
		}
		else{
			if(this.z == 0){ /*110*/ return 1; }
			else{ /*111*/ return 0; }
		}
	}
}

Parents.prototype.evaluateRandom = function(){
	if(this.x == 0){
		if(this.y == 0){
			if(this.z == 0){ /*000*/ return rando[0]; }
			else{ /*001*/ return rando[1]; }
		}
		else{
			if(this.z == 0){ /*010*/ return rando[2]; }
			else{ /*011*/ return rando[3]; }
		}
	}else{
		if(this.y == 0){
			if(this.z == 0){ /*100*/ return rando[4]; }
			else{ /*101*/ return rando[5]; }
		}
		else{
			if(this.z == 0){ /*110*/ return rando[6]; }
			else{ /*111*/ return rando[7]; }
		}
	}
}

Parents.prototype.evaluateRandomEveryRow = function(){
	initRandom();
	if(this.x == 0){
		if(this.y == 0){
			if(this.z == 0){ /*000*/ return rando[0]; }
			else{ /*001*/ return rando[1]; }
		}
		else{
			if(this.z == 0){ /*010*/ return rando[2]; }
			else{ /*011*/ return rando[3]; }
		}
	}else{
		if(this.y == 0){
			if(this.z == 0){ /*100*/ return rando[4]; }
			else{ /*101*/ return rando[5]; }
		}
		else{
			if(this.z == 0){ /*110*/ return rando[6]; }
			else{ /*111*/ return rando[7]; }
		}
	}
}
//---------------FUNCTIONS---------------//

function onClick(smallCanvas, event){
	let rect = smallCanvas.getBoundingClientRect();
	let x = Math.floor(event.clientX - rect.left);
	let y = Math.floor(event.clientY - rect.top);
	//40 wide, only need top x and left y
	//to get x: x / cellSize floor?
	x = Math.floor(x / cellSize);
	y = Math.floor(y / cellSize);
	
	sctx.beginPath();
	sctx.rect(x * cellSize + 0.5, y * cellSize + 0.5, cellSize, cellSize);
	sctx.fill();
	
	console.log(x + ", " + y);
}

function drawBoard(){
	initRandom();
	//creating grid on main canvas
	// Box width
	bw = mainCanvas.width;
	// Box height
	bh = mainCanvas.height;
	// Padding
	p = 0;
    for (var x = 0; x <= bw; x += cellSize) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += cellSize) {
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
    for (var x = 0; x <= bw; x += cellSize) {
        sctx.moveTo(0.5 + x + p, p);
        sctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += cellSize) {
        sctx.moveTo(p, 0.5 + x + p);
        sctx.lineTo(bw + p, 0.5 + x + p);
    }
    sctx.strokeStyle = "black";
    sctx.stroke();

	doReset = false;
}

function doRow(){

	//initialize needed variables
	let x = -1;
	let y = -1;
	let z = -1;
	let result = -1;
	var ImageData;
	if(i == 0){
		ctx.drawImage(smallCanvas, 0, 0);
		i += cellSize;
		return;
	}
	for(let j = 0; j < mainCanvas.width; j+=cellSize){
		//if i == 1 or i + 40 == maincanvas.width
		//three times
	//above i - 20: j + 20 
		ImageData = ctx.getImageData(j + (cellSize / 2), i - (cellSize / 2), 1, 1);
		if(ImageData.data[3] == 255){ y = 1; }
		else{ y = 0; }

	//left i - 20: j - 20
		//check to make sure j isnt out of bounds of the canvas
		if(j - (cellSize / 2) < 0){ x = 0; }
		else{
			ImageData = ctx.getImageData(j - (cellSize / 2), i - (cellSize / 2), 1, 1);
			if(ImageData.data[3] == 255){ x = 1; }
			else{ x = 0; }
		}

	//right i - 20: j + 60
		//check to make sure j isnt out of bounds of the canvas
		if(j + cellSize + (cellSize / 2) > mainCanvas.width){ z = 0; }
		else{
			ImageData = ctx.getImageData(j + cellSize + (cellSize / 2), i - (cellSize / 2), 1, 1);
			if(ImageData.data[3] == 255){ z = 1; }
			else{ z = 0; }
		}

		let test = new Parents(x, y, z);
		result = test.evaluate();

		if(result == 1){
			ctx.beginPath();
			ctx.rect(j, i, cellSize, cellSize);
			ctx.fill();
		}
	}
	i += cellSize;
}

function initRandom(){
	for(let k = 0; k < 8; k++){
		rando[k] = Math.floor(Math.random() * 2);
	}
	for(let k = 0; k < 8; k++){
		console.log(rando[k]);
	}
}

function reset(){
	cancelAnimationFrame(requestID);
	sctx.clearRect(0, 0, smallCanvas.width, smallCanvas.height);
	ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	i = 0;
	drawBoard();
}

function start(){
	requestID = requestAnimationFrame(step);
}

function step() {
	doRow();
	setTimeout(2000);
	if(i < mainCanvas.height){
		requestID = requestAnimationFrame(step);
	}
	else{
		console.log("STOPPED")
		cancelAnimationFrame(requestID);
	}
}

function boardSmall(e){
	cellSize = 40;
	n = 15 * cellSize;
	m = 30 * cellSize;
	mainCanvas.height = n;
	mainCanvas.width = m;
	smallCanvas.width = m;
	smallCanvas.height = cellSize;
	reset();
	
	let elements = document.getElementsByName("size");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function boardMedium(e){
	cellSize = 20;
	n = 30 * cellSize;
	m = 60 * cellSize;
	mainCanvas.height = n;
	mainCanvas.width = m;
	smallCanvas.width = m;
	smallCanvas.height = cellSize;
	reset();
	
	let elements = document.getElementsByName("size");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function boardLarge(e){
	cellSize = 10;
	n = 60 * cellSize;
	m = 120 * cellSize;
	mainCanvas.height = n;
	mainCanvas.width = m;
	smallCanvas.width = m;
	smallCanvas.height = cellSize;
	reset();

	let elements = document.getElementsByName("size");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function boardExtraLarge(e){
	cellSize = 5;
	n = 120 * cellSize;
	m = 240 * cellSize;
	mainCanvas.height = n;
	mainCanvas.width = m;
	smallCanvas.width = m;
	smallCanvas.height = cellSize;
	reset();
	
	let elements = document.getElementsByName("size");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function setFractal(e){
	setting = 1;
	let elements = document.getElementsByName("type");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function setElementary(e){
	setting = 2;
	let elements = document.getElementsByName("type");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function setRandom(e){
	setting = 3;
	let elements = document.getElementsByName("type");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

function setRandomEveryRow(e){
	setting = 4;
	let elements = document.getElementsByName("type");
	elements.forEach(
		element => element.classList.remove("active")
	);
	e.classList.add('active');
}

//---------------MAIN PROGRAM---------------//

drawBoard();