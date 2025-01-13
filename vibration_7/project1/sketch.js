let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // Set up microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Set up FFT for audio analysis
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);

  // Enable 3D rotation
  rotateY(frameCount * 0.5);
  rotateX(frameCount * 0.2);

  // Analyze sound frequencies
  let spectrum = fft.analyze();

  // Map frequency data onto a sphere
  let detail = 60; // Sphere resolution (number of vertices)
  let radius = 200; // Base radius of the sphere

  for (let lat = 0; lat < 180; lat += 180 / detail) {
    for (let lon = 0; lon < 360; lon += 360 / detail) {
      let index = int(map(lat + lon, 0, 840, 0, spectrum.length));
      let amplitude = spectrum[index];

      // Map the amplitude to adjust the radius
      let r = radius + map(amplitude, 0, 255, -50, 100);

      // Calculate 3D coordinates for the sphere
      let x = r * sin(lat) * cos(lon);
      let y = r * sin(lat) * sin(lon);
      let z = r * cos(lat);

      // Set color and draw point
      stroke(255);
      strokeWeight(map(amplitude, 0, 255, 1, 5));
      point(x, y, z);
    }
  }
}
