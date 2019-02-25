import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    //creating the paddle and the ball with Paddle and Ball class
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    //inizialize gameObjects
    this.gameObjects = [];
    //numebr of left bricks
    this.bricks = [];
    //lives
    this.lives = 3;
    //level in the game
    this.levels = [level1, level2];
    this.currentLevel = 0;

    //controller
    new InputHandler(this.paddle, this);
  }

  //starting the game
  start() {
    //only menu nad new level can trigger the new beginning
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;
    //positioning brick and declare the level
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    //reset ball
    this.ball.reset();
    //create an array to store all the objects
    this.gameObjects = [this.ball, this.paddle];
    //run the game
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    //if no lives then gameover
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    //if in pause or menu or gameover don't update
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    //next level function
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    //ball and paddle  brick movement and update
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    //destroy bricks that has been hit
    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    //draw the ball and the paddle  bricks
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

    //pasue screen
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    //menu screen
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0, 1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    //gameover screen
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0, 1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  //pause function
  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
