let t;
let bullet = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  t = new Tank(createVector(windowWidth/2, windowHeight/2), 0, 0.05, createVector(0,0), 0);
}

function draw() {
  background(255);

  t.drawTank();

  fill(254,0,0);
  rect(400,100,20,200);

  t.detectWall();
  t.moveMe();


  t.updatePos();

  noStroke();

  for (let i = 0; i < bullet.length; i++) {
      bullet[i].drawBullet();
      bullet[i].moveBullet();
    }

    console.log(t.heading)
}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array
  if (keyCode === 191) {
    let  b = new Bullet(mouseX, mouseY,0,0,0,random(-5,5),random(-5,5),8);
    bullet.push(b);
    //console.log(bullet);
  }
}

class Bullet {
  constructor(x,y,r,g,b,speedx,speedy,w){ //every ball needs an x value and a y value
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.speedx = speedx;
        this.speedy = speedy;
        this.w = w
  }

  drawBullet() {  // draw a ball on the screen at x,y
        strokeWeight(1);
        fill(this.r,this.g,this.b);
        ellipse(this.x ,this.y,this.w,this.w);
  }

  moveBullet(){ //update the location of the ball, so it moves across the screen

    this.x = this.x+this.speedx;
    this.y = this.y+this.speedy;
  }

}

class Tank {
  constructor(pos, heading, angle, vel, force) {
    this.pos = pos;
    this.heading = heading;
    this.angle = angle;
    this.vel = vel;
    this.force = force;
    this.testTopRight
    this.testBotRight
    this.testTopLeft
    this.testBotLeft

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
    this.testTopRight = get(this.pos.x+20, this.pos.y-20);
    this.testTopLeft = get(this.pos.x-20, this.pos.y-20);
    this.testBotRight = get(this.pos.x+20, this.pos.y+20);
    this.testBotLeft = get(this.pos.x-20, this.pos.y+20);
    //console.log(this.testTopRight);
  }

  moveMe(){

    if (keyIsDown(UP_ARROW) && (this.testTopRight[0] != 254) && (this.testBotRight[0] != 254) && (this.testTopLeft[0] != 254) && (this.testBotLeft[0] != 254))  { //if you hold the up arrow, move up by speed

      var force = p5.Vector.fromAngle(this.heading);
      force.mult(2);
      this.vel = force;

    } else if (keyIsDown(UP_ARROW)) {
      var direction = p5.Vector.fromAngle(this.heading + PI);
      this.pos.x += direction.x*20;
      this.pos.y += direction.y*20;

    } else {
      this.vel = createVector(0,0);
      //console.log("stopped");
    }

    if (keyIsDown(LEFT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading -= this.angle
    }

    if (keyIsDown(RIGHT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading += this.angle
    }

  }

}
