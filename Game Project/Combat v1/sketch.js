let t;

function setup() {
  createCanvas(windowWidth, windowHeight);

  t = new Tank(createVector(windowWidth/2, windowHeight/2), 0, 0.05, createVector(0,0), 0);
}

function draw() {
  background(255);

  t.drawTank();
  t.moveMe();
  t.updatePos();


}

class Tank {
  constructor(pos, heading, angle, vel, force) {
    this.pos = pos;
    this.heading = heading;
    this.angle = angle;
    this.vel = vel;
    this.force = force;

asdfasdfasdf
  }

  // Draw the tank at 0,0, then translate to the current position, also rotate
  drawTank() {
    stroke("black");
    strokeWeight(10);
    fill(0,0,0);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading - PI/2)
    rect(-20,-15,40,30);

    rect(-2,15,4,20);
    pop();
  }

  updatePos(){
    this.pos.add(this.vel);
  }

  moveMe(){
    if (keyIsDown(UP_ARROW)) { //if you hold the up arrow, move up by speed
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(2)
      //this.vel.add(force)
      this.vel = force;
      //print(this.vel)
      //print(this.heading)

    } else {
      this.vel = createVector(0,0);
    }

    //if (keyReleased(UP_ARROW)) { //if you hold the up arrow, move up by speed
    //   this.vel = createVector(0,0);

    //}

    if (keyIsDown(DOWN_ARROW)) { // if you hold the down arrow, move down by speed

    }

    if (keyIsDown(LEFT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading -= this.angle
    }

    if (keyIsDown(RIGHT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading += this.angle
    }

  }

}
