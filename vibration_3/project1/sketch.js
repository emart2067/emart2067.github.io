let mic, fft;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.8, 64);
  mic.start();
  fft.setInput(mic);
}

function draw() {
  background(0);
  noFill();
  stroke(255, 150);
  strokeWeight(0.2);

  // Get audio spectrum and map it to visual properties
  let spectrum = fft.analyze();
  let amplitude = fft.getEnergy("bass");

  // Rotate and scale effect based on amplitude
  rotateX(angle * 0.3);
  rotateY(angle * 0.2);
  rotateZ(angle * 2);

  // Draw a series of rotating, shifting lines in a circular pattern
  for (let i = 0; i < TWO_PI; i += PI / 50) {
    let offset = map(amplitude, 0, 255, 50, 150);
    let x = cos(i) * 100;
    let y = sin(i) * 100;
    let z = sin(i * 3 + angle) * offset; // Create a wave effect with amplitude
    
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let innerX = x + cos(j) * offset;
      let innerY = y + sin(j) * offset;
      let innerZ = sin(j + angle) * offset;
      vertex(innerX, innerY, innerZ);
    }
    endShape(CLOSE);
  }
  
  rotateX(angle * -0.3);
  rotateY(angle * -0.2);
  rotateZ(angle * -0.1);

  // Draw a series of rotating, shifting lines in a circular pattern
  for (let i = 0; i < TWO_PI; i += PI / 50) {
    let offset = map(amplitude, 0, 255, 50, 150);
    let x = cos(i) * 50;
    let y = sin(i) * 50;
    let z = sin(i * 3 + angle) * offset; // Create a wave effect with amplitude
    
    beginShape();
    for (let j = 0; j < 360; j += 5) {
      let innerX = x + cos(j) * offset;
      let innerY = y + sin(j) * offset;
      let innerZ = sin(j + angle) * offset;
      vertex(innerX, innerY, innerZ);
    }
    endShape(CLOSE);
  }

  // Update angle for rotation
  angle += 0.01;
}
