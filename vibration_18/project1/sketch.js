let mic, fft;  // Audio input and FFT analyzer
let angle = 0; // For rotating the visualizer

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Enable 3D mode
  noFill(); // Ensure wireframes are used
  mic = new p5.AudioIn(); // Capture mic input
  mic.start();
  fft = new p5.FFT(); // Analyze frequencies
  fft.setInput(mic);
}

function draw() {
  background(0); // Black background
  orbitControl(); // Enable interactive rotation
  
  stroke(255, 175); // White, semi-transparent wireframe lines
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005);
  
  let spectrum = fft.analyze(); // Get frequency spectrum
  let detail = 50; // Number of vertices to define the shape

  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / detail) {
    for (let j = 0; j < PI; j += PI / detail) {
      let x = cos(i) * sin(j);
      let y = sin(i) * sin(j);
      let z = cos(j);
      
      let index = floor(map(sin(i * j), -1, 1, 0, spectrum.length - 1));
      let amp = spectrum[index];
      let r = map(amp, 0, 256, 100, 400); // Map amplitude to radius

      let posX = x * r;
      let posY = y * r;
      let posZ = z * r;

      vertex(posX, posY, posZ);
    }
  }
  endShape(CLOSE);
}
