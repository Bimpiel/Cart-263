/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let playerOne;
let playerTwo;
let one = 0;
let two = 0;
let movX = 0;
let movY = 0;
let arr = [];
var hit = false;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
createCanvas(500,200);

}


/**
Description of draw()
*/
function draw() {
    background('grey');
    initial();
    ball();

}
function initial(){
    playerOne = rect(50,(one + (height/2))- 25,10,50);
    playerTwo = rect(450,(two + (height/2))- 25,10,50);
}
function ball(){
    hit = circle(width/2 +movX,height/2 +movY,20);

    //movement
    movX++;
    
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
      two = two - 5;
    } 
    if (keyCode === DOWN_ARROW) {
        two = two + 5;
      } 
      if (keyCode === 87) {
        one = one - 5;
      } 
      if (keyCode === 83) {
        one = one + 5;
      } 
  }
