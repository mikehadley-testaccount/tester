/*
	Video is an HTML5 element, so include p5.dom.min.js!

	Best option for video format: H.264 codec in an MP4 container. See:
		https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats

	Tutorial on video in p5:
		http://creative-coding.decontextualize.com/video/
*/
var video;

function setup() {
	createCanvas(1280, 720);
	video = createVideo("video/cat.mp4");
	video.loop();
	video.hide();

	colorMode(HSB, 360, 100, 100, 1); // <- step 2
}

// Step 1:
function mousePressed() {
	var t = map(mouseX, 0, width, 0, video.duration());
	video.time(t);
	var s = map(mouseY, 0, height, 0.1, 20);
	video.speed(s);
}

// Step 2:
function draw() {
	var a = map(mouseX, 0, width, 0.01, 1);
	var h = map(mouseY, 0, height, 0, 360);
	tint(h, 100, 100, a);
	image(video, 0, 0, width, height);
	ellipse(mouseX, mouseY, 100, 100);
}
