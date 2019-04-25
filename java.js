let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let color = '#1589FF';
let dx = 3, dy = 2;
let gameOver = false;
let gameWin = false;
let score = 0;

let stone = {
  offsetX: 35,
  offsetY: 10,
  margin: 6,
  width: 60,
  height: 18,
  row: 7,
  col: 14
};
let stoneList = [];
let maxScore = stone.row*stone.col;


for (let i = 0; i < stone.row; i++) {
  for (let j = 0; j < stone.col; j++) {
    stoneList.push({
      x: stone.offsetX + j *(stone.width + stone.margin),
      y: stone.offsetY + i*(stone.height + stone.margin),
      isBroken: false
    });
  }
}