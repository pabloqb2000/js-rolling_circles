let nCirclesSld;
let radious = [10, 30];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);
	nCirclesSld = new Slider(start=2, end=10, value=2, 0, 0, width/12, height/60, 1, "Number of circles", true, 0);
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	background(32);
	UI.update();
	UI.draw();
	translate(width/2 + width/12, height/2);
	noFill();
	strokeWeight(1);
	stroke(124);
	for(let r of radious) {
		ellipse(0, 0, r, r);
	}
}

function mouseDragged() {
	UI.mouseDragged();
}

function mousePressed() {
	UI.mouseClicked();
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }
