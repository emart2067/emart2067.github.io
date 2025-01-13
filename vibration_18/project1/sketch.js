let mic, fft;
let t = 0;

function setup() {
  createCanvas(windowHeight, windowWidth, WEBGL); 
  background(0);

  // Initialize the microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Set up FFT (Fast Fourier Transform) to analyze the mic input
  fft = new p5.FFT(0.8, 64);
  fft.setInput(mic);

  stroke(255, 175); 
  strokeWeight(0.8);
  noFill();
}

function draw() {
  background(0); // Fade effect for trailing

  // Analyze the microphone input and get the waveform amplitude
  let level = mic.getLevel();
  
  // Calculate amplitude and frequency modifiers based on sound level
  let ampMod = map(level, 0, 1, 100, 300); // Scale amplitude based on level
  let freqMod = map(level, 0, 1, 2, 20);   // Scale frequency based on level
  
  // Rotate the entire canvas slightly for a 3D effect
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
  beginShape();
  for (let i = 0; i < TWO_PI * 20; i += 0.1) {
    // Calculate x, y, and z coordinates
    let x = sin(3 * i + t) * ampMod + cos(2 * i) * (ampMod / 2);
    let y = cos(4 * i - t) * ampMod + sin(i) * (ampMod / 2);
    let z = sin(i * freqMod + t) * ampMod / 2; // Vary z based on frequency
    
    vertex(x, y, z); // Plot the 3D vertex
  }
  endShape();

  t += 0.01 * freqMod; // Adjust the speed based on sound frequency
}
