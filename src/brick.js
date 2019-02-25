import { detectCollition } from "./collitionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game = game;

    //starting positioning of the brick
    this.position = position;
    //size of the brick
    this.width = 80;
    this.height = 24;
    //variable that mark the brick if its been hit
    this.markedForDeletion = false;
  }

  update() {
    if (detectCollition(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      //brick has been hit
      this.markedForDeletion = true;
    }
  }

  //finction to draw the bricks
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
