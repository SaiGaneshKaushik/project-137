Status = "";
objects = [];
object_Name = "";

function setup(){
  canvas = createCanvas(350, 350);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(350, 350);
  video.hide();
}
function start(){
  objectdetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "status: detecting objects";
  object_Name = document.getElementById("object_Name").value;
}
function modelLoaded(){
  console.log("model is loaded");
  Status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}
function draw(){
  image(video, 0, 0, 350, 350);
  if(Status != ""){
    objectdetector.detect(video, gotResults);
    for(s = 0;s < objects.length; s++ ){
      document.getElementById("status").innerHTML = "status: objects Detected";
      document.getElementById("number_of_objects").innerHTML = "number of objects detected are: " + objects.length;
      fill("green");
      percent = floor(objects[s].confidence * 100);
      text(objects[s].label + " " + percent + "%", objects[s].x + 10, objects[s].y - 10);
      noFill();
      stroke("red");
      rect(objects[s].x, objects[s].y, objects[s].width, objects[s].height);
      if(objects[s].label == object_Name){
        video.stop();
        objectdetector.detect(gotResults);
        document.getElementById("status").innerHTML = object_Name + " " + "Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(object_Name + "Found")
        synth.speak(utterThis);
      }
      else{
        document.getElementById("status").innerHTML = object_Name + " Not Found";
      }
    } 
  }
}
function gotResults(error,results){
  if(error){
      console.error(error);
  }
  else{
      console.log(results);
      objects = results;
  }
}