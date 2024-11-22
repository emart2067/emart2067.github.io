let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noFill();
  stroke(255); // Set line color with slight transparency

  // Initialize microphone input and FFT
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 128); // Lower smoothing for a sharper effect
  fft.setInput(mic);
}

function draw() {
  background(0);

  let spectrum = fft.analyze(); // Get frequency spectrum

  // Rotate the sphere for a dynamic 3D effect
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.005);

  // Generate the "rippled sphere" with spikes
  let detail = 30; // Number of radial and vertical divisions
  for (let i = 0; i < spectrum.length; i += 8) {
    let freqAmplitude = spectrum[i];
    let r = map(freqAmplitude, 0, 255, 100, 400); // Map amplitude to spike height
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);

    // Loop to draw spikes across the spherical surface
    for (let lat = 0; lat < PI; lat += PI / detail) {
      let x = sin(lat) * cos(angle) * r;
      let y = cos(lat) * r * 0.8; // Scale the y-axis for a compressed effect
      let z = sin(lat) * sin(angle) * r;

      stroke(map(freqAmplitude, 250, 175, 100, 255)); // Dynamic brightness
      strokeWeight(0.8);

      line(0, 0, 0, x, y, z); // Draw radial lines outward
    }
  }
}
