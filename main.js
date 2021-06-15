img="";
status="";
object=[];

function preload(){
   img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd' , ModelLoaded);
    document.getElementById("status").innerHTML="status  : Detecting Objects ";
}

function draw(){
    image(video , 0 , 0 , 380 , 380);
    
    if (status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video , GotResult);
        for (i = 0 ; i < object.length ; i++){
            document.getElementById("status").innerHTML="status : Object Detected";
            document.getElementById("NoOfObjects").innerHTML= " Number Of Objects Detected Are - " + object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " % " , object[i].x +15 , object[i].y);
            stroke(r,g,b);
            noFill(); 
            rect(object[i].x , object[i].y , object[i].width , object[i].height );

    }
}
}

function ModelLoaded(){
    console.log('Model Loaded !');
    status=true;
}

function GotResult(error , results){
    if (error){
        console.error(error);
    }
    else {
    console.log(results);
    object=results;
    }
}

//window.location=""//