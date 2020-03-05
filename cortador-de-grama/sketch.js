var cols = 7;
var rows = 7;
var free = 0;
var field = new Array(cols);
var position;

function setup() {
  frameRate(10);
  console.log('Cortador de Grama');
  createCanvas(500, 500);

  position = new Array(2);
  position[0] = position[1] = 0;

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Criando a matriz
  for (var i = 0; i < cols; i++) {
    field[i] = new Array(rows);
  }

  // preenchendo a matriz com 0 para grama ou 2 para formigueiro
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (random(1) < 0.1) {
        field[i][j] = 2;
      } else {
        field[i][j] = 0;
        free++;
      }
    }
  }

  // primeira posição não pode ser formigueiro
  field[0][0] = 0;

  // pintar o canvas
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      show(i, j);
    }
  }


}

function draw() {
  // enquanto não passar pela matriz, move()
  if (free == 1) {
    noLoop();
  } else {
    setTimeout(move, 100);
  }
}

function show(i, j) {

  if (field[i][j] == 0) { // grama não cortada
    fill(0, 255, 0, 30);
  } else if (field[i][j] == 1) { // grama cortada
    fill(0, 255, 0);
  } else if (field[i][j] == 2) { // formigueiro
    fill(222, 184, 135);
  } else if (field[i][j] == 3) { // posição atual
    fill(135, 46, 111);
  }

  rect(i * w, j * h, w, h);
}

function move() {
  var x = position[0];
  var y = position[1];

  // escolhe direção
  if (x < rows - 1 && field[x + 1][y] == 0) {
    position[0] = x + 1;
    position[1] = y;
    --free;
  } else if (y > 0 && field[x][y - 1] == 0) {
    position[0] = x;
    position[1] = y - 1;
    --free;
  } else if (x > 0 && field[x - 1][y] == 0) {
    position[0] = x - 1;
    position[1] = y;
    --free;
  } else if (y < cols - 1 && field[x][y + 1] == 0) {
    position[0] = x;
    position[1] = y + 1;
    --free;
  } else {
    if (x > 0 && field[x - 1][y] == 1) {
      position[0] = x - 1;
      position[1] = y;
    } else if (y < cols - 1 && field[x][y + 1] == 1) {
      position[0] = x;
      position[1] = y + 1;
    } else if (y > 0 && field[x][y - 1] == 1) {
      position[0] = x;
      position[1] = y - 1;
    } else if (x < rows - 1 && field[x + 1][y] == 1) {
      position[0] = x + 1;
      position[1] = y;
    }
  }

  // current position
  field[position[0]][position[1]] = 3;
  show(position[0], position[1]);

  // grama cortada
  field[x][y] = 1;
  show(x, y);
}