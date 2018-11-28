let b;
let p1;
let p2;
let numbers = [-5,5];
let score1 = 0
let score2 = 0

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Creates one ball and two paddles
  b = new Ball(windowWidth/2, windowHeight/2,255,0,0,numbers[int(random(0,numbers.length))],numbers[int(random(0,numbers.length))],20);
  p1 = new Paddle(40,windowHeight/2,5)
  p2 = new Paddle(windowWidth-40,windowHeight/2,5)
}

function draw(){
  background(220);

  // Score Code
  textSize(32);
  strokeWeight(1)
  fill(0, 102, 153);
  text(score1, windowWidth/2-67, 50);
  text(score2, windowWidth/2+50, 50);

  strokeWeight(3)
  fill(50,50,50)
  line(windowWidth/2,0,windowWidth/2,windowHeight)
  // Calls all actions from the functions below

  b.drawBall();
  b.moveBall();
  b.bounceBall();
  b.bounceBall2();
  b.bounceBall3();

  p1.drawPaddle();
  p1.moveMe1();

  p2.drawPaddle();
  p2.moveMe2();

}


//ball class from which to create new balls with similar properties.
class Ball {

  // (x position, y position, red amount, green amount, blue amount, x speed, y speed, width)
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

  // Draws the ball at a specific location
	drawBall(){  // draw a ball on the screen at x,y
    		strokeWeight(1);
    		fill(this.r,this.g,this.b);
		    ellipse(this.x ,this.y,this.w,this.w);
	}

  // Moves the ball depending on the x and y speed.
	moveBall(){ //update the location of the ball, so it moves across the screen

		this.x = this.x+this.speedx;
		this.y = this.y+this.speedy;
	}

  // Makes the ball bounce off the edges of the screen
  bounceBall(){
    		if (this.x >= width-5){
      			this.speedx = -this.speedx;
            score1 += 1
    		} else if (this.x <= 5) {
          this.speedx = -this.speedx;
          score2 += 1
        } else if (this.y >= height-10) {
          this.speedy = -this.speedy;
        } else if (this.y <= 5) {
          this.speedy = -this.speedy;
        }

      }
  // Makes the ball bounce off the left paddle, working on this.
  bounceBall2(){
    if (this.y < p1.py+60 && this.y > p1.py-60 && this.x < p1.px+10) {
        this.speedx = -this.speedx;
    }
  }

  // Makes the ball bounce off the right paddle, working on this.
  bounceBall3(){
    if (this.y < p2.py+60 && this.y > p2.py-60 && this.x > p2.px-10) {
        this.speedx = -this.speedx;
    }
  }


}

//


class Paddle {
  // (x position, y position, y speed)
  constructor(px,py,pspeedy) {
    this.px = px;
    this.py = py;
    this.pspeedy = pspeedy;
  }

  // Draws the paddle in a specific location.
  drawPaddle() {
    stroke("black");
    strokeWeight(10);
    line(this.px,this.py-60,this.px,this.py+60);
  }

  // Moves the paddle up and down with the w key and s key.
  moveMe1(){
    if (this.py > 60 && keyIsDown(87)) { //if you hold the up arrow, move up by speed
       this.py -= this.pspeedy;
    }

    if (this.py < windowHeight-60 && keyIsDown(83)) { // if you hold the down arrow, move down by speed
        this.py += this.pspeedy;
    }
  }

  // Moves the paddle up and down with the up and down arrows.
  moveMe2(){
    if (this.py > 60 && keyIsDown(UP_ARROW)) { //if you hold the up arrow, move up by speed
       this.py -= this.pspeedy;
    }

    if (this.py < windowHeight-60 && keyIsDown(DOWN_ARROW)) { // if you hold the down arrow, move down by speed
        this.py += this.pspeedy;
    }
  }
}
