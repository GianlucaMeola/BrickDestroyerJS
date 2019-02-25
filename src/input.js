//controller file
export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      //catching the input for the controller
      switch (event.keyCode) {
        case 37: //left button <-
          paddle.moveLeft(); //movent funcion in paddle file
          break;
        case 39: //right button ->
          paddle.moveRight();
          break;
        case 27: //pause button Esc
          game.togglePause();
          break;
        case 32: //spacebar start
          game.start();
          break;
      }
    });

    //stop the paddle when release the key
    document.addEventListener("keyup", event => {
      //catching the input for the controller
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop(); //movent funcion in paddle file
          break;
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}
