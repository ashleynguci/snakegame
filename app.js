
var width = 15; // width of canvas
var height = 15; // height of canvas

var input; // The arrow key input of the user.
var direction; // The direction that the snake is moving.

var food; // The coordinate of the food.
var snake; // The list of coordinates of the snake.

var interval = 300; // Time in milliseconds between each render() loop.

// Canvas Setup
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var box = 40; // Pixel equivalent of one width/height unit in the canvas
cvs.height = height * box;
cvs.width = width * box;

// Food img
var foodImg = new Image();
foodImg.src =
  "data:image/png;base64,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";
foodImg.setAttribute("style", "borderRadius: 50%");
function refreshCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  // Draw food
  ctx.drawImage(foodImg, food.x * box, food.y * box, box, box);
  // Draw snake
  for (let i = snake.length - 1; i >= 0; i--) {
    ctx.fillStyle = i === 0 ? "white" : "darksalmon";
    ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
    ctx.strokeStyle = "darksalmon";
    ctx.strokeRect(snake[i].x * box, snake[i].y * box, box, box);
  }
}

// Records input direction
document.addEventListener("keydown", arrowInput);
function arrowInput(event) {
  if (event.keyCode === 37) {
    input = "left";
  } else if (event.keyCode === 38) {
    input = "up";
  } else if (event.keyCode === 39) {
    input = "right";
  } else if (event.keyCode === 40) {
    input = "down";
  }
}



function createFood() {
  var random = Math.floor(Math.random() * 15);
  food = {x:random, y:random};

  if (collision(food) === true) {
    createFood();
}
}

function createSnake() {

  snake = [{ x: 1, y: 1 }];
}

function render() {
  var newHead = { x: snake[0].x, y: snake[0].y };
if (
    (input == "right" && direction != "left") ||
    (input == "left" && direction != "right") ||
    (input == "up" && direction != "down") ||
    (input == "down" && direction != "up")
  )
  {
    direction = input;
  }

  if (direction == "up") {
    newHead.y = newHead.y - 1;
  }
  if (direction == "down") {
    newHead.y = newHead.y +1;}

  if (direction == "left") {
    newHead.x = newHead.x -1;
  }
  if (direction == "right") {
    newHead.x = newHead.x +1;
  }

if (newHead.x == food.x && newHead.y == food.y) {
    createFood();
  } else {
    snake.pop();
  }

  /******** Task #3 ********/
  // Restart the game if nextHead is in a coordinate that would end the game.
  if(newHead.y > height - 1 ||
    newHead.y < 0 ||
    newHead.x > width - 1 ||
    newHead.x < 0 || collision(newHead)

  ) {
    setupNewGame();
  } else {
snake.unshift(newHead);
  refreshCanvas();
}
}
/******** Task #3.2 ********/
// Check collision
function collision(coordinate) {
  for (var i = 0; i < snake.length; i++) {
    if (coordinate.x === snake[i].x && coordinate.y === snake[i].y) {
      return true;
    }
  }
  return false;
}



// CAll draw function every 300 ms
var drawLoop = setInterval(render, interval);

// Setup game objects to initial values
function setupNewGame() {
  direction = null;
  input = null;
  createSnake();
  createFood();
  refreshCanvas();
}

// Init game
setupNewGame();
