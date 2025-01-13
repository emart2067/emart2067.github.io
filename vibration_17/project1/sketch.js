let mic, fft;
let t = 0;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.9, 64);
  mic.start();
  fft.setInput(mic);

  
  noFill();
}

function draw() {
  background(0);

  // Get audio input levels and spectrum
  let level = mic.getLevel();
  let spectrum = fft.analyze();
  let amplitude = fft.getEnergy("bass");

  // Calculate amplitude and frequency modifiers
  let ampMod = map(level, 0, 1, 100, 300);
  let freqMod = map(level, 0, 1, 2, 20);

  // Rotate the canvas for a 3D effect
  rotateX(angle * 0.3);
  rotateY(angle * 0.2);
  rotateZ(angle * 0.1);

  // Main 3D shape with microphone interaction
  beginShape();
  for (let i = 0; i < TWO_PI * 10; i += 0.1) {
    let x = sin(3 * i + t) * ampMod + cos(2 * i) * (ampMod / 2);
    let y = cos(4 * i - t) * ampMod + sin(i) * (ampMod / 2);
    let z = sin(i * freqMod + t) * ampMod / 2;
    vertex(x, y, z);
    stroke(0);
    strokeWeight(2);
  }
  endShape(CLOSE);

  // Secondary geometric pattern with spectrum modulation
  for (let i = 0; i < TWO_PI; i += PI / 10) {
    let offset = map(amplitude, 0, 255, 50, 200);
    let x = cos(i) * 150;
    let y = sin(i) * 150;
    let z = sin(i * 3 + angle) * offset;

    beginShape();
    for (let j = 1; j < 360; j += 10) {
      let innerX = x + cos(j) * offset;
      let innerY = y + sin(j) * offset;
      let innerZ = sin(j + angle) * offset;
      vertex(innerX, innerY, innerZ);
      stroke(255);
      strokeWeight(0.8);
    }
    endShape(CLOSE);
  }

  // Counter rotation to add complexity
  rotateX(-angle * 0.2);
  rotateY(-angle * 0.1);

  // Additional rotating lines
  for (let o = 0; o < TWO_PI; o += PI / 10) {
    let offset = map(amplitude, 0, 255, 50, 200);
    let x = cos(o) * 100;
    let y = sin(o) * 100;
    let z = sin(o * 3 + angle) * offset;

    beginShape();
    for (let a = 0; a < 360; a += 10) {
      let innerX = x + cos(a) * offset;
      let innerY = y + sin(a) * offset;
      let innerZ = sin(a + angle) * offset;
      vertex(innerX, innerY, innerZ);
       stroke(255, 175);
      strokeWeight(0.8);
    }
    endShape(CLOSE);
  }

  // Update time and angle for rotation
  t += 0.01 * freqMod;
  angle += 0.01;
}
