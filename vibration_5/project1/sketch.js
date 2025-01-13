let mic;
let fft;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  let spectrum = fft.analyze();
  let waveformRadius = 100; // Base radius for the visualization

  noFill();
  stroke(255);
  strokeWeight(1);

  for (let i = 0; i < 60; i++) {
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let index = floor(map(angle, 0, TWO_PI, 0, spectrum.length));
      let amplitude = spectrum[index];
      let offset = map(amplitude, 0, 255, -50, 100);
      let r = waveformRadius + offset*2 + i * 5;
      let x = r * cos(angle);
      let y = r * sin(angle);
      let z = map(noise(i, angle, frameCount * 0.01), 0, 0.7, -100, 100);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
