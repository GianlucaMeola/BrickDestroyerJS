import { detectCollition } from "./collitionDetection";

//ball creation file
export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    //detecting the game window
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    //ball size
    this.size = 16;
    this.reset();
  }

  reset() {
    //starting positioning and speed of the ball
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -2 };
  }
  //draw the ball on the board
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  // ball movement
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //wall collition left and rigth : if the ball is at the end of the wall the need to reverse the speed
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //wall collision top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    //bottom of the game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    ///detect collitio (ball,object)
    if (detectCollition(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
