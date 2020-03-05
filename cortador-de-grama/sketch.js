var cols = 7;
var rows = 7;
var free;
var field = new Array(cols);
var position;

function setup() {
  frameRate(10);
  console.log('Cortador de Grama');
  createCanvas(500, 500);

  free = cols * rows;
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
    }
  }
  
  field[0][0] = 0;
  field[cols - 1][rows - 1] = 0;
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      show(i, j);
    }
  } 
  
  
}

function draw() {
  if(free >=0){
	setTimeout(move, 100); 
  } else {
	noLoop(); 
  }
}

function show(i, j) {
  

  if (field[i][j] == 0) { // grama não cortada
    fill(0, 255, 0, 30);
  } else if (field[i][j] == 1) { // grama cortada
    fill(0, 255, 0);
  } else if (field[i][j] == 2) { // formigueiro
    fill(222, 184, 135);
  }	else if(field[i][j] = 3){
	  fill(135, 46, 111)
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
  field[position[0]][ position[1]]=3
  show(position[0], position[1]);
  field[x][y] = 1;
  --free;
  show(x, y);
}

