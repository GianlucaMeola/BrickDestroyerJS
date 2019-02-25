import Brick from "/src/brick";

//function to build the brick level
export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 75 + 24 * rowIndex
        };

        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

//levels of the game
export const level1 = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] //1st row
];
export const level2 = [
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0], //1st row
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //2nd row full of bricks
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //3rd row full of bricks
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //4th row full of bricks
];
