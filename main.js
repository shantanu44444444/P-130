song1 = "";
song2 = "";
song3 = "";
song4 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song1 = loadSound("remix.mp3");
    song2 = loadSound("remix2.mp3");
    song3 = loadSound("remix3.mp3");
    song4 = loadSound("remix4.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("My PoseNet Model Is Started !!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreLeftWrist = " + scoreLeftWrist);
        console.log(" scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 500, 500);

    fill("#32a887");
    stroke("#32a8a8");

    if(scoreRightWrist > 0.2){

        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "speed = 2.5X";
            song.rate(2.5);
        }
    
        else if(rightWristY>100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "speed = 2X";
            song.rate(2);
        }
    
        else if(rightWristY>200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5X";
            song.rate(1.5);
        }
    
        else if(rightWristY>300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "speed = 1X";
            song.rate(1);
        }
    
        else if(rightWristY>400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "speed = 0.5X";
            song.rate(0.5);
        }

    }



    if(scoreLeftWrist>0.2){

    circle(leftWristX-100, leftWristY, 20);
    inNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(inNumberleftWristY);
    volume_rate = remove_decimals / 500;
    volume_minus_1 = volume_rate-1;
    volume = volume_minus_1 * (-1);
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

    }
}

function play_1() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.stop();
    song3.stop();
    song4.stop();
}

function play_2(){
    song2.play();
    song2.setVolume(1);
    song2.rate(1);

    song1.stop();
    song3.stop();
    song4.stop();
}

function play_3(){
    song3.play();
    song3.setVolume(1);
    song3.rate(1);

    song1.stop();
    song2.stop();
    song4.stop();
}

function play_4(){
    song4.play();
    song4.setVolume(1);
    song4.rate(1);

    song1.stop();
    song2.stop();
    song3.stop();
}

function stop() {
    song1.stop();
    song2.stop();
    song3.stop();
    song4.stop();
}