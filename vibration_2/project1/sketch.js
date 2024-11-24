let ParticleCount = 3000;
let radius = 100;
let noiseNum;
let Particles = new Array(ParticleCount);
let mic;
function setup() {
    createCanvas(windowHeight, windowWidth, WEBGL);
    mic = new p5.AudioIn();
    mic.start();
    for (let i = 0; i < ParticleCount; i++) {
        Particles[i] = new Particle();
    }
}
function draw() {
    let vol = mic.getLevel()*2;
    translate(-width / 2, -height / 2);
    fill(0, 20);
    noStroke();
    rect(0, 0, width/vol, height+vol);
    translate(width / 2, height / 2, radius);
    rotateX(PI * vol ); //rotateX(frameCount*0.001);
    rotateY(PI * vol);//rotateY(frameCount*0.003);
    //rotateZ(frameCount*0.002);
    for (let i = 0; i < ParticleCount; i++) {
        Particles[i].update();
   
    }
}
class Particle {
    p;
    ranCos;
    radNum;
    noiseScale = 0.01;
    constructor() {
        this.ranCos = random(-1, 1);
        this.radNum = radians(random(360));
        let xPos = radius * sqrt(1 - pow(this.ranCos, 2)) * cos(this.radNum);
        let yPos = radius * sqrt(1 - pow(this.ranCos, 2)) * sin(this.radNum);
        let zPos = radius * this.ranCos;
        this.p = new p5.Vector(xPos, yPos, zPos);
    }
    update() {
        noiseDetail(3, 0.65);
        noiseNum =
            noise(
                this.p.x * this.noiseScale,
                this.p.y * this.noiseScale,
                this.p.z * this.noiseScale
            ) * 0.01;
        let sign = 0;
        if (this.p.y > 0) {
            sign = 1;
        }
        if (this.p.y < 0) {
            sign = -1;
        }
        let aCos = acos(
            this.p.z /
                sqrt(pow(this.p.x, 2) + pow(this.p.y, 2) + pow(this.p.z, 2))
        );
        let signAcos =
            sign * acos(this.p.x / sqrt(pow(this.p.x, 2) + pow(this.p.y, 2))) +
            noiseNum;
        this.p.x = radius * sin(aCos) * cos(signAcos);
        this.p.y = radius * sin(aCos) * sin(signAcos);
        this.p.z = radius * cos(aCos) + cos(signAcos) * 1.6;
        stroke(255);
        strokeWeight(2);
      
        point(this.p.x, this.p.y, this.p.z);
    }
}
