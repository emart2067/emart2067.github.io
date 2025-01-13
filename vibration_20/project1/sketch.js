let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Create microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Create FFT (Fast Fourier Transform) analyzer
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0, 20); // Slight fade to black for trails

  let spectrum = fft.analyze(); // Get the frequency spectrum

  noFill();
  stroke(255, 150); // Semi-transparent white
  strokeWeight(2);

 
  // Overlay additional flowing lines
  translate(width / 2, height / 2);
  for (let i = 0; i < 5; i++) {
    rotate(frameCount * 0.002); // Subtle rotation effect
    drawFlowingLine(spectrum);
  }
}

function drawFlowingLine(spectrum) {
  noFill();
  stroke(255, 80); // Softer strokes for a glow effect
  strokeWeight(1.5);

  beginShape();
  for (let i = 0; i < spectrum.length / 2; i++) {
    let angle = map(i, 0, spectrum.length / 2, 0, TWO_PI);
    let rad = map(spectrum[i], 0, 255, 50, height / 2);
    let x = rad * cos(angle);
    let y = rad * sin(angle);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}
