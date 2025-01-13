let fft;
let mic;
let numBranches = 200;
let angleStep;

function setup() {
  createCanvas(windowHeight, windowWidth, WEBGL); // Enable 3D mode
  angleMode(DEGREES);
  fft = new p5.FFT(0.9, 64); // Set FFT with smoothing and 64 frequency bands
  mic = new p5.AudioIn(); // Initialize microphone input
  mic.start();
  fft.setInput(mic); // Set microphone as the FFT input
  angleStep = 360 / numBranches;
}

function draw() {
  background(0);
  stroke(255, 255, 255, 100);
  noFill();

  let spectrum = fft.analyze();
  rotateY(frameCount * 0.01); // Slowly rotate the entire visualization

  for (let i = 0; i < numBranches; i++) {
    let angle = i * angleStep;
    let amp = spectrum[i % spectrum.length];
    let length = map(amp, 0, 255, 50, 200); // Map amplitude to length

    // Calculate 3D position for the start and end of each branch
    let x = cos(angle) * length;
    let y = sin(angle) * length;
    let z = map(sin(angle + frameCount * 0.5), -1, 1, -100, 100); // Make branches wave in 3D

    push();
    rotate(angle); // Rotate to angle
    strokeWeight(1);
    
    // Draw primary branch
    beginShape();
    vertex(0, 0, 0);
    vertex(x, y, z);
    endShape();

    // Draw smaller branches from the end of each primary branch
    for (let j = 0; j < 3; j++) { 
      let branchAngle = angle + j * 60 + amp * 0.1;
      let branchLength = length / 2;

      let branchX = cos(branchAngle) * branchLength;
      let branchY = sin(branchAngle) * branchLength;
      let branchZ = map(cos(branchAngle), -1, 1, -50, 50);

      beginShape();
      vertex(x, y, z);
      vertex(x + branchX, y + branchY, z + branchZ);
      endShape();
    }
    
    pop();
  }
}
