/**
 * Sound-reactive Lissajous figures with dynamic frequency modulation
 *
 * KEYS
 * 1/2               : frequency x -/+
 * 3/4               : frequency y -/+
 * arrow left/right  : phi -/+
 * 7/8               : modulation frequency x -/+
 * 9/0               : modulation frequency y -/+
 * s                 : save png
 */
'use strict';
var sketch = function(p) {
  var pointCount = 1000;
  var lissajousPoints = [];
  var freqX = 4;
  var freqY = 7;
  var phi = 15;
  var modFreqX = 3;
  var modFreqY = 2;
  var lineWeight = 0.1;
  var lineColor;
  var lineAlpha = 50;
  var connectionRadius = 100;
  var connectionRamp = 6;
  
  // Sound-related variables
  var mic;
  var fft;
  var soundSensitivity = 1.0;
  var frequencyBands = 64;
  
  p.setup = function() {
    p.createCanvas(1000, 1000);
    p.colorMode(p.RGB, 255, 255, 255, 100);
    p.noFill();
    
    // Initialize microphone and FFT
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(0.9, frequencyBands);
    fft.setInput(mic);
    
    lineColor = p.color(0, 50);
    calculateLissajousPoints();
    drawLissajous();
  };
  
  function calculateLissajousPoints() {
    // Analyze sound spectrum
    var spectrum = fft.analyze();
    
    // Dynamically adjust frequencies based on sound
    var lowFreq = p.map(p.max(spectrum.slice(0, frequencyBands/2)), 0, 255, 1, 10);
    var highFreq = p.map(p.max(spectrum.slice(frequencyBands/2)), 0, 255, 1, 10);
    
    // Modify frequencies with sound input
    freqX = 4 + lowFreq * soundSensitivity;
    freqY = 7 + highFreq * soundSensitivity;
    
    for (var i = 0; i <= pointCount; i++) {
      var angle = p.map(i, 0, pointCount, 0, p.TAU);
      var x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
      var y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
      x *= p.width / 2 - 30;
      y *= p.height / 2 - 30;
      lissajousPoints[i] = p.createVector(x, y);
    }
  }
  
  function drawLissajous() {
    p.background(0);
    p.strokeWeight(lineWeight);
    p.push();
    p.translate(p.width / 2, p.height / 2);
    
    // Adjust line color and alpha based on overall sound level
    var volume = mic.getLevel();
    var dynamicAlpha = p.map(volume, 0, 1, 10, 100);
    var dynamicColor = p.color(255, dynamicAlpha);
    
    for (var i1 = 0; i1 < pointCount; i1++) {
      for (var i2 = 0; i2 < i1; i2++) {
        var d = lissajousPoints[i1].dist(lissajousPoints[i2]);
        var a = p.pow(1 / (d / connectionRadius + 1), 6);
        if (d <= connectionRadius) {
          p.stroke(dynamicColor, a * lineAlpha);
          p.line(
            lissajousPoints[i1].x,
            lissajousPoints[i1].y,
            lissajousPoints[i2].x,
            lissajousPoints[i2].y
          );
        }
      }
    }
    p.pop();
  }
  
  p.draw = function() {
    calculateLissajousPoints();
    drawLissajous();
  };
  
  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(p.getTimestamp(), 'png');
    if (p.key == '1') freqX--;
    if (p.key == '2') freqX++;
    freqX = p.max(freqX, 1);
    if (p.key == '3') freqY--;
    if (p.key == '4') freqY++;
    freqY = p.max(freqY, 1);
    if (p.keyCode == p.LEFT_ARROW) phi -= 15;
    if (p.keyCode == p.RIGHT_ARROW) phi += 15;
    if (p.key == '7') modFreqX--;
    if (p.key == '8') modFreqX++;
    modFreqX = p.max(modFreqX, 1);
    if (p.key == '9') modFreqY--;
    if (p.key == '0') modFreqY++;
    modFreqY = p.max(modFreqY, 1);
    
    console.log('freqX: ' + freqX + ', freqY: ' + freqY + ', phi: ' + phi + ', modFreqX: ' + modFreqX + ', modFreqY: ' + modFreqY);
  };
};

var myp5 = new p5(sketch);