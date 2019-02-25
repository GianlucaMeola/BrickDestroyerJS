export function detectCollition(ball, gameObject) {
  //check ball collision
  //ball position
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  //object position
  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
