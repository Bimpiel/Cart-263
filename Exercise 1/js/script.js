let container =
    [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

let player = "x";
let turnPlayer;
let winX = false;
let winO = false;
let last = "------";
let reset = false;
let scoreX = 0;
let scoreY = 0;
let won = false;
let timer = 5;


function setup() {
    createCanvas(600 , 600);
    turnPlayer = 1;
    
}

function draw() {
    
    if (winX == true || winO == true) {
        won = true;
        
    }
    
conditions();
    winCondition();
    // winScreen();
}

function conditions() {
    
    scoreboard();

    if (winX == true) {
        last = "X";
        timer = 0;
    }
    else if (winO == true) {
        last = "O";
        timer = 0;
    }
    else {

    }
   
    
    
    if (winX == false) {
        timer = timer + 0.01;
        console.log(timer);
        if (timer < 5) {
            winScreen();
        } else {
        background(200);
        lines();
        translate(400 - 150, 350 - 150);
        createContainer();
        translate(-400 + 150, -350 + 150); 
        }
        
       
        
    }
    
    if (winX == true) {
        
        reset = true;
         if (reset == true) {
            container =
            [
            "", "", "",
            "", "", "",
            "", "", ""
            ];
        reset = false;
    }
        background(200);
        lines();
        translate(400 - 150, 350 - 150);
            createContainer();
        translate(-400 + 150, -350 + 150);
        
        winX = false;
    }
    if (winO == true) {
        reset = true;
         if (reset == true) {
            container =
            [
            "", "", "",
            "", "", "",
            "", "", ""
            ];
        reset = false;
    }
        background(200);
        lines();
        translate(400 - 150, 350 - 150);
            createContainer();
        translate(-400 + 150, -350 + 150);
        winO = false;
    }
    textAlign(CENTER);
    textSize(22);
    
    text("X SCORE " + scoreX, width / 2, 450);
    text("O SCORE " + scoreY, width / 2, 480); 
    textSize(14);
    
    if (won == true) {
        text("LAST WIN " + last, width / 2, 520); 
    }
     
    textSize(32);
    textAlign(NORMAL);


   
}

function createContainer() {
    for (let i = 0; i < 3; i++){
        textSize(32);
        textWrap(CHAR);
        
        text(container[i], i * 50, 50);  
        text(container[i + 3], i * 50, 100);
        text(container[i + 6], i * 50, 150);  
    }
}
function lines() {
    line(200, 265, 405, 265);
    line(200, 265 + 50, 405, 265 + 50);
    line(280, 200, 280, 380);
    line(330,200,330,380);
}

function mousePressed() {
    mousePos();
    turn();

}

function mousePos() {
    
    if (container[0] == "") {
        if (mouseX < 280 && mouseY < 265) {
            container[0] = player;  
            turnPlayer++;
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
function turn() {
    
    if (turnPlayer == 3) {
        turnPlayer = 1;
    }
    if (turnPlayer == 1) {
        player = "x";
    }
    else {
        player = "o";
    }
    
    
}
function winCondition() {
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
function scoreboard() {
    
    if (winX == true) {
        scoreX = scoreX + 1;
    }
    if (winO == true) {
        scoreY = scoreY + 1;
    }
}
function winScreen() {
    background(200);
    text("Won " + last, width / 2, width/2); 
}