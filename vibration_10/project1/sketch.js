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
  stroke(255);
  strokeWeight(0.5);

  // Get audio spectrum and map it to visual properties
  let spectrum = fft.analyze();
  let amplitude = fft.getEnergy("bass");

  // Rotate effect based on angle
  rotateX(angle * 0.3);
  rotateY(angle * 0.2);

  // Map amplitude to control the deformation of the sphere
  let offset = map(amplitude, 0, 255, 150, 250);

  // Draw a series of points that form a spherical structure
  let layers = 40; // Number of layers (vertical division)
  let pointsPerLayer = 60; // Number of points in each horizontal ring

  for (let i = 0; i < layers; i++) {
    let lat = map(i, 0, layers - 1, -PI / 2, PI / 2); // Latitude angle
    let radius = cos(lat) * offset; // Radius for current layer

    beginShape();
    for (let j = 0; j < pointsPerLayer; j++) {
      let lon = map(j, 0, pointsPerLayer, 0, TWO_PI); // Longitude angle

      // Deform the sphere along z-axis based on amplitude
      let x = radius * cos(lon);
      let y = radius * sin(lon);
      let z = sin(lat) * offset;

      // Add slight random displacement based on amplitude
      x += random(-amplitude * 0.02, amplitude * 0.02);
      y += random(-amplitude * 0.02, amplitude * 0.02);
      z += random(-amplitude * 0.02, amplitude * 0.02);

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }

  // Update angle for rotation
  angle += 0.01;
}
