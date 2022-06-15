let currentScreen;

let circlePos;
const circleRadius = 50;

let remaining;

let millisecondTimesArray;
let prevTime;
let average;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);

  rectMode(CENTER);

  newCircle();

  currentScreen = "home"
}

function draw() {
  background(220);

  if (currentScreen == "home") {
    textSize(50);
    text("Aim Trainer", width/2, height/3)

    rect(width/2, 3*height/5, 200, 50, 20);
    textSize(20);
    text("Start", width/2, 3*height/5);
    if (mouseIsPressed && 
      (width/2 - 100 <= mouseX && mouseX <= width/2 + 100)
      && (3*height/5 - 25 <= mouseY && mouseY <= 3*height/5 + 25)
    ) {
      // currentScreen = "game";
      initializeGame();
    }
  }

  else if (currentScreen == "game") {
    if (remaining == 0) {
      currentScreen = "finished";
      average = 0;
      for (let i = 0; i < millisecondTimesArray.length; i++) {
        average += millisecondTimesArray[i];
      }
      average = average / millisecondTimesArray.length;
      average = int(average);
      return;
    }
    circle(circlePos.x, circlePos.y, circleRadius*2)
    textSize(20);
    text("remaining: " + remaining, width/2, 40);
  }

  else if (currentScreen == "finished") {
    textSize(30);
    text("yay u finished", width/2, height/3)
    text("average milliseconds:\n" + average, width/2, 2*height/3)

    rect(width/2, height/2, 200, 50, 20);
    textSize(20);
    text("menu", width/2, height/2);
    
  }

}

function newCircle() {
  circlePos = createVector(
    random(0 + circleRadius, width - circleRadius),
    random(0 + circleRadius, height - circleRadius)
  );
}

function initializeGame() {
  remaining = 10;
  prevTime = millis();
  millisecondTimesArray = [];
  currentScreen = "game";
}

function isInsideCircle() {
  let a = mouseX - circlePos.x;
  let b = mouseY - circlePos.y;
  return circleRadius*circleRadius >= a*a + b*b;
}


function mousePressed() {
  if (currentScreen == "game") {
    if (isInsideCircle()) {
      newCircle();
      remaining -= 1;
      millisecondTimesArray.push(millis() - prevTime);
      prevTime = millis();
    }
  }

  else if (currentScreen == "finished") {

    if (
      // mouseIsPressed && 
      (width/2 - 100 <= mouseX && mouseX <= width/2 + 100)
      && (height/2 - 25 <= mouseY && mouseY <= height/2 + 25)
    ) {
      // currentScreen = "game";
      currentScreen = "home";
      // initializeGame();
    }

  }

}