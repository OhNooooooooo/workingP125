noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 435);
    canvas.position(560, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function draw() {
    background('#800000');
    fill('blue');
    stroke('#239552');
    document.getElementById("square_side").innerHTML="Side Length of the Square will be equal to: "+difference+"px";
    square(noseX, noseY, difference);
}

function modelLoaded() {
    console.log('PoseNet Is Initialised!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("noseX = "+noseX+", noseY = "+noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.y;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = "+leftWristX+", rightWristX = "+rightWristX+", difference = "+difference);
    }
}
