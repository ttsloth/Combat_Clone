// ATARI Combat
// Programmed by Michael DeLaurier
// January 15, 2019

// Variables for canvas width and height, global
var canH = 586;
var canW = 900;

// Variables for top colors, global
var scoreColor;
var topColor;
var showing = 0;
var end = false;

// Variables for explosion animation, global
var myExplosion;
var explosionSprite;

// Variables for buttons, global
var courseButton;
var instructionButton;
var resetButton;

// Variables for courses, global
var currentCourse = drawCourse2;
var currentBack = drawBackground2;

// Variables for bullent boutncing, global
var bounceSlider;
var maxBounce = 7;

// Preloads all sounds, sprites, and fonts.
function preload() {
  soundFormats('mp3', 'ogg');
  pewSound = loadSound('pew.mp3');
  explodeSound = loadSound('explosion.mp3');
  bounceSound = loadSound('bounce.mp3');
  explosionSprite = loadImage('explosion-sprite.png');
  myFont = loadFont('INVASION2000.TTF');
}

function setup() {
  // Creates a canvas with the canH and canW variables
  createCanvas(canW,canH);

  // Creates Red Tank
  t1 = new Tank(250,0,0,createVector(65, 295), 0, 0.05, createVector(0,0), 0, PI/2);
  // Creates Blue Tank
  t2 = new Tank(0,0,255,createVector(835, 295), PI, 0.05, createVector(0,0), 0, PI/2);

  // Creates Red Tank Bullets
  b1 = new Bullet(0, 0, 0, 0, 0, 0, (p5.Vector.fromAngle(t1.heading)).mult(8), 8, 1);
  // Creates Blue Tank Bullets
  b2 = new Bullet(0, 0, 0, 0, 0, 0, (p5.Vector.fromAngle(t2.heading)).mult(8), 8, 2);

  // Creates Red Tank Explosion
  myExplosion1 = new Explosion();

  // Creates Blue Tank Explosion
  myExplosion2 = new Explosion();

  var col = color(255,255,255);

  // Code for all buttons and sliders

  // Change Course Button
  courseButton = createButton('Change Course');
  courseButton.position(50, 20);
  courseButton.style('background-color', col);
  courseButton.mousePressed(changeCourse);

  // Instruction Button
  instructionButton = createButton('Instructions');
  instructionButton.position(canW-150, 20);
  instructionButton.style('background-color', col);
  instructionButton.mousePressed(showInstructions);

  // Slider Code
  bounceSlider = createSlider(1, 7, 1, 1);
  bounceSlider.position(canW/2-40, 20);
  bounceSlider.style('width', '80px');
}

// Toggles between the two courses
function changeCourse(){
  if (currentCourse == drawCourse2 && currentBack == drawBackground2) {
    currentCourse = drawCourse1;
    currentBack = drawBackground1;
  } else {
    currentCourse = drawCourse2;
    currentBack = drawBackground2;
  }
}

// Shows and hides the instructions
function showInstructions(){
  if (showing == 0) {
    noStroke();
    drawInstructions();
    showing = 1;

  } else {
    fill(255,255,255)
    rect(100,100,canW-200,canH-200);
    showing = 0;
  }
}

function draw() {
  testScore();

  maxBounce = bounceSlider.value();

  if (showing == 0) {
    // Draw the first background and course
    currentCourse();
    currentBack();

    // Call all the tank functions for both tanks
    t1.drawTank();
    t2.drawTank();
    noStroke();
    currentCourse();
    t1.detectWall();
    t2.detectWall();
    t1.moveMe(65, 68, 87);
    t2.moveMe(LEFT_ARROW, RIGHT_ARROW, UP_ARROW);
    t1.updatePos();
    t2.updatePos();

    // Call all the bullet functions for all bullets
    b1.detectCollision();
    b1.drawBullet();
    b1.moveBullet();
    b2.detectCollision();
    b2.drawBullet();
    b2.moveBullet();

    // Call the score function
    showScore();

    // Draws the explosions
    myExplosion1.drawExplosion();
    myExplosion2.drawExplosion();


  }
  sliderText();
}

function keyPressed(){
  // Shoots a bullet from the blue tank
  addBullet(18,t2,b2);

  // Shoots a bullet from the red tanks
  addBullet(32,t1,b1);
}

// Code for all bullets
class Bullet {
  constructor(bPosx, bPosy, r, g, b, a, bHeading, w, whichTank){
      // (X Position of Bullet, Y Position of Bullet, Red, Blue, Green, Alpha, Bullet Heading, Bullet Width)
      this.bPosx = bPosx;
      this.bPosy = bPosy;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.bHeading = bHeading;
      this.w = w;
      this.score = 0;

      this.whichTank = whichTank;

      // Tests the color of the position of the bullet, does not need to be passed through
      this.testPos;
      this.testPosUp;
      this.testPosDown;
      this.testPosLeft;
      this.testPosRight;

      this.bounceCount;
  }

  drawBullet() {  // draw a bullet on the screen at Position x and Posiiton y
        push();
        translate(this.bPosx,this.bPosy);
        strokeWeight(1);
        stroke(this.r, this.g, this.b, this.a);
        fill(this.r, this.g, this.b, this.a);
        ellipse(0, 0, this.w, this.w);
        pop();
  }

  moveBullet(){ // Update the position of the bullet to make it move accross the screen
    var newPos = [createVector(66, 120), createVector(825, 120), createVector(825, 510), createVector(66, 510)];

    if (this.bounceCount == maxBounce) {
      this.a = 0
    }

    if (this.testPos[0] == t1.r) { // If Bullet is touching the red tank
      if (this.a != 0) {
        myExplosion1.reset(t1);

        if (this.whichTank == 1) {
          b2.score += 1;
        } else {
          this.score += 1;
        }

        t1.pos = newPos[Math.floor(Math.random()*newPos.length)];
        explodeSound.setVolume(0.1);
        explodeSound.play();
      }
      this.a = 0;
    }

    if (this.testPos[2] == t2.b) { // If bullet is touching a blue tank
      if (this.a != 0) {
        myExplosion2.reset(t2);
        if (this.whichTank == 2) {
          b1.score += 1;
        } else {
          this.score += 1;
        }
        t2.pos = newPos[Math.floor(Math.random()*newPos.length)];
        explodeSound.setVolume(0.1);
        explodeSound.play();
      }
      this.a = 0;
    }

    if ((this.testPosUp[0] == t1.testCourse || this.testPosDown[0] == t1.testCourse) && this.bounceCount != maxBounce) { // If Bullet is touching a wall
      this.bHeading.y = -this.bHeading.y;
      this.bounceCount++;
    }

    if ((this.testPosLeft[0] == t1.testCourse || this.testPosRight[0] == t1.testCourse) && this.bounceCount != maxBounce){
      this.bHeading.x = -this.bHeading.x;
      this.bounceCount++;
    }
    if (this.bounceCount != maxBounce) {
      // if (this.bPosx < 0) {
      //   this.bPosx = canW;
      // } else if (this.bPosx > canW) {
      //   this.bPosx = 0;
      // }
      if (this.bPosy < 55) {
        this.bPosy = canH;
        this.bPosx = this.bPosx+canW/2;
      } else if (this.bPosy > canH) {
        this.bPosy = 55;
        this.bPosx = this.bPosx-canW/2;
      }
      this.bPosx = this.bPosx+this.bHeading.x;
      this.bPosy = this.bPosy+this.bHeading.y;

    }
  }

  detectCollision(){ // Gets the color at the ball's position
    this.testPos = get(this.bPosx, this.bPosy);
    this.testPosUp = get(this.bPosx, this.bPosy-(this.w/2+2));
    this.testPosDown = get(this.bPosx, this.bPosy+(this.w/2+2));
    this.testPosLeft = get(this.bPosx-(this.w/2+2), this.bPosy);
    this.testPosRight = get(this.bPosx+(this.w/2+2), this.bPosy);
  }

}

// All code for exlosions
class Explosion {
  constructor(){
    this.framesElapsed = 0;
    this.animationFrame = 0;
  }

  reset(tank) {
    this.x = tank.pos.x;
    this.y = tank.pos.y
    this.framesElapsed = 0;
    this.animationFrame = 0;
  }

  drawExplosion(){
    this.framesElapsed ++;
    if (this.framesElapsed %6 == 0){
      this.animationFrame ++;
    }
    image(explosionSprite, this.x-74, this.y-50, 148, 100, 148*this.animationFrame, 0, 148, 100)
  }
}

// All code for tanks
class Tank {
  constructor(r, g, b, pos, heading, angle, vel, force, startAngle) {
    // (Red, Green, Blue, Position, Heading, Angle, Velocity, Force, Starting Angle)
    this.r = r;
    this.g = g;
    this.b = b;
    this.pos = pos;
    this.heading = heading;
    this.angle = angle;
    this.vel = vel;
    this.force = force;
    this.startAngle = startAngle;

    // Testing the color of the four courners, does not need to be passed through
    this.testTopRight;
    this.testBotRight;
    this.testTopLeft;
    this.testBotLeft;

    this.testCourse;

  }

  drawTank() { // Draw the tank at 0,0, then translate to the current position, also rotates
    stroke(this.r,this.g,this.b);
    strokeWeight(1);
    fill(this.r,this.g,this.b);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading - this.startAngle);

    // Draws the tank shape
    rectMode(CORNER);
    rect(-18,-15,10.5,30);
    rect(9,-15,10.5,30);
    rect(-9,-6,18,15);
    rect(-3,9,7.5,21);

    pop();
  }

  updatePos() { // Constatly updates the position of the tank
    var offset = 20
    // if (this.pos.x < -offset) {
    //   this.pos.x = canW+offset;
    // } else if (this.pos.x > canW+offset) {
    //   this.pos.x = -offset;
    // }
    if (this.pos.y < 55-offset ) {
      this.pos.y = canH+offset;
      this.pos.x = this.pos.x+canW/2
    } else if (this.pos.y > canH+offset) {
      this.pos.y = 55-offset;
      this.pos.x = this.pos.x-canW/2
    }
    this.pos.add(this.vel);
  }

  detectWall() { // Tests the four corners of the tank
    this.testTopRight = get(this.pos.x+19, this.pos.y-15);
    this.testTopLeft = get(this.pos.x-18, this.pos.y-15);
    this.testBotRight = get(this.pos.x+19, this.pos.y+15);
    this.testBotLeft = get(this.pos.x-18, this.pos.y+20);
  }

  moveMe(left, right, up) {
    if (keyIsDown(up) && (this.testTopRight[0] != this.testCourse) && (this.testBotRight[0] != this.testCourse) && (this.testTopLeft[0] != this.testCourse) && (this.testBotLeft[0] != this.testCourse))  { //if you hold the up arrow, move up by speed
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(0.8);
      this.vel = force;

    } else if (keyIsDown(up)) {
      var direction = p5.Vector.fromAngle(this.heading + PI);
      this.pos.x += direction.x*20;
      this.pos.y += direction.y*20;
      console.log("detected")

    } else {
      this.vel = createVector(0,0);
    }

    if (keyIsDown(left)) { // if you hold the down arrow, move down by speed
        this.heading -= this.angle;
    }

    if (keyIsDown(right)) { // if you hold the down arrow, move down by speed
        this.heading += this.angle;
    }
  }
}

// Shoots a bullet
function addBullet(k,tank,bullet){
  // Checks to see if there is already a visible bullet in motion
  var drawOk = 1;
  if (bullet.a == 255) {
    drawOk = 0;
  }

  // Moves the bullet to the end of the turret, makes it opaque, and sends it off at correct angle and speed
  if ((keyCode === k) && drawOk) {
    var HeadAdd2 = p5.Vector.fromAngle(tank.heading);
    bullet.a = 255;
    bullet.bPosx = tank.pos.x+HeadAdd2.x*37;
    bullet.bPosy = tank.pos.y+HeadAdd2.y*37;
    bullet.bHeading = (p5.Vector.fromAngle(tank.heading)).mult(6);
    pewSound.setVolume(0.1);
    pewSound.play();
    bullet.bounceCount = 0;

  }
}

// Displays the Score
function showScore(){
  textFont(myFont);
  noStroke();
  fill(scoreColor);
  textSize(32);
  text(b1.score, canW/4, 40);
  text(b2.score, (canW/4)*3, 40);
}

// Draws the instructions for the game
function drawInstructions(){
  textFont(myFont);
  fill(255,255,255);
  rect(100,100,canW-200,canH-200);
  fill(0,0,0);
  textStyle(NORMAL);
  textSize(17);
  text('Game Clone by Michael DeLaurier', 120, 170);
  textSize(20);
  fill(t1.r,t1.g,t1.b);
  text('Left Tank: AWD to move, shoot with space bar.', 120, 230);
  fill(t2.r,t2.g,t2.b);
  text('Right Tank: Arrow keys to move, shoot with option key.', 120, 265);
  fill(50,50,50);
  text('Use the Change Course button to switch courses,', 120, 325);
  text('there is no point max, the game is endless.', 120, 360);
  fill(100,100,100);
  text('Use the slider at the top of the screen to change the', 120, 420)
  text('amount of times the bullet can bounce.', 120, 455)

  fill(0,0,0);
  textStyle(BOLD);
  textSize(32);
  text('Atari Combat', 120, 150);
}

var winningPlayer;

function drawGameOver(){
  textFont(myFont);
  background(255,0,0)
  textStyle(BOLD);
  textSize(100);
  text('Game Over!', 180, 265);
  textSize(50);
  text('Player ' + winningPlayer + ' Wins!',290,360)
  textSize(25);
  textStyle(NORMAL);
  text('Refresh to play again.',340 ,400)
}

function testScore() {
  if (b1.score == 7) {
    showing = 1;
    winningPlayer = 1;
    drawGameOver()
  }

  if (b2.score == 7) {
    showing = 1;
    winningPlayer = 2;
    drawGameOver()
  }
}

//Draws the first course
function drawCourse1() {
  t1.testCourse = 254;
  t2.testCourse = 254;

  t1.r = 250
  t1.g = 0
  t1.b = 0

  t2.r = 0
  t2.g = 0
  t2.b = 255

  b1.r = 0
  b1.g = 0
  b1.b = 0

  b2.r = 0
  b2.g = 0
  b2.b = 0

  scoreColor = "black"
  topColor = "black"

  fill(254, 176, 91);

  rect(0,55,canW/4-50,20);
  rect(canW/4+50,55,canW/4*3+50,20);
  rect(0,canH-20,canW/4*3-50,20);
  rect(canW/4*3+50,canH-20,canW/4+50,20);

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

  fill(251, 250, 250);
  rect(0,0,canW,55);
}

// Draws the first background
function drawBackground1(){
  background(187, 207, 82);
}

//Draws the second course
function drawCourse2() {
  t1.testCourse = 40;
  t2.testCourse = 40;
  t1.r = 171
  t1.g = 223
  t1.b = 106

  t2.r = 208
  t2.g = 207
  t2.b = 75

  b1.r = 253
  b1.g = 253
  b1.b = 253

  b2.r = 253
  b2.g = 253
  b2.b = 253

  scoreColor = "black"
  topColor = "black"


  fill(40, 105, 153);

  fill(40, 105, 153);

  rect(0,55,canW/4-50,20);
  rect(canW/4+50,55,canW/4*3+50,20);
  rect(0,canH-20,canW/4*3-50,20);
  rect(canW/4*3+50,canH-20,canW/4+50,20);

  rect(0,55,20,canH-55);
  rect(canW-20,55,20,canH-55);

  rect(canW/8, (canH-20)/3, 20,210);
  rect(canW/8, (canH-20)/3, -20,20);
  rect(canW/8, (canH-20)/3*2+1, -20,20);
  rect((canW/8)*7-20, (canH-20)/3, 20,210);
  rect((canW/8)*7-20, (canH-20)/3, 40,20);
  rect((canW/8)*7-20, (canH-20)/3*2+1, 40,20);

  rect((canW/2)-15,(canH-20)/4,30,100);
  rect((canW/2)-15,(((canH-20)/4)*3)-20,30,100);

  rect((canW/2)-100,((canH-20)/2)+20,-100,30);
  rect((canW/2)+100,((canH-20)/2)+20,100,30);

  fill(245,245,245)
  rect(0,0,canW,55)
}

// Draws the second background
function drawBackground2(){
  background(48, 23, 160);
}

function sliderText() {
  fill(topColor)
  noStroke();
  textFont(myFont);
  textSize(17);
  text('Bullet Bounce', 400, 18);
  text('0', 414, 50);
  text('6', 480, 50);
}
