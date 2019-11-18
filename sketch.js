/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */

//Variable Initiation
let cnv;
let player;
let full;
let roll;
let base;
let base2;
let turtle;
let bubble1;
let bubble2;
let bubble3;
let bubble4;
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

//This  Function Initiates the canvas
function setup() {
  bg = background(300)
  cnv = createCanvas(1000, 600);
  cnv.parent("parent");
  scoreElem = createDiv("Bubbles = " + score);
  scoreElem.position(20, 20);
  scoreElem.id = "score";
  scoreElem.style("color", "white");
  full = [];
  bubble1 = new Bubble();
  bubble2 = new Bubble();
  bubble3 = new Bubble();
  bubble4 = new Bubble();

  player = createSprite(100, 200, 175, 191);
  player.addAnimation("normalRight", "assets/player1/idlePlayerRight.png");
  player.addAnimation("normalLeft", "assets/player1/idlePlayerLeft.png");

  base = createSprite(400, 525, 799, 151);
  base.addAnimation("normal", "assets/base.png");

  base2 = createSprite(1199, 525, 799, 151);
  base2.addAnimation("normal", "assets/base.png");

  turtle = createSprite(250, 390, 77, 64)
  turtle.addAnimation("normal", "assets/turtle.png");

  sub = createSprite(550, 340, 468, 127)
  sub.addAnimation("normal", "assets/sub.png");

  fish = createSprite(890, 350, 26, 18);
  fish.addAnimation("normal", "assets/fish.png");

  oceanScape = [base, base2, turtle, fish, sub];
  ciel = createSprite(500, -5, 1000, 5);

}

//This Function Loops to Animate Sprites
function draw() {


    background(10, 40, 70);
    drawSprites();


    textSize(16);
    textFont("courier");
    fill(255, 255, 255);
    let scoreText = text("Bubbles Collected: " + score, 800, 20);
    let levelText = text("Level " + levelCount, 20, 20);

    //Bubble animation
    bubble1.move();
    bubble1.show();
    bubble2.move();
    bubble2.show();
    bubble3.move();
    bubble3.show();
    bubble4.move();
    bubble4.show();

    //player setup
    player.velocity.y += 0.2;
    player.maxSpeed = 4.5;

    oceanScape.forEach((oceanItem) => {
      if (player.collide(oceanItem)) {
        player.velocity.y = 0;
        if (playerStatus === "right") {
          player.changeAnimation("normalRight");
        } else if (playerStatus === "left") {
          player.changeAnimation("normalLeft");
        }
      }
    });
    //Player Controls
    if (keyWentDown(" ")) {
      player.velocity.y -= 4.5
    }

    if (keyWentDown("d")) {
      playerStatus = "right";
    }
     if (keyWentDown("a")) {
       playerStatus = "left";
       player.changeAnimation("normalLeft");
     }
    if (keyDown("a")) {
      player.velocity.x -= 0.3;
      player.changeAnimation("normalLeft");
    }

    if (keyDown("d")) {
      player.velocity.x += 0.3;
    }

    player.velocity.y += 0.2;

}
//Bubble Class Definition
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
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }
}
