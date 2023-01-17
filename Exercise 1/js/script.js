// Array Container which will display each X OR O
let container =
    [
        "", "", "",
        "", "", "",
        "", "", ""
    ]; 

let player = "x"; //First player which will be x
let turnPlayer; //Variable to keep track of the players
let winX = false; // X variable for win check
let winO = false; // Y variable for win check
let last = "------"; //Variable to check latest win
let reset = false; //Variable used to reset the game
let scoreX = 0; // Var to track X score
let scoreY = 0;// Var to track O score
let won = false; // Var to display last won
let timer = 5; // Var timer

let playerOne;
let playerTwo;
let one = 0;
let two = 0;
let movX = 0;
let movY = 0;
let arr = [];
var hit = false;

function setup() {
<<<<<<< HEAD
createCanvas(500,200);

=======
    createCanvas(600 , 600); //creates a 600*600 canvas
    turnPlayer = 1; //variable value for turnplayer 1, one is for X and 2 is for O. To keep track of turns
    
>>>>>>> 13cd43961fcbc2f36b3e5c76c3cddef6c8de87db
}

function draw() {
<<<<<<< HEAD
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
=======
    //Statement to display last won when one of booleans == true
    if (winX == true || winO == true) {
        won = true; // sets won to true
    }
    
conditions(); //Contains the different conditions to display each scene (win screen or game) and also resets the array container on win
    winCondition();
    
}
//Contains the different conditions to display each scene (win screen or game) and also resets the array container on win
function conditions() {
    
    scoreboard(); //Score tracker function

    //Statement to check if winX = true
    if (winX == true) {
        last = "X"; //if true, switch last won to X
        timer = 0; //set timer value to 0
    }
    else if (winO == true) {
        last = "O"; //if true, switch last won to O
        timer = 0; //set timer value to 0
    }
    else {
        //else do nothing
    }
   
    //if winX statement is false
    if (winX == false) {
        timer = timer + 0.01; //adds 0.01 to our timer value
        //if value is below 5, run the winscreen function
        if (timer < 5) {
            winScreen();
        } else {
        //else initialize game
        background(200); //bg grey
        lines(); // functions which hold the lines for the tic tac toe grid
        translate(400 - 150, 350 - 150); //middle translation
        createContainer(); //Runs the createContainer function which creates the grid
        translate(-400 + 150, -350 + 150); //removes middle translation
        }
    }
    //statement to check if X won
    if (winX == true) {
        reset = true; //set Reset value to true
        //reset container for a new game
         if (reset == true) {
            container =
            [
            "", "", "",
            "", "", "",
            "", "", ""
            ];
        reset = false;//set Reset value to false
    }
        background(200);//bg grey
        lines();// functions which hold the lines for the tic tac toe grid
        translate(400 - 150, 350 - 150);//middle translation
        createContainer(); //Runs the createContainer function which creates the grid
        translate(-400 + 150, -350 + 150);//removes middle translation
        
        winX = false; //Sets the winX value to false
    }
    // Statement to check if O won
    if (winO == true) {
        reset = true; //set Reset value to true
        //reset container for a new game
         if (reset == true) {
            container =
            [
            "", "", "",
            "", "", "",
            "", "", ""
            ];
        reset = false; //set Reset value to false
    }
        background(200);//bg grey
        lines();// functions which hold the lines for the tic tac toe grid
        translate(400 - 150, 350 - 150);//middle translation
        createContainer();//Runs the createContainer function which creates the grid
        translate(-400 + 150, -350 + 150);//removes middle translation
        winO = false;//set winO value to false
    }
    //Scoreboard Display
    textAlign(CENTER); //center text
    textSize(22);//text size 22
    text("X SCORE " + scoreX, width / 2, 450); //Score tracker X with text 
    text("O SCORE " + scoreY, width / 2, 480); //Score tracker O with text 
    textSize(14); //text size 14
    //Statement to display last won at all times
    if (won == true) {
        text("LAST WIN " + last, width / 2, 520); //last won tracker
    }
     
    textSize(32); //Sets textsize to 32 
    textAlign(NORMAL); //sets textAlign back to normal


   
}
//Function to create the grid
function createContainer() {
    // loop which draws each container item on screen
    for (let i = 0; i < 3; i++){
        textSize(32);
        textWrap(CHAR);
        text(container[i], i * 50, 50);  
        text(container[i + 3], i * 50, 100);
        text(container[i + 6], i * 50, 150);  
    }
}
//function to draw a grid with lines
function lines() {
    line(200, 265, 405, 265);
    line(200, 265 + 50, 405, 265 + 50);
    line(280, 200, 280, 380);
    line(330,200,330,380);
}
//mousePressed function
function mousePressed() {
    mousePos(); //contains the different co-ordinates which changes the values of the array onclick
    turn(); //turn tracker

}
//function which contains the different co-ordinates which changes the values of the array onclick
function mousePos() {
    //Every container has an x and y treshold that needs to be clicked on to be activated.
    //for example, if my mouseX if below 280 and mouseY is below 265 which is the intersecting point of the grid, it confirms a click

    //If container[i] is empty, performs the action otherwise do not proceed
    if (container[0] == "")  {
        if (mouseX < 280 && mouseY < 265) {
            container[0] = player;  
            turnPlayer++; //adds to the turnPlayer var which tracks turns
    }
    }
    if (container[1] == "") {
     if (mouseX < 330 &&  mouseX > 280 && mouseY < 265 ) {
         container[1] = player;
         turnPlayer++;
    }
    }
    if (container[2] == "") {
        if (mouseX > 330 && mouseY < 265) {
            container[2] = player;
            turnPlayer++;
        }
    }
// Row2
    if (container[3] == "") {
        if (mouseX < 280 && mouseY > 265 && mouseY < 315) {
            container[3] = player;
            turnPlayer++;
        }
    }
    if (container[4] == "") {
        if (mouseX < 330 && mouseX > 280 && mouseY > 265 && mouseY < 315) {
            container[4] = player;
            turnPlayer++;
        }
    }
    if (container[5] == "") {
        if (mouseX > 330 && mouseY > 265 && mouseY < 315) {
            container[5] = player;
            turnPlayer++;
        }
    }

// Row3
    if (container[6] == "") {
        if (mouseX < 280 && mouseY > 315) {
            container[6] = player;
            turnPlayer++;
        }
    }
    if (container[7] == "") {
        if (mouseX < 330 && mouseX > 280 && mouseY > 315) {
            container[7] = player;
            turnPlayer++;
        }
    }
    if (container[8] == "") {
        if (mouseX > 330 && mouseY > 315) {
            container[8] = player;
            turnPlayer++;
        }
    }
    
   
    
   
}
//function turn to track the next player
function turn() {
    //statements to check if turnPlayer reaches 3. If it reaches 3, set it back to 1

    if (turnPlayer == 3) {
        turnPlayer = 1;
    }
    if (turnPlayer == 1) { //assign 1 to X
        player = "x";
    }
    else {
        player = "o"; //assign 2 to O
    }
    
    
}
//scoreboard function to add values to current scores
function scoreboard() {
    
    if (winX == true) {
        scoreX = scoreX + 1; //When X wins, add 1 to the score
    }
    if (winO == true) {
        scoreY = scoreY + 1; //When O wins, add 1 to the score
    }
}
//winscreen function which display the winning player on screen
function winScreen() {
    background(200);
    text("Won " + last, width / 2, width/2); 
}
//Win condition function
function winCondition() {

    //Essentially, it displays all the potential wins that could happen for x or o. for example : if array 0 to 2 is all equal to "x", player X wins
    //This is essentially repeated for each outcome

    if (container[0] == "x" && container[1] == "x" && container[2] == "x" ) {
        winX = true;
    }

    if (container[3] == "x" &&  container[4] == "x" &&  container[5] == "x") {
        winX = true;
    }
    if (container[6]== "x" &&  container[7]== "x" &&  container[8] == "x") {
        winX = true;
    }


     if (container[0]== "o" &&  container[1]== "o" &&  container[2] == "o") {
        winO = true;
    }

    if (container[3]== "o" &&  container[4]== "o" &&  container[5] == "o") {
        winO = true;
    }
    if (container[6]== "o" &&  container[7]== "o" &&  container[8] == "o") {
        winO = true;
    }

//diag
    
    if (container[0]== "x" && container[4]== "x" && container[8] == "x") {
        winX = true;
    }

    if (container[2]== "x" && container[4]== "x" && container[6] == "x") {
        winX = true;
    }
    
    if (container[0]== "o" && container[4]== "o" && container[8] == "o") {
        winO = true;
    }

    if (container[2]== "o" && container[4]== "o" && container[6] == "o") {
        winO = true;
    }
//vert

    if (container[0] == "x" && container[3] == "x" && container[6] == "x" ) {
        winX = true;
    }

    if (container[1] == "x" &&  container[4] == "x" &&  container[7] == "x") {
        winX = true;
    }
    if (container[2]== "x" &&  container[5]== "x" &&  container[8] == "x") {
        winX = true;
    }

      if (container[0] == "o" && container[3] == "o" && container[6] == "o" ) {
        winO = true;
    }

    if (container[1] == "o" &&  container[4] == "o" &&  container[7] == "o") {
        winO = true;
    }
    if (container[2]== "o" &&  container[5]== "o" &&  container[8] == "o") {
        winO = true;
    }
   
    
}
>>>>>>> 13cd43961fcbc2f36b3e5c76c3cddef6c8de87db
