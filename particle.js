function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.prevPos = this.pos.copy();
}

Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    return this;
}

Particle.prototype.applyForce = function(force) {
    this.acc.add(force);

    return this;
}

Particle.prototype.show = function() {
    stroke(0, 5);
    strokeWeight(1);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrevPos();

    return this;
}

Particle.prototype.updatePrevPos = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
}

Particle.prototype.edges = function() {
    if (this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrevPos();
    }
    if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrevPos();
    }
    if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrevPos();
    }
    if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrevPos();
    }

    return this;
}

Particle.prototype.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];

    this.applyForce(force);

    return this;
}
