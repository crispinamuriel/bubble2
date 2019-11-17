/* eslint-disable max-statements */
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


function setup() {
  // bg = loadImage('assets/background.jpeg');
  bg = background(300)
  cnv = createCanvas(1000, 600);
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

function draw() {


    background(10, 40, 70);
    drawSprites();


    textSize(16);
    textFont("courier");
    fill(255, 255, 255);
    let scoreText = text("Bubbles Collected: " + score, 800, 20);
    let levelText = text("Level " + levelCount, 20, 20);


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
          player.changeAnimation("normalright");
        } else if (playerStatus === "left") {
          player.changeAnimation("normalleft");
        }
      }
    });

    if (keyWentDown(" ")) {
      player.velocity.y -= 4.5;
    }

    if (keyWentDown("d")) {
      playerStatus = "right";
    }
     if (keyWentDown("a")) {
       playerStatus = "left";
       player.changeAnimation("normalleft");
     }
    if (keyDown("a")) {
      player.velocity.x -= 0.3;
      player.changeAnimation("normalleft");
    }

    if (keyDown("d")) {
      player.velocity.x += 0.3;
    }

    player.velocity.y += 0.2;

}

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

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y
  }
  move() {
    this.x = this.x + random(1, 1);
    this.y = this.y + random(1, 1);
  }
  show() {

  }
}
