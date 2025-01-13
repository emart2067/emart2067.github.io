let soundVisualizer = function(p) {
  // Configuration parameters
  const CONFIG = {
    pointCount: 500,
    canvas: { width: 800, height: 800 },
    baseFreqX: 4,
    baseFreqY: 7,
    modFreqX: 3,
    modFreqY: 2,
    phi: 15,
    connectionRadius: 120,
    soundSensitivity: 0.2,
    frequencyBands: 64
  };

  // State variables
  let lissajousPoints = [];
  let mic, fft;
  let lineColor;
  let freqX, freqY;
  let volumeThreshold = 0.001;

  p.setup = function() {
    p.createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);
    p.colorMode(p.RGB, 255, 255, 255, 100);
    p.noFill();
    p.frameRate(60);

    // Initialize audio input with more robust error handling
    try {
      mic = new p5.AudioIn();
      mic.start(
        // Success callback
        () => {
          console.log('Microphone successfully initialized');
          fft = new p5.FFT(0.8, CONFIG.frequencyBands);
          fft.setInput(mic);
        },
        // Error callback
        (err) => {
          console.error('Error initializing microphone:', err);
        }
      );
    } catch (error) {
      console.error("Audio initialization failed:", error);
    }

    // Soft, translucent line color
    lineColor = p.color(255, 50);
    p.frameRate(100);
  };

  function calculateLissajousPoints() {
    // Check if audio is available and above volume threshold
    let volume = mic ? mic.getLevel() : 0;
    let lowFreq = 0.2, highFreq = 0.01;

    if (fft && volume > volumeThreshold) {
      const spectrum = fft.analyze();
      
      // More nuanced frequency mapping
      lowFreq = p.map(
        p.max(spectrum.slice(0, CONFIG.frequencyBands/2)), 
        0, 255, 1, 15
      );
      highFreq = p.map(
        p.max(spectrum.slice(CONFIG.frequencyBands/2)), 
        0, 255, 1, 15
      );
    }

    // Dynamic frequency adjustment
    freqX = CONFIG.baseFreqX + lowFreq * CONFIG.soundSensitivity;
    freqY = CONFIG.baseFreqY + highFreq * CONFIG.soundSensitivity;

    // Generate Lissajous curve points
    lissajousPoints = Array.from({ length: CONFIG.pointCount + 1 }, (_, i) => {
      const angle = p.map(i, 0, CONFIG.pointCount, 0, p.TAU);
      
      const x = p.sin(angle * freqX + p.radians(CONFIG.phi)) * p.cos(angle * CONFIG.modFreqX);
      const y = p.sin(angle * freqY) * p.cos(angle * CONFIG.modFreqY);
      
      return p.createVector(
        x * (p.width / 2 - 50), 
        y * (p.height / 2 - 50)
      );
    });
  }

  function drawConnections() {
    let volume = mic ? mic.getLevel() : 0;
    
    // Dynamic alpha based on volume
    const dynamicAlpha = p.map(volume, 0, 1, 10, 100);
    const dynamicColor = p.color(255, dynamicAlpha);

    // Optimized connection drawing
    for (let i1 = 0; i1 < lissajousPoints.length; i1++) {
      for (let i2 = 0; i2 < i1; i2++) {
        const d = lissajousPoints[i1].dist(lissajousPoints[i2]);
        
        // Skip distant points
        if (d > CONFIG.connectionRadius) continue;
        
        // Weighted connection opacity
        const a = p.pow(1 / (d / CONFIG.connectionRadius + 1), 6);
        
        p.stroke(dynamicColor, a * 50);
        p.strokeWeight(0.5);
        p.line(
          lissajousPoints[i1].x,
          lissajousPoints[i1].y,
          lissajousPoints[i2].x,
          lissajousPoints[i2].y
        );
      }
    }
  }

  p.draw = function() {
    p.background(0);
    p.push();
    p.translate(p.width / 2, p.height / 2);
    
    calculateLissajousPoints();
    drawConnections();
    
    p.pop();
  };

  // Resize handler
  p.windowResized = function() {
    p.resizeCanvas(CONFIG.canvas.width, CONFIG.canvas.height);
  };
};

// Create P5 instance
var visualizerInstance = new p5(soundVisualizer);