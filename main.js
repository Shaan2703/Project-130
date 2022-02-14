Mumbai_indians_song="";
Pagla_pagli_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Mumbai_indians = "";
song_Pagla_pagli = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){
    Mumbai_indians_song = loadSound("song.mp3");
    Pagla_pagli_song = loadSound("sound.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Mumbai_indians = Mumbai_indians_song.isPlaying();
    console.log(song_Mumbai_indians);

  song_Pagla_pagli = Pagla_pagli_song.isPlaying();
    console.log(song_Pagla_pagli);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Pagla_pagli_song.stop();
        if(song_Mumbai_indians == "false"){
            Mumbai_indians_song.play();
        }
        
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
Mumbai_indians_song.stop();
        if(song_Pagla_pagli == "false"){
            song_Pagla_pagli.play();
        }
        else{
            console.log("Song Name: Mumbai Indians Song");
            document.getElementById("song_id").innerHTML = "Song Name: Mumbai Indians Song";
        }
        
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}

