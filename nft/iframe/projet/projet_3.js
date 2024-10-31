function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(150);
  noFill();
  var t = frameCount / 70.0; 
  translate(width/2, height/2); 

  for (var y = 0; y < 10; y ++) { 


    for (var i=0; i<360; i+=10) { 
      rotate(radians(5)); 
      stroke(0); 
      strokeWeight(1); 


      for (var a =0; a < 400; a += 10) { 
        var c= random(50, 200); 
        var r= random(50, 200); 

        stroke(255);
        circle(20, 15+a, noise(100, a, t)*400);  
        
        stroke(100);
        rect(20, 15+a, noise(100, a, t)*100, noise(100, a, t)*400 ); 
       
        stroke(0); 
        bezier(20, 15+a, noise(2, a, t)*r, noise(3, a, t)*r, noise(4, a, t)*r, noise(5, a, t)*c, 0-(a/10), 0+(a/1)); 
       
}

  
      }
    }
}
