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

let triangle = [];
let hit;
let box;
let cursor;

function setup() {
 createCanvas(400, 400);

for(let i = 0; i < 10; i++){
  triangle[i] = new Triangle();
}
box = new Box();
cursor = new Cursor();
 
}
function draw() {
  background(200);
  collideDebug(true);

  for(let i = 0; i < 10; i++){
    triangle[i].display();
    triangle[i].collide(cursor);
  }
  
  //  box.move();

  cursor.mouse(mouseX,mouseY);

  
}


class Triangle{
 constructor(){
  this.x = random(width);
  this.y = random(height);
  this.color = color(222);
  this.hit = false;

 }
 collide(cursor){
  this.hit = collideCircleCircle(this.x, this.y, cursor.x, cursor.y);
  if(this.hit){
    this.color = color(0); //set this rectangle to be black if it gets hit
  }
}
 display(){
  fill(this.color);
  circle(this.x, this.y, 20);
 }



}


class Cursor{
  constructor(){
    this.x;
    this.y;
  }
  mouse(x,y){
    this.x = x;
		this.y = y;
    circle(this.x, this.y, 30);
  }
}


class Box{
  constructor(){
    this.x = random(width);
    this.y = random(height);
  }
  move(){
    circle(mouseX, mouseY, 30);
  }
}
