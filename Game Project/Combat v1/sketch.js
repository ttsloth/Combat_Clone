let t;
let bullet = [];
var canH = 586;
var canW = 900;
var score1 = 0
var score2 = 0
function setup() {

  createCanvas(canW,canH);

  t1 = new Tank(253,0,0,createVector(65, 295), 0, 0.05, createVector(0,0), 0, PI/2);
  t2 = new Tank(0,0,255,createVector(835, 295), 0, 0.05, createVector(0,0), 0, PI/2);
}

function draw() {
  background(187, 207, 82);
  drawCourse();

  t1.drawTank();
  t2.drawTank();
  noStroke();
  drawCourse();
  t1.detectWall();
  t2.detectWall();
  t1.moveMe2();
  t2.moveMe1();


  t1.updatePos();
  t2.updatePos();

  for (let i = 0; i < bullet.length; i++) {
      bullet[i].detectCollision();
      bullet[i].drawBullet();
      bullet[i].moveBullet();
    }



  noStroke();
  fill(0,0,0);
  textSize(32);
  text(score1, canW/4, 40);
  text(score2, (canW/4)*3, 40);
}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array
  var HeadAdd1 = p5.Vector.fromAngle(t1.heading);
  var HeadAdd2 = p5.Vector.fromAngle(t2.heading);

  var drawOk = 1;
  for (let i = 0; i < bullet.length; i++) {
    if (bullet[i].a == 255) {
      drawOk = 0;
    }
  }

  if ((keyCode === 191) && drawOk) {
    let  b = new Bullet(t2.pos.x+HeadAdd2.x*37, t2.pos.y+HeadAdd2.y*37, 0, 0, 0, 255, (p5.Vector.fromAngle(t2.heading)).mult(8), 8);
    bullet.push(b);
  }

  if ((keyCode === 32)) {
    let  b = new Bullet(t1.pos.x+HeadAdd1.x*40, t1.pos.y+HeadAdd1.y*40, 0, 0, 0, 255, (p5.Vector.fromAngle(t1.heading)).mult(8), 8);
    bullet.push(b);
  }

}

class Bullet {
  constructor(bPosx, bPosy, r, g, b, a, bHeading, w){ //every ball needs an x value and a y value
        this.bPosx = bPosx;
        this.bPosy = bPosy;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.bHeading = bHeading;
        this.w = w;

        this.testPos;

  }

  drawBullet() {  // draw a ball on the screen at x,y
        push();
        translate(this.bPosx,this.bPosy);
        strokeWeight(1);
        stroke(this.r,this.g,this.b,this.a);
        fill(this.r,this.g,this.b,this.a);
        ellipse(0 , 0,this.w,this.w);
        pop();

  }

  moveBullet(){ //update the location of the ball, so it moves across the screen
    if ((this.testPos[0] != 254) && (this.testPos[0] != 253) && (this.testPos[2] != 255)) {
      this.bPosx = this.bPosx+this.bHeading.x;
      this.bPosy = this.bPosy+this.bHeading.y;
    } else {
      this.a = 0;
    }
  }

  detectCollision(){
    this.testPos = get(this.bPosx, this.bPosy);
  }

}

class Tank {
  constructor(r, g, b, pos, heading, angle, vel, force, startAngle) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.pos = pos;
    this.heading = heading;
    this.angle = angle;
    this.vel = vel;
    this.force = force;
    this.startAngle = startAngle;

    this.testTopRight;
    this.testBotRight;
    this.testTopLeft;
    this.testBotLeft;

  }

  // Draw the tank at 0,0, then translate to the current position, also rotate
  drawTank() {
    stroke(this.r,this.g,this.b);
    strokeWeight(1);
    fill(this.r,this.g,this.b);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading - this.startAngle);
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
  }

  moveMe1(){

    if (keyIsDown(UP_ARROW) && (this.testTopRight[0] != 254) && (this.testBotRight[0] != 254) && (this.testTopLeft[0] != 254) && (this.testBotLeft[0] != 254))  { //if you hold the up arrow, move up by speed

      var force = p5.Vector.fromAngle(this.heading);
      force.mult(1.5);
      this.vel = force;

    } else if (keyIsDown(UP_ARROW)) {
      var direction = p5.Vector.fromAngle(this.heading + PI);
      this.pos.x += direction.x*20;
      this.pos.y += direction.y*20;

    } else {
      this.vel = createVector(0,0);
    }

    if (keyIsDown(LEFT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading -= this.angle;
    }

    if (keyIsDown(RIGHT_ARROW)) { // if you hold the down arrow, move down by speed
        this.heading += this.angle;
    }

  }

  moveMe2(){

    if (keyIsDown(87) && (this.testTopRight[0] != 254) && (this.testBotRight[0] != 254) && (this.testTopLeft[0] != 254) && (this.testBotLeft[0] != 254))  { //if you hold the up arrow, move up by speed

      var force = p5.Vector.fromAngle(this.heading);
      force.mult(1.5);
      this.vel = force;

    } else if (keyIsDown(87)) {
      var direction = p5.Vector.fromAngle(this.heading + PI);
      this.pos.x += direction.x*20;
      this.pos.y += direction.y*20;

    } else {
      this.vel = createVector(0,0);
    }

    if (keyIsDown(65)) { // if you hold the down arrow, move down by speed
        this.heading -= this.angle;
    }

    if (keyIsDown(68)) { // if you hold the down arrow, move down by speed
        this.heading += this.angle;
    }

  }

}

function drawCourse() {
  fill(254, 176, 91);

  rect(0,55,canW,20);
  rect(0,canH-20,canW,20);
  rect(0,55,20,canH-55);
  rect(canW-20,55,20,canH-55);

  rect((canW/2)-20,55, 40, 60);
  rect((canW/2)-20,canH-60, 40, 60);

  rect((canW/4)-20,(canH/2)-20,40,40);
  rect((canW/4*3)-20,(canH/2)-20,40,40);

  rect((canW/2)-150,canH/4,60,20);
  rect((canW/2)-150,canH/4,20,60);
  rect((canW/2)+90,canH/4,60,20);
  rect((canW/2)+130,canH/4,20,60);

  rect((canW/2)-150,(canH/4*3)+20,60,20);
  rect((canW/2)-150,(canH/4*3)+20,20,-40);
  rect((canW/2)+90,(canH/4*3)+20,60,20);
  rect((canW/2)+130,(canH/4*3)+20,20,-40);

  rect(canW/8, (canH-20)/3, 20,210);
  rect(canW/8, (canH-20)/3, -20,20);
  rect(canW/8, (canH-20)/3*2+1, -20,20);
  rect((canW/8)*7-20, (canH-20)/3, 20,210);
  rect((canW/8)*7-20, (canH-20)/3, 40,20);
  rect((canW/8)*7-20, (canH-20)/3*2+1, 40,20);
}
