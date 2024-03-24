//Resources:
//The Coding Train // Daniel Shiffman
//Ml5 Hand Reeference // sge7432
//ChatGPT Open Ai 2024 promt: "how to make loop for a single show"
//Image sources - PNG Tree Free Download
//Randomizing reference // aferriss
//Transperency and offset // Processing example resources

let cloudImage; //Image variable for cloud
let rain; //Image variable for rain

//Variables for handpose - reference
let handpose;
let video;
let predictions = [];
let sparkleArray = [];

// Variables for Cloud offset
let offset = 0;
let easing = 0.05;

//Image load function
function preload(){
  cloudImage = loadImage("cloud.png")
  rain = loadImage("rain.png")
}

function setup() {
  createCanvas(700, 700); //Canvas Size
  angleMode(DEGREES); //Degrees for clock rotation
  
  //Video connection
  video = createCapture(VIDEO);
  video.size(width, height);
  
  //Hnadpose ml5 library
  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });
  video.hide(); // Video Hide
}

//Model insertion
function modelReady() {
  console.log("Model ready!");
}
function draw() {
  image(video, 0, 0, width, height); //Video detection
  background(109,162,209); //Draw background
  
  drawRain(); //Draw rain function callout
  drawSun();  //Draw sun function callout
  drawText(); //Draw the text
  drawClouds(); //Draw clouds function callout
  
  drawKeypoints(); //Keypoints for hand detection
}

//Draw rain png
function drawRain() {
    if(mouseX > 200){ //If mouse X position > 200 rain png appear
    image(rain, 30, 5, 700, 700);
  }
}

//Draw Instruction
function drawText(){
  fill(255);
  strokeWeight(4);
  if(mouseX > 200){ //If mouse X position > 200 "Greet camera" instruction  
  textSize(25);
  text("Greet the camera", 420, 170)  
  }
}

//Draw the clouds png
function drawClouds() {  
  image(cloudImage, 10, 200, 400, 350);
  image(cloudImage, 300, 270, 400, 350);
  image(cloudImage, 100, 300, 450, 400);
  
  //Movable cloud with mouse
  let dx = mouseX - cloudImage.width / 2 - offset;
  offset += dx * easing;
  image(cloudImage, offset, 310, 350, 300);
}

//Draw Sun ellipse
function drawSun(){
stroke(0);
strokeWeight(3);
fill(245,184,100);  
ellipse(400, 350, 200, 200);  
}

// Keypoints hand detection function
function drawKeypoints() {

  
  let found = false; 
  for (let i = 0; i < predictions.length && !found; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length && !found; j += 1) {
      const keypoint = prediction.landmarks[j];
      drawLabel();
      drawRainbow(keypoint.x, keypoint.y);
      found = true; 
    }
  }
}
function drawLabel(){
  //Variable for randomazing
  let r;
  let g;
  let b;
  let a;
  
  r = random(255); //Randomize colors 0 - 255 in reds
  g = random(100,200); //Randomize colors 100 - 200 in green
  b = random(100); //Randomize colors 0 - 100 in blues
  a = random(200,255); //Number between 200 - 255
  
  fill(r, g, b, a); //Fill color randomizer
  textSize(30);
  stroke(255);
  strokeWeight(4);
  text("A RAINBOW MAY BE WAITING FOR US", 70, 670);
}
function drawRainbow(){
  translate(200, 200);
  rotate(-90);

  let hours = hour(); // Variables for hour
  let minutes = minute(); //For minutes
  let seconds = second(); //For seconds
  
  
  strokeWeight(10);
  
  //Section for seconds
  stroke(245,97,95);
  fill(244,170,66);
  let secondAngle = map(seconds, 0, 60, 0, 360); //renew after 60 
  arc(0, 0, 300, 300, 0, secondAngle);
  
  //Section for minutes
  stroke(242,243,145);
  fill(152,216,152);
  let minuteAngle = map(minutes, 0, 60, 0, 360);
  arc(0, 0, 250, 250, 0, minuteAngle);
  
  //Section for hours
  stroke(137,186,214);
  fill(197,147,193);
  let hourAngle = map(hours % 12, 0, 12, 0, 360);
  arc(0, 0, 200, 200, 0, hourAngle);
  
  //Lines for clock
  push();
  strokeWeight(10);
  rotate(secondAngle); //For seconds
  stroke(245,97,95);
  line(0, 0, 150, 0);
  pop();
  
  push();
  strokeWeight(10);
  rotate(minuteAngle); //For minutes
  stroke(242,243,145);
  line(0, 0, 120, 0);
  pop();
  
  push();
  strokeWeight(10);
  rotate(hourAngle); //For hours
  stroke(137,186,214);
  line(0, 0, 100, 0);
  pop();
  
  //Cloud middle pointer
  stroke(255);
  strokeWeight(25);
  point(2, 0);
  point(-8, 10);
  point(-8, -10);
  }