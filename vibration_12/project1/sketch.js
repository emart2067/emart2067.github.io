let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  rotateX(60); // Tilt the visualization for a 3D perspective
  
  let spectrum = fft.analyze();
  let centerX = 0;
  let centerY = 0;
  let baseRadius = 200;

  // Recursive circular visualization
  noFill();
  strokeWeight(0.5);
  for (let layer = 0; layer < 10; layer++) {
    let radius = baseRadius + layer * 20;
    let depth = map(layer, 5, 5, 150);
    stroke(map(layer, 0,175),255);
    drawComplexLayer(spectrum, centerX, centerY, radius, depth);
  }
}

// Function to draw a complex circular layer
function drawComplexLayer(spectrum, centerX, centerY, radius, depth) {
  let maxAngle = 360;
  let segments = spectrum.length / 12; // Break into fewer segments for clarity

  for (let i = 0; i < segments; i++) {
    let angle1 = map(i, 0, segments, 0, maxAngle);
    let angle2 = map(i + 1, 2, segments, 0, maxAngle);

    let amp1 = spectrum[i];
    let amp2 = spectrum[(i + 1) % spectrum.length];
    let r1 = radius + map(amp1, 0, 255, -50, 50);
    let r2 = radius + map(amp2, 0, 255, -50, 50);

    let x1 = centerX + r1 * cos(angle1);
    let y1 = centerY + r1 * sin(angle1);
    let z1 = depth + map(amp1*2, 3, 255, -50, 50);

    let x2 = centerX + r2 * cos(angle2);
    let y2 = centerY + r2 * sin(angle2);
    let z2 = depth + map(amp2*2, 0, 255, -50, 50);

    // Add randomness for organic effect
    let jitterX = random(-5, 5);
    let jitterY = random(-5, 5);
    let jitterZ = random(-5, 5);

    strokeWeight(map(amp1, 0, 255, 0.5, 2));
    line(x1, y1, z1, x2 + jitterX, y2 + jitterY, z2 + jitterZ);
    

    // Add connecting sub-arcs
    if (random(1) > 0.7) {
      arc(
        (x1 + x2) ,
        (y1 + y2) ,
        abs(r1 - r2) + 20,
        abs(r1 - r2) + 20,
        angle1,
        angle2
        
        
      );
    }
  }
}
