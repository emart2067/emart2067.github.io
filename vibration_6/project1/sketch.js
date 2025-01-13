let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // Initialize microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Set up FFT for audio frequency analysis
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  rotateY(frameCount * 0.5); // Rotate for dynamic view

  let spectrum = fft.analyze();
  let maxLines = 30; // Number of longitude/latitude lines
  let radius = 250; // Base radius of the sphere

  noFill();
  strokeWeight(0.5);
  stroke(255);

  // Draw the base spherical grid
  for (let lat = 0; lat < 180; lat += 180 / maxLines) {
    for (let lon = 0; lon < 360; lon += 360 / maxLines) {
      let amp = spectrum[int(map(lat + lon, 0, 940, 0, spectrum.length))];
      let r = radius + map(amp*2, 0, 255, -10, 100);

      let x1 = r * sin(lat) * cos(lon);
      let y1 = r * sin(lat) * sin(lon);
      let z1 = r * cos(lat);

      let x2 = r * sin(lat + 10) * cos(lon + 10);
      let y2 = r * sin(lat + 10) * sin(lon + 10);
      let z2 = r * cos(lat + 10);

      line(x1, y1, z1, x2, y2, z2);

      // Add branching nodes
     
       
      }
    }
  
}
