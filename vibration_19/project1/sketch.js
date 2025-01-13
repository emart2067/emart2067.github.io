let mic;
let fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let spectrum = fft.analyze();
  let waveformRadius = 100; // Base radius for the visualization

  noFill();
  stroke(255);
  strokeWeight(1);

  for (let i = 0; i < 50; i++) {
    beginShape();
    for (let angle = 0; angle < TWO_PI*2; angle += 0.1) {
      let index = floor(map(angle, 0, TWO_PI, 0, spectrum.length));
      let amplitude = spectrum[index];
      let offset = map(amplitude*2, 0, 855, -50, 400);
      let r = waveformRadius + offset*2 + i * 5;
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
