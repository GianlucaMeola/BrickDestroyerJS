//Paddle creation file
export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    //paddle dimension
    this.width = 150;
    this.height = 20;

    this.maxSpeed = 7;
    this.speed = 0;

    //Paddle positioning
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  //left movement
  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  //right movement
  moveRight() {
    this.speed = this.maxSpeed;
  }

  //stop the paddle
  stop() {
    this.speed = 0;
  }

  //drawing the paddle
  draw(ctx) {
    ctx.fillStyle = "#0ff"; //color of the paddle
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  //how much to move per time
  update(deltaTime) {
    //paddle movement
    this.position.x += this.speed;

    //edge collision
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
