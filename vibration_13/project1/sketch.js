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
  stroke(255, 175);
  strokeWeight(0.8); // Increase weight for more visible particles

  // Get audio spectrum and map it to visual properties
  let spectrum = fft.analyze();
  let amplitude = fft.getEnergy("bass");

  // Rotate and scale effect based on amplitude
  rotateX(angle * 0.3);
  rotateY(angle * 0.2);
  

  // Draw particles in a circular pattern
  for (let i = 0; i < TWO_PI; i += PI / 100) {
    let offset = map(amplitude, 0, 75, 50, 100);
    let x = cos(i) * 100;
    let y = sin(i) * 100;
    let z = sin(i * 2 + angle) * offset;

    for (let j = 0; j < 360; j += 10) {
      let innerX = x + cos(j) * offset;
      let innerY = y + sin(j) * offset;
      let innerZ = sin(j + angle) * offset;
      point(innerX, innerY, innerZ); // Draw each point as a particle
    }
  }
  
}
