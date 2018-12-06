  let t;
let bullet = [];
var canH = 586;
var canW = 900;
function setup() {

  createCanvas(canW,canH);

  t1 = new Tank(250,0,0,createVector(65, 295), 0, 0.05, createVector(0,0), 0, PI/2);
  t2 = new Tank(0,0,255,createVector(835, 295), PI, 0.05, createVector(0,0), 0, PI/2);
  b1 = new Bullet(0, 0, 0, 0, 0, 0, (p5.Vector.fromAngle(t1.heading)).mult(8), 8);
  b = new Bullet(0, 0, 0, 0, 0, 0, (p5.Vector.fromAngle(t2.heading)).mult(8), 8);
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

  b1.detectCollision();
  b1.drawBullet();
  b1.moveBullet();

  b.detectCollision();
  b.drawBullet();
  b.moveBullet();



  // for (let i = 0; i < bullet.length; i++) {
  //     bullet[i].detectCollision();
  //     bullet[i].drawBullet();
  //     bullet[i].moveBullet();
  //   }



  noStroke();
  fill(0,0,0);
  textSize(32);
  text(b1.score, canW/4, 40);
  text(b.score, (canW/4)*3, 40);

}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array


  var drawOk2 = 1;
  if (b.a == 255) {
    drawOk2 = 0;
  }

  if ((keyCode === 191) && drawOk2) {
    var HeadAdd2 = p5.Vector.fromAngle(t2.heading);
    b.a = 255
    b.bPosx = t2.pos.x+HeadAdd2.x*37
    b.bPosy = t2.pos.y+HeadAdd2.y*37
    b.bHeading = (p5.Vector.fromAngle(t2.heading)).mult(8)
  }

  var drawOk1 = 1;
  if (b1.a == 255) {
    drawOk1 = 0;
  }

  if ((keyCode === 32) && drawOk1) {
    var HeadAdd1 = p5.Vector.fromAngle(t1.heading);
    b1.a = 255
    b1.bPosx = t1.pos.x+HeadAdd1.x*37
    b1.bPosy = t1.pos.y+HeadAdd1.y*37
    b1.bHeading = (p5.Vector.fromAngle(t1.heading)).mult(8)
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
        this.score = 0;

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
    if (this.testPos[0] == 254) {

      this.a = 0;

    } else if (this.testPos[0] == 250) {

      if (this.a != 0) {
        this.score += 1
        t1.pos = createVector(65, 295)
      }
      this.a = 0;

    } else if (this.testPos[2] == 255) {

      if (this.a != 0) {
        this.score += 1
        t2.pos = createVector(835, 295)
      }
      this.a = 0

    } else {
      this.bPosx = this.bPosx+this.bHeading.x;
      this.bPosy = this.bPosy+this.bHeading.y;
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

    rectMode(CORNER);
    rect(-18,-15,10.5,30);
    rect(9,-15,10.5,30);
    rect(-9,-6,18,15);
    rect(-3,9,7.5,21);


    pop();
  }

  updatePos(){
    this.pos.add(this.vel);
  }

  detectWall(){
    this.testTopRight = get(this.pos.x+19, this.pos.y-15);
    this.testTopLeft = get(this.pos.x-18, this.pos.y-15);
    this.testBotRight = get(this.pos.x+19, this.pos.y+15);
    this.testBotLeft = get(this.pos.x-18, this.pos.y+20);
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
      console.log("detected")


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

    if ((keyIsDown(87)) && (this.testTopRight[0] != 254) && (this.testBotRight[0] != 254) && (this.testTopLeft[0] != 254) && (this.testBotLeft[0] != 254))  { //if you hold the up arrow, move up by speed

      var force = p5.Vector.fromAngle(this.heading);
      force.mult(1.5);
      this.vel = force;


    } else if (keyIsDown(87)) {
      var direction = p5.Vector.fromAngle(this.heading + PI);
      this.pos.x += direction.x*20;
      this.pos.y += direction.y*20;
      console.log(this.testTopRight)
      console.log(this.testTopLeft)
      console.log(this.testBotRight)
      console.log(this.testBotLeft)
      console.log("detected")

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
