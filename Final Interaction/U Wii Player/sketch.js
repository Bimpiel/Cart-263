/*

Project Three - UWii
Azhar, Elisha & Niko 

this would be a sender console whcih would send its data to the console; 

Used P5.Sound Library, MQQT, and gyro motion

*/

let input, button, greeting; // input for the player to put their username
let screen;
let cursor = true;
let myName; // Who are you?
let nextName = "host"; // Who is next on the list? 
let dataToSend;  // Variable to hold the data to send to the next person on the list

// MQTT client details. We are using a public server called shiftr.io. Don't change this. 
let broker = {
  hostname: 'public.cloud.shiftr.io',
  port: 443
};
let client;

let creds = {
  clientID: Math.random().toString(16).slice(3), 
  userName: 'public', 
  password: 'public' 
}
let topic = 'CART263'; // This is the topic we are all subscribed to

let load = false;
let permissionGranted = false;
// let trail = [];
let seconds = 30;
let dot;
let locked = true;
let restart = false;
let gInput = true;
let myWord = "";

// ******************* End of MQTT client details ************************ //

function preload(){
  img = loadImage('images/project3_logo.png');
  
  //initialize the sound
  // sound = loadSound('assets/Fluffing-a-Duck.mp3');
}

function setup()
{
  createCanvas(400, 400);
  //team one (left/sunset) 
  noStroke();
  background(251, 209, 162);
  image(img, 200-100, 120, 222, 50);
  
  
  MQTTsetup(); // Setup the MQTT client
  setUsername();
  dot = new MotionCircle(width/2, height/2, 15);
  
  
}

function draw() {
  
  switch(screen) {
    case 1:
      
      wait();
      
      break;
    case 2:
      
      greeting = createElement('h2', myWord);
      greeting.position(200, 50);
      if (load == false) {
        background(80, 0, 0);
      } else {
        background(40, 0, 0);

        if (!permissionGranted) return;

        const dx = constrain(rotationY, -3, 3);
        const dy = constrain(rotationX, -3, 3);

        dot.update(dx, dy, 0.5);
        dot.display();
        
          if (screen === 2 && permissionGranted && locked == false) 
          {
          // Send the position of the motionCircle using MQTT
          sendMQTTMessage(myName,dot.x + "," + dot.y, 2);
          } 
      }
      
      break;
      
    case 3:
      
      if(gInput == true)
        guess(c=color(247, 146, 86));
      break;
      
  }
 restart = false;

}

function mousePressed() 
{
  if(locked == false)
    locked = true;
  else if(locked == true)
    locked = false;
}


// ********************* Screen Functions *******************************

function setUsername() // SCREEN 0
{
  
  input = createInput();
  input.position(width/2 -(input.width)/3-10, height/1.4 -30);
  button = createButton('submit');
  button.position(input.x + input.width-110, 300);
  button.mousePressed(sendName);
  greeting = createElement('h2', 'what is your name?');
  greeting.position(125, 190);
  greeting.style('text-align', 'center'); // Center align the text
  textAlign(CENTER);
  textSize(50);
}
function sendName() { //Gives username to the main host console 
  
  if(screen == 0);
  {
    //waitScreen();
    myName = input.value();
    greeting.html("please wait " + myName);
    input.value('');
    screen = 1;
    button.remove();
    input.remove();
    greeting.remove();
    sendMQTTMessage(myName,"add",0);
    print("added you to the game");
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") 
      {
        requestAccess();
      }
    else
      {
        permissionGranted = true;
      }
    
    
  }
  
}
function guessScreen(){
  
  background(255); //background main color
  //team one (left/sunset) 
  noStroke();
  fill(251, 209, 162);
  rect(0, 0, 500, 900);
  
  //team two(right/tiffany blue)
  noStroke();
  fill(125, 207, 182);
  rect(500, 0, 500, 900);
  
//   //load logo
//   // image(img, 210, 60, 600, 130);
//   //type your guesses
//   noStroke();
//   fill(255);
//   textSize(30);
//   textAlign(CENTER);
//   text("Guess the word", 500, 310);
//   textAlign(LEFT);
}
function sendGuess() { //Gives username to the main host console 
  
  if(screen == 3);
  {
    let restart = true;
    let g = input.value();
    greeting.html('you guessed ' + g + '!');
    input.value('');
    // screen = 3;
    button.remove();
    input.remove();
    greeting.remove();
    sendMQTTMessage(myName,g,3);
    print("sent guess " + g);
    
  }
  
}

function wait() //SCREEN 1
{
  background(251, 209, 162);
  textSize(20);
  text("please wait for host to continue",200,200);
  //text("Wait For Vote to Start",width/2,height/2);

}


function guess(c) //SCREEN 3 The Screen where you guess the drawing
{

 gInput = false;
 background(c);
 input = createInput();
 input.position(width/2 -(input.width)/3-10, height/1.4 -30);
 button = createButton('submit');
 button.position(input.x + input.width-110, 300);
 button.mousePressed(sendGuess);
 greeting = createElement('h2', 'Enter guess');
 greeting.position(width/2-40, 190);
 textAlign(CENTER);
 textSize(50); 
  

}


// ********************** MQTT Message Functions ***********************

// When a message arrives, do this: 
function onMessageArrived(message) {
  let dataReceive = split(trim(message.payloadString), "/");// Split the incoming message into an array deliniated by "/"
  console.log(String(dataReceive[1])); 
// 0 is who its from
// 1 is who its for
// 2 is the screen the user is on
// 3 is the data when needed 
  
  if(dataReceive[1] == myName) // Check if its for the specific player
  { 
    let d = String(dataReceive[2]); //guess
    
    if(d === "3")
      {
        screen = 3;
        if(String(dataReceive[3]) === "true")
          {
            guess(c= color(0,100,20));
          }
                
        if(String(dataReceive[3]) === "false")
          {
            guess(c= color(100,0,20));
          }  
        
        if(String(dataReceive[3]) === "done")
          {
            screen = 1;
          }
      }
    else if(d === "2") //draw
      {

        myWord = String(dataReceive[3]);
        print(myWord);
        let timer = setInterval(function() {
        
        if(seconds > 0) 
          {
            seconds--; 
            console.log(seconds);
          }
        if (seconds <= 0) {  
        clearInterval(timer);
        console.log("Time's up!");
        sendMQTTMessage("done","d",2); 
        load = false;
        second = 0;}}, 1000);
        load = true;
        screen = 2;

      }
    else if(d=== "1") //wait
      {
        screen= 1;
      }
  }  
}

// Sending a message
function sendMQTTMessage(me, msg,stage) {
  let message = new Paho.MQTT.Message(me + "/" + nextName+"/"+ stage + "/" + msg);   // sends a message to host with username and screen that the sender is on at the moment
  message.destinationName = topic;
  client.send(message);
}
//********************** MQTT Connection Functions *********************

// Callback functions
function onConnect() {
client.subscribe(topic);
console.log("connected");
// is working
}
function onConnectionLost(response) {
if (response.errorCode !== 0) {
// If it stops working
}
}
function MQTTsetup(){
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
class MotionCircle 
{
  constructor(x, y, radius) 
  {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update(dx, dy, speed) 
  {
    this.x += dx * speed;
    this.y += dy * speed;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

  }

  display()
  {
    ellipse(this.x, this.y, this.radius * 2);
  }

}

  function requestAccess() {
    DeviceOrientationEvent.requestPermission().then(response => {
        if (response == 'granted') {
          permissionGranted = true;
        }
      }).catch(console.error);
    button.remove();
  }