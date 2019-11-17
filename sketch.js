/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let cnv;
let player;
let roll;
let base;
let base2;
let classroom;
let turtle;
let desk;
let desk2;
let desk3;
let desk4;
let desk5;
let desk6;
let desk7;
let bubble1;
let bubble2;
let bubble3;
let bubble4;
let bubble5;
let ciel;
let fish;
let sub;
let playerStatus;
let oceanScape;
let scoreText;
let score = 1;
let hasStarted = false;
let paused = false;
let turnCount = 0;
let levelCount = 1;
let oldLevelCount = levelCount;

function setup() {
  //bg = background(300);
  cnv = createCanvas(1000, 600);
  cnv.parent("sketch-holder");

  bubble1 = new Bubble();
  bubble2 = new Bubble();
  bubble3 = new Bubble();
  bubble4 = new Bubble();

  base = createSprite(400, 525, 799, 151);
  base.addAnimation("normal", "assets/base.png");

  base2 = createSprite(1199, 525, 799, 151);
  base2.addAnimation("normal", "assets/base.png");

  turtle = createSprite(250, 390, 77, 64);
  turtle.addAnimation("normal", "assets/turtle.png");

  fish = createSprite(890, 350, 26, 18);
  fish.addAnimation("normal", "assets/fish.png");

  ciel = createSprite(500, -5, 1000, 5);

  oceanScape = [base, base2, turtle, fish];
}

function draw() {
  background(10, 40, 55);
  drawSprites();

  // BASIC INTERFACE SETUP

  textSize(16);
  textFont("courier");
  fill(255, 255, 255);
  let scoreText = text("Bubbles Collected: " + score, 800, 20);
  let levelText = text("Level " + levelCount, 20, 20);

  if (paused === true) {
    textSize(30);
    textFont("courier");
    fill(255, 255, 255);
    let pauseText = text("Paused", 450, 285);
  }

  // player setup
  player = createSprite(450, 150, 80, 53);
  player.addAnimation("normalright", "assets/player1/idlePlayerRight.png");
  player.addAnimation("normalleft", "assets/player1/idlePlayerLeft.png");
  player.addAnimation(
    "runright",
    "assets/player1/runPlayerRight01.png",
    "assets/player1/runPlayerRight02.png",
    "assets/player1/runPlayerRight03.png",
    "assets/player1/runPlayerRight04.png"
  );
  player.addAnimation(
    "runleft",
    "assets/player1/runPlayerLeft01.png",
    "assets/player1/runPlayerLeft02.png",
    "assets/player1/runPlayerLeft03.png",
    "assets/player1/runPlayerLeft04.png"
  );
  player.addAnimation("jumpright", "assets/player1/jumpPlayerRight.png");
  player.addAnimation("jumpleft", "assets/player1/jumpPlayerLeft.png");

  //PLATFORM COLLISION

  oceanScape.forEach(block => {
    if (player.collide(block)) {
      player.velocity.y = 0;
      if (playerStatus === "right") {
        player.changeAnimation("normalright");
      } else if (playerStatus === "left") {
        player.changeAnimation("normalleft");
      }
    }
  });
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
  bubble3.move();
  bubble3.show();
  bubble4.move();
  bubble4.show();

  //PLAYER MOVEMENT & CONTROLS

  player.velocity.y += 0.23;
  player.maxSpeed = 5;

  if (player.position.x < 0) {
    player.position.x = 1000;
  }

  if (player.position.x > 1000) {
    player.position.x = 0;
  }

  if (keyWentDown(" ") || keyWentDown(UP_ARROW) || keyWentDown("w")) {
    player.velocity.y -= 20;
    if (playerStatus === "right") {
      player.changeAnimation("jumpright");
    } else if (playerStatus === "left") {
      player.changeAnimation("jumpleft");
    }
  }

  if (keyWentDown("d") || keyWentDown(RIGHT_ARROW)) {
    playerStatus = "right";
  }

  if (keyDown("d") || keyDown(RIGHT_ARROW)) {
    player.velocity.x += 0.4;
    player.changeAnimation("runright");
  }

  if (keyWentDown("a") || keyWentDown(LEFT_ARROW)) {
    playerStatus = "left";
  }

  if (keyDown("a") || keyDown(LEFT_ARROW)) {
    player.velocity.x -= 0.4;
    player.changeAnimation("runleft");
  }

  if (
    keyWentUp("a") ||
    keyWentUp("d") ||
    keyWentUp(LEFT_ARROW) ||
    keyWentUp(RIGHT_ARROW)
  ) {
    player.velocity.x = 0;
    if (playerStatus === "right") {
      if (player.velocity.y) {
        player.changeAnimation("jumpright");
      } else {
        player.changeAnimation("runright");
      }
    } else if (playerStatus === "left") {
      if (player.velocity.y) {
        player.changeAnimation("jumpleft");
      } else {
        player.changeAnimation("runleft");
      }
    }
  }
}

/*function mousePressed() {
    if (hasStarted === false) {
        if (player) {
            player.remove();
        }
        // player setup
        player = createSprite(450, 150, 80, 53);
        player.addAnimation("normalright", "assets/player1/idlePlayerRight.png");
        player.addAnimation("normalleft", "assets/player1/idlePlayerLeft.png");
        player.addAnimation(
            "runright",
            "assets/player1/runPlayerRight01.png",
            "assets/player1/runPlayerRight02.png",
            "assets/player1/runPlayerRight03.png",
            "assets/player1/runPlayerRight04.png"
        );
        player.addAnimation(
            "runleft",
            "assets/player1/runPlayerLeft01.png",
            "assets/player1/runPlayerLeft02.png",
            "assets/player1/runPlayerLeft03.png",
            "assets/player1/runPlayerLeft04.png"
        );
        player.addAnimation("jumpright", "assets/player1/jumpPlayerRight.png");
        player.addAnimation("jumpleft", "assets/player1/jumpPlayerLeft.png");


        hasStarted = true;
    } else {
        if (paused === false) {
            paused = true;
            noLoop();
        } else {
            paused = false;
            loop();
        }
    }
}*/

class Bubble {
  constructor() {
    this.x = 300;
    this.y = 400;
  }
  move() {
    this.x = this.x + random(-10, 10);
    this.y = this.y + random(-10, 10);
  }
  show() {
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(this.x, this.y, 24, 24);
  }
}
