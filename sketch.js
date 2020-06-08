let nCirclesSld;
let speedSld;
let radious = [];
let angles = [];
let path = [];
let resetBtn;
let discretizeBtn;

function setup() {
	textFont("Orbitron");
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI
	nCirclesSld = new Slider(start=1, end=10, value=2, 0, 0, width/12, height/60, 1, "Number of circles", true, 0, UIupdate);
	speedSld = new Slider(start=0, end=1, value=0.2, 0, 0, width/12, height/60, null, "Speed", true, 2);
	for(let i = 0; i < 10; i++) {
		radious.push(new Slider(start=0, end=height/6, value=20, 0,0, width/12, height/60, null, "Radious " + i.toString(), false, 0, UIupdate));
		angles.push(0);
	}
	resetBtn = new Button(0,0, width/12, height/30, "Reset", UIupdate);
	discretizeBtn = new ToggleButton(0,0, width/12, height/30, "Discretize", discretize);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UIupdate();
}

function draw() {
	background(32);
	UI.update();
	UI.draw();

	// Draw circles
	let vect = createVector(0,0);
	let angle = 0;
	translate(width/2 + width/12, height/2);
	scale(1,-1);
	noFill();
	strokeWeight(1);
	stroke(124);
	push();
	for(let i = 0; i < radious.length; i++) {
		if(radious[i].visible){
			angle += angles[i];
			vect.add(p5.Vector.fromAngle(angle, radious[i].value + 
				(i < radious.length - 1 && radious[i+1].visible ? radious[i+1].value : 0)));
			ellipse(0, 0, radious[i].value*2, radious[i].value*2);
			if(i < radious.length - 1) {
				rotate(angles[i]);
				translate(radious[i].value + radious[i+1].value, 0);
				angles[i] += speedSld.value / radious[i].value * 10;
			}
		} else {
			break;
		}
	}
	pop();

	//Update path
	path.push(vect);

	//Draw path
	stroke(255);
	beginShape();
	for(let v of path) {
		vertex(v.x, v.y);
	}
	endShape();
}

function UIupdate() {
	for(let i = 0; i < radious.length; i++) {
		background(32);
		path = [];
		radious[i].visible = i < nCirclesSld.value;
		angles[i] = 0;
	}
	
	UI.distrubute();
}

function discretize(){
	if(discretizeBtn.active){
		for(let r of radious) {
			r.step = 20;
			r.value = 20;
		}
	} else {
		for(let r of radious) {
			r.step = null;
		}
	}
	UIupdate();
}

