let fft;
let mic;
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Set up microphone input
  mic = new p5.AudioIn();
  mic.start();
  
  // Set up FFT for frequency analysis
  fft = new p5.FFT(0.9, 64);
  fft.setInput(mic);
  
  // Generate random points on a sphere
  for (let i = 0; i < 100; i++) {
    let theta = random(TWO_PI);
    let phi = random(PI);
    let r = 120;  // Radius of the sphere
    
    let x = r * sin(phi) * cos(theta);
    let y = r * sin(phi) * sin(theta);
    let z = r * cos(phi);
    
    points.push(createVector(x, y, z));
  }
}

function draw() {
  background(0);
  stroke(255, 100);
  
  // Rotate for a dynamic effect
  rotateY(frameCount * 0.02);
  rotateX(frameCount * 0.01);
  
  // Get sound frequency spectrum
  let spectrum = fft.analyze();

  // Draw points
  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      let p2 = points[j];
      
      // Calculate distance between points
      let d = p1.dist(p2);
      
      // Set line thickness or visibility based on sound level
      let threshold = map(spectrum[i % spectrum.length], 0, 255, 50, 200);
      
      if (d < threshold) {
        strokeWeight(map(spectrum[i % spectrum.length], 0, 255, 0.5, 2));
        line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
