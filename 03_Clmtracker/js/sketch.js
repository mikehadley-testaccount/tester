/*
	Face Tracking

	Include clmtrackr
	Include face model
	https://kylemcdonald.github.io/cv-examples/
	https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
*/ 

var ctracker;
var positions;
var capture;

function setup() {
	createCanvas(640, 480);

	capture = createCapture(VIDEO);	
	capture.hide();

	pixelDensity(1);

	ctracker = new clm.tracker();
	ctracker.init(pModel); // Comes from the model.js file
	// Wait until the camera feed has started before starting the tracker
	capture.elt.addEventListener("loadeddata", startTracker);
}

function startTracker() {
	ctracker.start(capture.elt);
}

function draw() {
	background(0);
	image(capture, 0, 0);
	 
	// See points:
	// http://www.auduno.com/clmtrackr/docs/reference.html
	positions = ctracker.getCurrentPosition();
	if (positions === false) return;
	
	var score = ctracker.getScore();
	fill(255);
	noStroke();
	textSize(20);
	text("Face Match: " + nfc(score, 2), 10, 25);

	// drawFacePoints();
	drawFaceLines();

	// var upperLipBottom = positions[60];
	// var lowerLipTop = positions[57];
	// var mouthOpenDist = dist(upperLipBottom[0], upperLipBottom[1], lowerLipTop[0], lowerLipTop[1]);
	// text("Mouth open: " + mouthOpenDist, 10, 55);
}

function drawFacePoints() {
    fill(255);
    stroke(0);
    strokeWeight(1);
    for (var i = 0; i < positions.length; i += 1) {
        var point = positions[i];
        ellipse(point[0], point[1], 4, 4);
    }
}

function drawFaceLines() {
	// Chin line: 0 - 14
	noFill();
	stroke(255);
	drawShape([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

	// Right eyebrow: 15 - 18
	noFill();
	stroke(255);
	drawShape([15, 16, 17, 18], true);

	// Left eyebrow: 19 - 22
	noFill();
	stroke(255);
	drawShape([19, 20, 21, 22], true);

	// Left eye outline: 23, 66, 26, 65, 25, 64, 24, 63
	noFill();
	stroke(255);
	drawShape([23, 66, 26, 65, 25, 64, 24, 63], true);

	// Left eye center: 27
	fill(255);
	noStroke();
	ellipse(positions[27][0], positions[27][1], 4);

	// Right eye outline: 30, 69, 31, 70, 28, 67, 29, 68
	noFill();
	stroke(255);
	drawShape([30, 69, 31, 70, 28, 67, 29, 68], true);

	// Right eye center: 32
	fill(255);
	noStroke();
	ellipse(positions[32][0], positions[32][1], 4);

	// Nose bridge: 33, 41, 62
	noFill();
	stroke(255);
	drawShape([33, 41, 62]);

	// Nose tip: 34, 35, 36, 42, 37, 43, 38, 39, 40
	noFill();
	stroke(255);
	drawShape([34, 35, 36, 42, 37, 43, 38, 39, 40]);

	// Upper lip: 44, 45, 46, 47, 48, 49, 50, 59, 60, 61
	noFill();
	stroke(255);
	drawShape([44, 45, 46, 47, 48, 49, 50, 59, 60, 61], true);

	// Lower lip: 44, 56, 57, 58, 50, 51, 52, 53, 54, 55
	noFill();
	stroke(255);
	drawShape([44, 56, 57, 58, 50, 51, 52, 53, 54, 55], true);
}

function drawShape(indices, shouldClose) {
	beginShape();
	for (var i = 0; i < indices.length; i++) {
		var posIndex = indices[i];
		var point = positions[posIndex];
		vertex(point[0], point[1]);
	}
	if (shouldClose) {
		endShape(CLOSE);
	} else {
		endShape();
	}
}