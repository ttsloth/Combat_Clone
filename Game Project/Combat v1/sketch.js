let t;

function setup() {
  createCanvas(windowWidth, windowHeight);

  t = new Tank(createVector(windowWidth/2, windowHeight/2), 0, 0.05, createVector(0,0), 0, 0);
}

function draw() {
  background(255);

  t.drawTank();
  fill(255,0,0);
  rect(400,100,20,200);
  t.detectWall();
  t.moveMe();


  t.updatePos();

  noStroke();






}

class Tank {
  constructor(pos, heading, angle, vel, force, testRight) {
    this.pos = pos;
    this.heading = heading;
    this.angle = angle;
    this.vel = vel;
    this.force = force;
    this.testRight = testRight
  }

  // Draw the tank at 0,0, then translate to the current position, also rotate
  drawTank() {
    stroke("black");
    strokeWeight(1);
    fill(0,0,0);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading - PI/2)
    rect(-20,-15,40,30);

    rect(-6,15,12,20);
    pop();
  }

  updatePos(){
    this.pos.add(this.vel);
  }

  detectWall(){
    this.testRight = get(this.pos.x, this.pos.y)
    //print(this.testRight)
  }

  moveMe(){
    if (keyIsDown(UP_ARROW))  { //if you hold the up arrow, move up by speed
      console.log(this.testRight);

      if (this.testRight[0] != 255) {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(2)
        this.vel = force;
      }
    } else{
      this.vel = createVector(0,0);
    }

    if (keyIsDown(LEFT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading -= this.angle
    }

    if (keyIsDown(RIGHT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading += this.angle
    }

  }

}
