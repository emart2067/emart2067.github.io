let fft;
let mic;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Set up microphone input
  mic = new p5.AudioIn();
  mic.start();
  
  // Set up FFT for frequency analysis
  fft = new p5.FFT(0.9, 64);
  fft.setInput(mic);
  
  // Generate random circle positions on a sphere
  for (let i = 0; i < 1000; i++) {
    let theta = random(TWO_PI);
    let phi = random(PI);
    let r = random(50, 200); // Adjust radius range as needed
    
    let x = r * sin(phi) * cos(theta);
    let y = r * sin(phi) * sin(theta);
    let z = r * cos(phi);
    
    circles.push({ x, y, z });
  }
}

function draw() {
  background(0);
  noFill();
  stroke(255, 100);

  
  // Rotate for dynamic 3D effect
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  
  // Get frequency spectrum
  let spectrum = fft.analyze();
  
  // Draw circles with sizes based on sound levels
  for (let i = 0; i < circles.length; i++) {
    let { x, y, z } = circles[i];
    
    // Map circle size to a part of the sound spectrum
    let size = map(spectrum[i % spectrum.length], 0, 255, 5, 50);
    
    push();
    translate(x, y, z);
    ellipse(0, 0, size, size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
