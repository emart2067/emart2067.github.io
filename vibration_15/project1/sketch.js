let mic, fft; // Microphone input and FFT analyzer
let angle = 0; // Rotation angle

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // 3D canvas
  mic = new p5.AudioIn(); // Microphone input
  mic.start();
  fft = new p5.FFT(); // FFT analysis
  fft.setInput(mic);
  strokeWeight(2); // Smaller points
}

function draw() {
  background(0); // Black background
  orbitControl(); // Interactive rotation
  
  let spectrum = fft.analyze(); // Get frequency spectrum
  let detail = 60; // Number of points in each layer
  let layers = 8; // Number of sphere-like layers
  
  rotateY(frameCount * 0.001); // Rotate slowly around Y-axis
  rotateX(frameCount * 0.0005); // Slow X-axis rotation
  
  stroke(255, 150); // White semi-transparent points
  
  // Draw multiple layers of sphere-like point clouds
  for (let l = 0; l < layers; l++) {
    let layerRadius = map(l, 0, layers, 100, 400); // Gradual increase in layer radius
    let noiseFactor = map(sin(frameCount * 0.01 + l), -1, 1, 5, 50); // Dynamic noise factor
    
    beginShape(POINTS);
    for (let i = 0; i < TWO_PI; i += TWO_PI / detail) {
      for (let j = 0; j < PI; j += PI / detail) {
        // Base spherical coordinates
        let x = cos(i) * sin(j);
        let y = sin(i) * sin(j);
        let z = cos(j);
        
        // Use FFT spectrum data to modify vertex positions
        let index = floor(map(sin(i * j), -1, 1, 0, spectrum.length - 1));
        let amp = spectrum[index];
        let distortion = map(amp*2, 0, 256, 0, noiseFactor); // Amplitude-based distortion
        
        // Add Perlin noise for organic variation
        let noiseOffset = noise(x * 2 + l, y * 2 + l, frameCount * 0.01);
        let r = layerRadius + distortion + noiseOffset * 30; // Radius modulation
        
        let posX = x * r;
        let posY = y * r;
        let posZ = z * r;
        
        vertex(posX, posY, posZ); // Create point at distorted position
      }
    }
    endShape();
  }
}
