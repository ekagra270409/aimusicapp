song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;
song_status=0;
song2_status=0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("ff0000");
    stroke("ff0000");


    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY,20);
        song.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing Peter Pan song";
        }
    } 

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20);
        song.stop();
        if(song_status == false)
        {
            song.play();
            document.getElementById("song").innerHTML = "Playing Harry Potter song";
        }
    } 
}

function gotPoses(results)
{
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
}