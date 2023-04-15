/*
Project Three - UWii
Azhar, Elisha & Niko 
We are using the Eclipse Paho MQTT client library: https://www.eclipse.org/paho/clients/js/ to create an MQTT client that sends and receives messages. The client is set up for use on the shiftr.io test MQTT broker (https://shiftr.io/try)

*/


let myName = "host"; // 
let nextName = ""; // 
let dataToSend;  // 


// MQTT client details. We are using a public server called shiftr.io. Don't change this. 
let broker = {
  hostname: 'public.cloud.shiftr.io',
  port: 443
};
let client;
let creds = {
  clientID: 'p5Client', 
  userName: 'public', 
  password: 'public' 
}
let topic = 'CART263'; // This is the topic we are all subscribed to

// ******************* End of MQTT client details ************************ 
let names = []; 
// let words = [
//   ["animals","cat","dog","penguin","elephant"],
//   ["tools","wrench","hammer","screw","drill"],
//   ["emotions","happy","sad","angry","scared"]
  
// ]


let words = 
  [
    "animals","cat","dog","penguin","elephant",
  "tools","wrench","hammer","screw","drill",
  "emotions","happy","sad","angry","scared"

]


let screen; //this is what scene is being displayed at the moment
let p1Points =0;
let p2Points =0;
let drawerA = "";
let drawerB = "";
let wordA = "";
let wordB = "";
let remove = false;

let trailOne = []; //arrays for tail
let trailTwo = [];
let xA = 1000;
let yA = 1000;
let xB = 1000;
let yB = 1000; //cords for trail point

let imgtwo;

let restart = true;
let resuluts = true;
let guessbuttons = true;

let myFont;
let otherFont;
let s = 'instructions: Two players will play head-to-head agasint each other, drawing an image chosen on the prompt with only 30 seconds or less to complete. The audience will vote who  the winner is for that round. FUN PARTY ACTIVTY TO ENJOY WITH FRIENDS!!! ';
let c1,c2;

let tDone = false;

function setup() {
  // Normal program setup goes here
  createCanvas(1000, 700);
  background("white");
  MQTTsetup(); // Setup the MQTT client
  screen = 1;
  textFont('Roboto');
  buttonOnStart();
}

function preload(){
  img = loadImage('images/project3_logo.png');
  imgtwo = loadImage('images/frame.png');

  myFont = loadFont('fonts/FRKFRTHN.TTF');
}

function draw() {
  textAlign(CENTER);
  fill(0);
  
  switch(screen)
    {
      case 1:
        {
          if(restart == true)
          c1 = color(247, 146, 86);
          c2 = color(10, 226, 255);
          setGradient(c1, c2);
          joinPage();
          imageLogo();
          break;
        }
      case 3:
        {  
          c1 = color(247, 146, 86);
          c2 = color(10, 226, 255);
          setGradient(c1, c2);
          let ina = getIndex(drawerA);
          let inb = getIndex(drawerB);
          let guessDone = false;
          
          for (let i = 0; i < names.length; i++) 
          {
          if (i != ina || i != inb) 
          {
            if(names[i].guess >= 6)
              guessDone = true;
            else
              guessDone = false
          }
            
          if(guessDone == true)  
            screen = 4; //if all guesses are done go to results 
          }
          
          guessScreen();
          
          
          break;
        }
      case 2: //drawing screen
        {
          stroke('purple'); // Change the color
          strokeWeight(5);
          point(xA,yA);
          translate(400, 0);
          
          
          stroke('red'); // Change the color
          strokeWeight(5);
          point(xB,yB);
          stroke(10);
          translate(-400, 0);
          //drawing();
          break;
        }
      case 4:
        {
          results();
          break;
        }
    }

     
  
}



// ************************** Screens **********************************

function joinPage()
{
  restart = false;
  c1 = color(247, 146, 86);
  c2 = color(10, 226, 255);
  setGradient(c1, c2);
  
}
function buttonOnStart(){
  button = createButton('START');
  button.position(445,500);
  button.size(125);
  button.mousePressed(done);
}
function imageLogo(){
  //load logo
  image(img, 210, 120, 600, 130);
  image(imgtwo, 60, height/2 -10,200,200);

  
  //insructions
  noStroke();
  fill(255);
  rect(242, 310, 530, 250, 35);
  
  //text instruction
  fill(39, 105, 185);
  textSize(25);
  textAlign(LEFT);
  textFont(myFont);
  text('Welcome to WE DRAWW!', 270, 355);
  
  fill(39, 105, 185);
  textSize(17);
  textFont('Roboto');
  text(s, 270, 368, 485, 400);
}

function guessScreen() // the screen which will display the drawings for the player to guess
{
  
    if(guessbuttons == true)
    {
      button =  createButton('Results');
      button.position(445,500);
      button.size(125);
      button.mousePressed(done);
      guessbuttons = false;
    }
  
   //team one (left/sunset) 
  noStroke();
  fill(251, 209, 162);
  rect(0, 0, 500, 900);
  textSize(20);
  fill(248, 178, 98);
  text('player one', 250, 650);
  
  //team two(right/tiffany blue)
  noStroke();
  fill(125, 207, 182);
  rect(500, 0, 500, 900);
  textSize(20);
  fill(76, 189, 155);
  text('player two', 770, 650);
  
  //load logo
  image(img, 210, 60, 600, 130);
  
  //shuffle words
  fill(29, 78, 137);
  rect(310, 200, 400, 90, 30);
  
  textSize(15);
  fill(255);
  textStyle(BOLD);
  text("3 guesses for p1\nthen 3 guesses for p2!", 500, 240);
  
  drawing();
}

function resultScreen()
{
  background(255); //background main color
  
  if(results == true)
    {
      button =  createButton('Restart');
      button.position(445,500);
      button.size(125);
      button.mousePressed(done);
      results = false;
    }
  
  //team one (left/sunset) 
  noStroke();
  fill(251, 209, 162);
  rect(0, 0, 500, 900);
  textSize(20);
  fill(248, 178, 98);
  text('player one', 250, 310);
  text(p1Points, 250, 450);
  
  //team two(right/tiffany blue)
  noStroke();
  fill(125, 207, 182);
  rect(500, 0, 500, 900);
  textSize(20);
  fill(76, 189, 155);
  text('player two', 770, 310);
  text(p2Points, 770, 450);
  //load logo
  image(img, 210, 60, 600, 130);
  
  //restart button  
  textSize();
  fill(255);
  textStyle(BOLD);
}

//*************************** Technical Functions **********************

// program to get a random item from an array

function getRandomItem(arr) //will become an object array
{
    // get random index value
    let randomIndex = Math.floor(Math.random(0,names.length) );
    // get random item
    let item = names[randomIndex].name;
    print(item);
    return item;
}

function done() // picks two random players and two random words 
{
  if(screen == 1)
    {
      drawerA = getRandomItem(names); //random players
      drawerB = getRandomItem(names);
    }
  if(screen == 4)
    {
      button.remove();
      restart = true;
      resuluts = true;
      guessbuttons = true;
      screen = 1;
    }

  
  
  print(drawerB + " and " + drawerA);
  
  //let row = floor(random(words.length-1)); //random row
  remove = true;
  
    wordA = words[floor(random(words.length))]; //names[row][floor(random(1, words[row].length))];//random words in row
    wordB = words[floor(random(words.length))];//names[row][floor(random(1, words[row].length))];
  
  print(wordA + " " + wordB);
  sendMQTTMessage(wordA,drawerA,2);
  sendMQTTMessage(wordB,drawerB,2);
   c1 = color(247, 146, 86);
   c2 = color(10, 226, 255);
   setGradient(c1, c2);
  screen =2;
}


function checkString(pIndex,word,guessWord) // this function will get check if the player's guess is right
{
  if(names[pIndex].guess < 6) //updates how many times the player has guessed 
    {
      names[pIndex].guessUpdate(1);
    }
  
  print(pIndex + ", " + word + ", " + guessWord);
  
  if(word === guessWord) // if the word is guessed right set the guess to the next drawing and return true
    {
      if(names[pIndex].guess <= 3)
        names[pIndex].guessUpdate(3);
      else
        names[pIndex].guessUpdate(6); 
      return true;
    }
  else
    {
      return false;
    }
}

function getIndex(Name) // gets the index of the player in the array
{
  let index = -1;
  for (let i = 0; i < names.length; i++) {
  if (names[i].name === Name) 
  {
    index = i; 
    break; 
  }
}
  return index;
}

function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawing() {
  translate(0,250);
  for (let i = 0; i < trailOne.length - 1; i += 2) {
    stroke('purple'); // Change the color
    strokeWeight(5);
    //print("point" + parseInt(trailOne[i]) + parseInt(trailOne[i+1]));
    point(parseInt(trailOne[i]), parseInt(trailOne[i+1]));
    stroke(10);
  }
 
  translate(600, 0);
  for (let i = 0; i < trailTwo.length - 1; i += 2) {
    stroke('red'); // Change the color
    strokeWeight(5);
    point(parseInt(trailTwo[i]), parseInt(trailTwo[i+1]));
    stroke(10);
  }
  translate(-600, 0);
  translate(0,-250);
}


// *******************************MQTT Message Functions****************

// When a message arrives, do this: 
function onMessageArrived(message) 
{
  let dataReceive = split(trim(message.payloadString), "/");// Split message

   
  
  
// 0 is who its from
// 1 is who its for
// 2 is the screen
// 3 the message 
  
  if(dataReceive[1] == myName)
  { // Check if its for me
    
    switch (String(dataReceive[2])) //depending on what screen the player is on
      {
        case "0": //if the player joins the game add name to array
          {
            names[names.length] = new player(String(dataReceive[0]));
            print("hi" + names[names.length-1].name)
            break;
          }
        case "2": //if the player is drawing
          {


            
            if(String(dataReceive[0]) === "done")
              {
                tDone = true;
                sendMQTTMessage("done",drawerA,1);
                sendMQTTMessage("done",drawerB,1);
                screen =3;
                print(trailOne);
                let ina = getIndex(drawerA);
                let inb = getIndex(drawerB);
                
                for (let i = 0; i < names.length; i++) 
                {
                  if (i != ina || i != inb) 
                  {
                    sendMQTTMessage("guess",names[i].name,3);
                  }
          
                }  
                
              }
            
              if(dataReceive[0] == drawerA)
              { 
              
              let cords = split(trim(dataReceive[3]), ",");
              xA = cords [0];
              yA = cords [1];
              trailOne.push(xA);
              trailOne.push(yA);  
              print(dataReceive[3] + " data receive");
              drawTrail = false;
      
              }
            
            if(dataReceive[0] == drawerB )
              { 
              
              
              let cords = split(trim(dataReceive[3]), ",");
              xB = cords [0];
              yB = cords [1];
              trailTwo.push(xB);
              trailTwo.push(yB);   
              //print(dataReceive[3]);
              drawTrail = false;
              
    
              }
            break;
          }
        case "3": // if the player is guessing
          {
          
            let theString = wordA;
            let theStringTwo = wordB;
            let guessedString = String(dataReceive[3]);
            
            let playersIndex = getIndex(String(dataReceive[0])); //getting the index of the player whp sent guess
            print(playersIndex + " you got a dex --- >" + names[playerIndex].guess);
            
            if(names[playerIndex].guess >= 6) //if player is done guesses
              {
                print(" 6+++++++");
                sendMQTTMessage("results",names[playerIndex].name, 4);
              }
            
            if(names[playerIndex].guess < 3) //if the player is guessing p1 word
              {
                print("im in");
                let guessResult = checkString(playersIndex,theString,guessedString);
                if (guessResult == true)
                  {
                    p1Points +=1;
                    sendMQTTMessage("true",names[playerIndex].name, 3); //right
                  }
                else
                  {
                    sendMQTTMessage("false",names[playerIndex].name, 3); //wrong
                  }
              }
            else if(names[playerIndex].guess >= 3) //if the player is guessing p2 word
              {
                let guessResult = checkString(playersIndex,theStringTwo,guessedString);
                if (guessResult == true)
                  {
                    p2Points +=1;
                    sendMQTTMessage("true",names[playerIndex].name, 3);
                  }
                else
                  {
                    sendMQTTMessage("false",names[playerIndex].name, 3);
                  }
              }
            
            
            break;
          }
      }
    
  } 

}

// Sending a message
function sendMQTTMessage(msg,p,s) 
{
      message = new Paho.MQTT.Message(myName + "/" + p+"/"+ s +"/"+msg); // add messages together: 
// My name + Next name + data separated by / 
      message.destinationName = topic;

      client.send(message);
}

class player
  {
    constructor(name)
    {
      this.name = name;
      this.Screen = 0;
      this.guess = 0;
    }
    
    guessUpdate(g)
    {
      if(g == 0)
        {
          this.guess = 0;
        }
      else if(g == 3)
        {
          this.guess = 3;
        }
      else if(g == 6)
        {
          this.guess = 6;
        }
      else
        {
          this.guess += 1;
        }
    }
  }

//********************** MQTT Connection Functions *********************

// Callback functions
function onConnect() 
{
  client.subscribe(topic);
  console.log("connected");
  // is working
}
function onConnectionLost(response) 
{
  if (response.errorCode !== 0) {
    // If it stops working
  }
}
function MQTTsetup()
{
  client = new Paho.MQTT.Client(broker.hostname, Number(broker.port), creds.clientID);
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
        onSuccess: onConnect,
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true
  });
}



