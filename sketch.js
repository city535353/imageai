// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://city535353.github.io/imageai/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let input;
let img;


// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}


ThunkableWebviewerExtension.receiveMessage(function(message) {
   label = message;
   //img = loadImage(label);  
   //classifier.classify(flippedVideo, gotResult); 
   //ThunkableWebviewerExtension.postMessage(label);
});


function setup() {
	//###############
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
    //video: {
      //facingMode: "user"
    //} 
  };
	//###############
	
  createCanvas(800, 800);
  // Create the video
  //video = createCapture(constraints);
  //video.size(320, 320);
  //video.hide();

  //flippedVideo = ml5.flipImage(video)
  // Start classifying
  //showVideo();
  //select("#buttonPredict").mousePressed(classifyVideo);
  input = createFileInput(handleFile);
  input.position(20, 20);
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text(label, width / 2, height - 50); //
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    flippedVideo = createImg(file.data, '');
    flippedVideo.hide();
	classifier.classify(flippedVideo, gotResult);
  } else {
    flippedVideo = null;
  }
}


function imageLoaded(){ //this function could be called whatever we want
	  image(flippedVideo, 0, 0);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// Get a prediction for the current video frame
function showVideo() {
  flippedVideo = video.get(0,0,320,320);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  ThunkableWebviewerExtension.postMessage(label);
  // Classifiy again!
  //showVideo();
}