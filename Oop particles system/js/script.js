/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
function preload() {

}
let ball;
let cont;
var hit = false;

/**
Description of setup
*/
function setup() {
    createCanvas(400, 400);
    background(200);
    ball = new Ball();
    cont = new Container();

}


/**
Description of draw()
*/
function draw() {
    cont.display();
    ball.display();
    ball.move();
    ball.collide(cont);

}

class Ball {
    constructor() {
        this.x = width/2;
        this.y = height / 2;
        this.diam = 20;
        this.speed = 5;
        this.hit = false;
        this.collide;
    }
    move() {
        this.x += random(-this.speed, this.speed);
        // this.y += random(-this.speed, this.speed);

    }
    display() {
        
        circle(this.x, this.y, this.diam);
        
    }
    collision(obj) {
         hit = collideRectCircle(this.x, this.y, obj.x,obj.y,obj.w,obj.h);
    }
}
class Container{
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.w = width/2;
        this.h = height/2;
    }
    display() {
        noFill();
        rect(this.x - 100, this.y - 100, this.w, this.h);
        fill(255);
    }
}