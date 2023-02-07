let particles = []; //an array to keep all the particles
let hitCounter = 0; //A value which keeps track of the hit number of circles when coliding with the borders
let rippleRadius = 0; //The ripple value keeps track of the circle radius

function setup() {
  createCanvas(400, 400); //creates a canvas of 400x400
}

function draw() {
  background(255); //bg color of 255
  noStroke(); //removes the strokes

  //if the hitcounter is less than 1000, draw a container
  if (hitCounter < 1000) {
    rectMode(CENTER); //sets the mode to center
    noStroke(); //removes the stroke
    fill("black"); //makes the fill gray
    rect(width/2, height/2, 200, 200); //draws at the center of the screen
  } else { //if hitcounter is greater than 1000
    noFill(); //removes circle fill
    strokeWeight(2); //set outline to 2
    stroke(200, 200, 200); //adds a stoke to replicate the burst effect
    ellipse(width/2, height/2, rippleRadius, rippleRadius);//creates an ellipse with the rippleRadius
    rippleRadius += 6; //Make the explosion bigger by adding to the circle radius
  }

//Everytime a particle is pushed to the particles array, run the update method and display
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(); //runs update method
    particles[i].display(); //runs display method
    
  }
}

function mousePressed() {
  //Pushes a new particle into the particle array on every mousepress based on the mouseX and mouseY
  particles.push(new Particle(mouseX, mouseY));
}
//creates a particle class
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y); //vector to store the position of the particle
    this.vel = createVector(random(-5, 5), random(-5, 5)); // A vector to store the velocity of the particle, each particle has a random velocity
    this.size = random(10, 30); // A variable to store the size of the particle which is also random
    this.trail = []; //An array to store the trail of the particle
  }
//update method
  update() {
    //current position of the trail based on the circle's pos
    this.trail.push(this.pos.copy());
    if (this.trail.length > 100) { //if trail is less than 100 in length
      this.trail.shift();//removes the oldest trail position in the arr
    }
    //adds the velocity to the array
    this.pos.add(this.vel);
    //ball out of bounds hit. Basically when it reaches the edges x-axis
    if (hitCounter < 1000) {
      if (this.pos.x < width/2-100 || this.pos.x > width/2+100) {
        // reverse the velocity
        this.vel.x *= -1;
        hitCounter++; //adds one to the hitcounter
      }
      //ball out of bounds hit. Basically when it reaches the edges y-axis
      if (this.pos.y < height / 2 - 100 || this.pos.y > height / 2 + 100) {
        // reverse the velocity on the y axis
        this.vel.y *= -1;
        hitCounter++;//adds one to the hitcounter
      }
    }
    // If hitCounter is equal to or greater than 1000
    if (hitCounter >= 1000) {
      //new random velocity after the container pop
      this.vel = createVector(random(-10, 10), random(-10, 10));
    }
    // if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
    //   this.fadingOut = true;
    // }
  }
  //display method
  display() {
    //fill map to define the color of the circles based on the hitcounter
    //Using the hitcounter with a range of 0 to 1000, it switches from blue to red
    fill(map(hitCounter, 0, 1000, 0, 255,0.5), 0, map(hitCounter, 0, 1000, 255, 0,0.5));
    
    //This creates the trail
    for (let i = 0; i < this.trail.length - 1; i++) {
      let p1 = this.trail[i]; // current p1
      let p2 = this.trail[i + 1]; // next point

      //Similar to the map of the balls for the color of the stroke
      stroke(map(hitCounter, 0, 1000, 0, 255), 0, map(hitCounter, 0, 1000, 255, 0));
      //Stroke weightS
      strokeWeight(0.31);
      //Draws a line between the first and second points to create the trail effect
      line(p1.x, p1.y, p2.x, p2.y);
    }
    noStroke(); //Removes stroke
    // Draw the first circle 
    circle(this.pos.x, this.pos.y, this.size);
    fill("black"); //Black fill
    circle(this.pos.x, this.pos.y, this.size-10); //creates a 2nd circle in the middle
    
  }
}

