//create an empty array called balls
let balls = [];
// let canW = width
// let canH = height

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw(){
	background(220);

//	draw all the balls in that array
	for (let i = 0; i < balls.length; i++) {
	    balls[i].drawBall();
      balls[i].moveBall();
      balls[i].bounceBall();
	  }
}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array
    let  b = new Ball(mouseX, mouseY,random(100,255),random(100,255),random(100,255),random(-5,5),random(-5,5),random(8,25));
    balls.push(b);
    console.log(balls);
}

//ball class from which to create new balls with similar properties.
class Ball {

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

	drawBall(){  // draw a ball on the screen at x,y
    		stroke(0);
    		fill(this.r,this.g,this.b);
		    ellipse(this.x ,this.y,this.w,this.w);
	}

	moveBall(){ //update the location of the ball, so it moves across the screen

		this.x = this.x+this.speedx;
		this.y = this.y+this.speedy;
	}

  bounceBall(){
    		if (this.x >= width-5){
      			this.speedx = -this.speedx;
    		} else if (this.x <= 5) {
          this.speedx = -this.speedx;
        } else if (this.y >= height-10) {
          this.speedy = -this.speedy;
        } else if (this.y <= 5) {
          this.speedy = -this.speedy;
        }

      }
}
