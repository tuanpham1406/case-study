function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Bars(width, height, x, y, speed, isLeft, isRight) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.isLeft = isLeft;
  this.isRight = isRight;
}

function Circle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
}

function createCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
let circle = new Circle();
circle.x = 500;
circle.y = canvas.height - 30;
circle.radius = 12;

function paintBars() {
  ctx.beginPath();
  ctx.rect(bars.x, bars.y, bars.width, bars.height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
let bars = new Bars();
bars.width = 80;
bars.height = 10;
bars.x = 500;
bars.y = canvas.height - 10;
bars.speed = 8;
bars.isLeft = false;
bars.isRight = false;

function paintBricks() {
  stoneList.forEach(function (b) {
    if (!b.isBroken) {
      ctx.beginPath();
      ctx.rect(b.x, b.y, stone.width, stone.height);
      ctx.fill();
      ctx.closePath();
    }
  });
}

function handleCollisionBall() {
  if (circle.x < circle.radius || circle.x > canvas.width - circle.radius) {
    dx = - dx;
  }
  if (circle.y < circle.radius) {
    dy = - dy;
  }
}

function processingMovesBars () {
  if (circle.y + circle.radius >= canvas.height - bars.height &&
    circle.x + circle.radius >= bars.x && circle.x + circle.radius <= bars.x + bars.width) {
    dy = -dy;
  }
}

function processingMovesBall() {
  circle.x += dx;
  circle.y += dy;
}

function handleCollisionBars() {
  if (bars.isLeft === true) {
    bars.x -= bars.speed;
  } else if (bars.isRight === true) {
    bars.x += bars.speed;
  }
}

function movesBars() {
  if (bars.x < 0){
    bars.x = 0;
  } else if (bars.x > canvas.width - bars.width) {
    bars.x = canvas.width - bars.width;
  }
}

function handleCollisionStone () {
  stoneList.forEach(function (b) {
    if (!b.isBroken) {
      if (circle.x >= b.x && circle.x <= b.x + stone.width &&
        circle.y + circle.radius >= b.y && circle.y - circle.radius <= b.y + stone.height){
        dy = -dy;
        b.isBroken = true;
        score += 1;
        if (score >= maxScore) {
          gameWin = true;
          gameOver = true;
        }
      }
    }
  });
}

function displayScore() {
  document.getElementById("score").innerHTML = "SCORE: " + score;
}

document.addEventListener('keyup', function (event) {
  if (event.keyCode === 37) {
    bars.isLeft = false;
  } else if (event.keyCode === 39) {
    bars.isRight = false;
  }
});
document.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) {
    bars.isLeft = true;
  } else if (event.keyCode === 39) {
    bars.isRight = true;
  }
  if (event.keyCode === 32 ) {
    paint();
  }
});

function checkGameOver() {
  if (circle.y > canvas.height - circle.radius) {
    gameOver = true;
  }
}

function mess() {
  if (gameWin === true) {
    alert("YOU WIN");
  } else {
    alert("YOU LOSE ....u u u u u")
  }
}