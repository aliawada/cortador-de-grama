var cols = 7;
var rows = 7;
var free;
var busy;
var field = new Array(cols);
var position;

function setup() {
  console.log('Cortador de Grama');
  createCanvas(500, 500);

  free = cols * rows;
  busy = 0;
  position = new Array(2);
  position[0] = position[1] = 0;

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Criando a matriz
  for (var i = 0; i < cols; i++) {
    field[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (random(1) < 0.1) {
        field[i][j] = 2;
      } else {
        field[i][j] = 0;
      }
      show(i, j);
    }
  }

}

function draw() {
  while(free >= 0) {
    move();
  }
  
  noLoop();
}

function show(i, j) {
  if (field[i][j] == 0) { // grama não cortada
    fill(0, 255, 0, 30);
  } else if (field[i][j] == 1) { // grama cortada
    fill(0, 255, 0);
  } else if (field[i][j] == 2) { // formigueiro
    fill(222, 184, 135);
  }

  rect(i * w, j * h, w, h);
}

function move() {
  var x = position[0];
  var y = position[1];

  if (x < rows - 1 && field[x + 1][y] == 0) {
    position[0] = x + 1;
    position[1] = y;
  } else if (y < cols - 1 && field[x][y + 1] == 0) {
    position[0] = x;
    position[1] = y + 1;
  } else if (x > 0 && field[x - 1][y] == 0) {
    position[0] = x - 1;
    position[1] = y;
  } else if (y > 0 && field[x][y - 1] == 0) {
    position[0] = x;
    position[1] = y - 1;
  } else {
    if (y > 0 && field[x][y - 1] == 1) {
      position[0] = x;
      position[1] = y - 1;
    } else if (x < rows - 1 && field[x + 1][y] == 1) {
      position[0] = x + 1;
      position[1] = y;
    } else if (y < cols - 1 && field[x][y + 1] == 1) {
      position[0] = x;
      position[1] = y + 1;
    } else if (x > 0 && field[x - 1][y] == 1) {
      position[0] = x - 1;
      position[1] = y;
    }
  }
  field[x][y] = 1;
  ++busy;
  --free;
  show(x, y);
}
