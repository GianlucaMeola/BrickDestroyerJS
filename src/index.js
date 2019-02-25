import Game from "/src/game";
//Take the canvas 'board'
let canvas = document.getElementById("gameScreen");
//kid of dimension = 2D
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

//let call the game engine
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

//take the last time
let lastTime = 0;

//creating the game loop
function gameLoop(timestamp) {
  //calculate how much time is past
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  //clear the screen
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  //call the function to move ball and paddle
  game.update(deltaTime);
  //draw the ball and paddle
  game.draw(ctx);

  //get the time that is passing
  requestAnimationFrame(gameLoop);
}

//run the frame
requestAnimationFrame(gameLoop);
