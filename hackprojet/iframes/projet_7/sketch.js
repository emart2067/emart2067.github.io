function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth(8);
}
//let numFrames = 150;
function drawFace(p) {
    let w = map(mouseY, 0, width, 0, 255);
    let o = map(mouseY, 255, width, 255, 0);  
    strokeWeight(2);
    stroke(o); 
    fill(w); 
    ellipse(0, 0, 25, 25); 
  
    stroke(o);
    strokeWeight(4);
    point(-4, -3);
    point(4, -3); 
  
  
    strokeWeight(3);
    let n = 10;
    for (let i = 0; i <= n; i++) {
        let X = map(i, 0, n, -6, 6);
        let Y = 4 + map(p, 0, 1, -2.5, 2.5) * sin((PI * i) / n);
        point(X, Y);
    }
}
function draw() {
    background(0);
    let x = map(mouseY, 0, width, 0, 255);
    background(x);
  
    //let t = (frameCount ) / numFrames;
    let m = 20;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            let x = map(i, 0, m - 1, 20, width - 20);
            let y = map(j, 0, m - 1, 20, height - 20);
          
            push();
            translate(x, y); 
           
            let offset = dist( height / 2, height / 2, mouseY, mouseY);
            let changeParameter = map(sin(TWO_PI * ( offset)), -1, 1, 0, 1);
            drawFace(changeParameter);
            pop();
        }
    }
   
}
