// Declare variables
let data; //This loads the CSV file
let numArcs; // Arc Variable
let maxYears = 10; // The amount of years per arc 360
let startYear; // StartYear Variable
let fadeInIndex = 0; //Animation Variable
let fadeInTimer = 0; //Animation Variable
let fadeInDuration = 5000; //Animation Variable
let earth; //Image Variable
let size = 450; // Size Variable
let arcs = []; //Array to store arcs
let t = 0; // Variable t used for animation
let centerX, centerY; 
let angleStep; 


// Preload function
function preload() {
  // Load data and image
  data = loadTable('climate_change.csv', 'csv', 'header');
  earth = loadImage('earth.png');
}

function setup() {
  createCanvas(800, 600); // create a canvas with width 800 and height 600
  centerX = width / 2; // set centerX to half the canvas width
  centerY = height / 2; // set centerY to half the canvas height
  startYear = floor(random(data.getColumn('Year').length - maxYears)); // randomly choose a start year
  numArcs = 3 * maxYears; // set the number of arcs to display as 3 times the maximum number of years
  angleStep = TWO_PI / numArcs; // calculate the angle step between each arc
  for (let i = 0; i < numArcs; i++) { // loop through all arcs
    let index = startYear + i; // calculate the index of the arc in the data table
    let angle = map(i, 0, numArcs, angleStep / 2, TWO_PI - angleStep / 2); // calculate the angle of the arc
    let arcRadius; // declare a variable for the radius of the arc
    if (i % 3 == 0) { // if the arc number is divisible by 3
      arcRadius = 50; // set the arc radius to 50
    } else if (i % 3 == 1) { // if the arc number is not divisible by 3 but leaves a remainder of 1
      arcRadius = 100; // set the arc radius to 100
    } else { // if the arc number leaves a remainder of 2 when divided by 3
      arcRadius = 150; // set the arc radius to 150
    }
    let co2 = data.getNum(index, 'CO2'); // get the CO2 value for the arc from the data table
    arcs.push(new Arc(index, angle, arcRadius, co2)); // create a new Arc object and add it to the arcs array
  }
}

function draw() {
  // Set the background color to dark gray
  background(20);
  
  // Display the earth image in the center of the canvas
  image(earth, width / 2 - (size/2), height / 2 - (size / 2));
  
  // Set the tint for the earth image to partially transparent black
  tint(22, 100);
  
  // Resize the earth image based on the current size variable
  earth.resize(size, size);

  // Increase or decrease the size variable based on its current value
  if (size > 500) {
    size = size - 5;
  } else {
    size = size + 6;
  }
  
  // Set the stroke cap to square
  strokeCap(SQUARE);

  // Calculate the angle step for the arcs
  let angleStep = TWO_PI / numArcs;

  // Loop through each arc and draw it
  for (let i = 0; i < numArcs; i++) {
    // Calculate the index and angle for the current arc
    let index = startYear + i;
    let angle = map(i, 0, numArcs, angleStep / 2, TWO_PI - angleStep / 2);

    // Set the radius for the current arc based on its index
    let arcRadius;
    if (i % 3 == 0) {
      arcRadius = 50;
    } else if (i % 3 == 1) {
      arcRadius = 100;
    } else {
      arcRadius = 150;
    }

    // Set the color for the current arc based on its index
    let arcColor = lerpColor(color(250, 50, 50), color(0, 0,0), i / numArcs);
    arcColor.setAlpha(111);
    stroke(arcColor);

    // Get the CO2 value for the current year and set the thickness of the arc based on the value
    let co2 = data.getNum(index, 'CO2');
    let thickness = map(co2, 315, 415, 1, 20);

    // Set the opacity of the arc based on a sine wave and the current index
    let opacity = map(sin(t + i * 0.1), -1, 1, 0, 255);
    stroke('rgba(50, 50, 50, ' + opacity + ')');

    // Set the stroke weight for the arc
    strokeWeight(thickness);

    // Set the curve offset for the current arc based on a noise function and the current index
    let curveOffset = map(noise(t + i * 0.01), 0, 1, -20, 20);

    // Calculate the control points for the curve
    let curveX = centerX + cos(angle + angleStep / 2) * (arcRadius + curveOffset);
    let curveY = centerY + sin(angle + angleStep / 2) * (arcRadius + curveOffset);

    // Draw the curve
    curveTightness(0.5);
    curve(centerX, centerY, curveX, curveY, curveX, curveY, centerX, centerY);

    // Set the stroke join to round and the stroke weight to 2
    strokeJoin(ROUND);
    strokeWeight(2);

    // Set the trail offset for the current arc based on a noise function and the current index
    let trailOffset = map(noise(t + i * 0.01), 0, 1, -3, 3);
    let trailX = centerX + cos(angle + angleStep / 2) * (arcRadius + trailOffset);
    let trailY = centerY + sin(angle + angleStep / 2) * (arcRadius + trailOffset);
    curve(centerX, centerY, trailX, trailY, trailX, trailY, centerX, centerY);
  }

  t += 0.01; // Add 0.01 to the t variable
}


// Create Arc class
class Arc {
  // Constructor for Arc
  constructor(index, angle, arcRadius, co2) {
    // Set properties
    this.index = index;
    this.angle = angle;
    this.arcRadius = arcRadius;
    this.co2 = co2;
    // Map co2 to thickness
    this.thickness = map(this.co2, 315, 415, 1, 20);
    // Set curve offset using Perlin noise
    this.curveOffset = map(noise(t + index * 0.01), 0, 1, -20, 20);
    // Set trail offset using Perlin noise
    this.trailOffset = map(noise(t + index * 0.01), 0, 1, -3, 3);
  }

  // Display function for Arc
  display() {
    // Map opacity using sine wave
    let opacity = map(sin(t + this.index * 0.1), -1, 1, 0, 255);
    // Set arc color using index and lerpColor function
    let arcColor = lerpColor(color(250, 50, 50), color(0, 0, 0), this.index / numArcs);
    // Set alpha channel for arc color
    arcColor.setAlpha(111);
    // Set stroke color to arc color
    stroke(arcColor);
    // Set stroke weight to arc thickness
    strokeWeight(this.thickness);
    // Calculate curve coordinates using curve offset
    let curveX = centerX + cos(this.angle + angleStep / 2) * (this.arcRadius + this.curveOffset);
    let curveY = centerY + sin(this.angle + angleStep / 2) * (this.arcRadius + this.curveOffset);
    // Set curve tightness
    curveTightness(0.5);
    // Draw curve
    curve(centerX, centerY, curveX, curveY, curveX, curveY, centerX, centerY);
    // Set stroke join to round
    strokeJoin(ROUND);
    // Set stroke weight to 2
    strokeWeight(2);
    // Calculate trail coordinates using trail offset
    let trailX = centerX + cos(this.angle + angleStep / 2) * (this.arcRadius + this.trailOffset);
    let trailY = centerY + sin(this.angle + angleStep / 2) * (this.arcRadius + this.trailOffset);
    // Draw trail
    curve(centerX, centerY, trailX, trailY, trailX, trailY, centerX, centerY);
  }
}
