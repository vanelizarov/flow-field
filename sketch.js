let inc = 0.1;
let scl = 10;
let cols;
let rows;
let zoff = 0;

let fr;

let particles = [];
let flowfield = [];

window.addEventListener('resize', () => {
    resizeCanvas(this.innerWidth, this.innerHeight);
});

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    cols = floor(width / scl);
    rows = floor(height / scl);

    fr = createP('');

    for (let i = 0; i < 500; i++) {
        particles[i] = new Particle();
    }
}

function draw() {
    // background(255);

    let yoff = 0;

    for (let y = 0; y < rows; y++) {
        let xoff = 0;

        for (let x = 0; x < cols; x++) {
            let index = x + y * cols
            let angle = noise(xoff, yoff, zoff) * TWO_PI;
            let v = p5.Vector.fromAngle(angle);

            v.setMag(0.5);
            flowfield[index] = v;

            stroke(0, 50);
            strokeWeight(1);

            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();

            xoff += inc;
        }

        yoff += inc;
        zoff += 0.0003;
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i]
            .follow(flowfield)
            .update()
            .edges()
            .show();
    }

    fr.html(`fps: ${ floor(frameRate()) }`);
}
