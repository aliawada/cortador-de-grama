// Pilha
var pilha = [];

// How many columns and rows?
var cols = 7;
var rows = 7;

// Width and height of each cell of grid
var w, h;

// This will be the 2D array
var grid = new Array(cols);

// Starting
var start;

// Total de formigueiros
var total_gramas = 0;

function Spot(i, j) {
  this.i = i;
  this.j = j;

  // Am I a formigueiro?
  if (random(1) < 0.1) {
    this.formigueiro = true;
  } else {
    this.grama_cortada = false;
    total_gramas++;
  }

  this.show = function (color) {
    if (this.formigueiro) {
      fill(222, 184, 135);
      stroke(0);
      rect(this.i * w, this.j * h, w - 1, h - 1);
    } else if (color) {
      fill(color);
      rect(this.i * w, this.j * h, w, h);
    }
  }

}

function setup() {
  console.log('Cortador de Grama');
  createCanvas(500, 500);

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // Desenha a matriz
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(0, 255, 0, 50));
    }
  }

  start = grid[0][0];
  start.formigueiro = false;
  start.grama_cortada = true;

  pilha.push(start);
}

function draw() {

  var proximo;
  var lastPosition;
  var total = 0;

  // Enquanto a grama total não está cortada do..
  do {

    // Corta a grama
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {


        if (i < cols - 1 && valid(grid[i + 1][j].grama_cortada === false && grid[i + 1][j].formigueiro === false) {
          proximo = grid[i + 1][j];
          proximo.grama_cortada = true;
          grid[i][j].show(color(0, 255, 0));
          total++;
          pilha.push(proximo);
        } else if (i > 0 && grid[i - 1][j].grama_cortada === false && grid[i - 1][j].formigueiro === false) {
          proximo = grid[i - 1][j];
          proximo.grama_cortada = true;
          grid[i][j].show(color(0, 255, 0));
          total++;
          pilha.push(proximo);
        } else if (j < rows - 1 && grid[i][j + 1].grama_cortada === false && grid[i][j + 1].formigueiro === false) {
          proximo = grid[i][j + 1];
          proximo.grama_cortada = true;
          grid[i][j].show(color(0, 255, 0));
          total++;
          pilha.push(proximo);
        } else if (j > 0 && grid[i][j - 1].grama_cortada === false && grid[i][j - 1].formigueiro === false) {
          proximo = grid[i][j - 1];
          proximo.grama_cortada = true;
          grid[i][j].show(color(0, 255, 0));
          total++;
          pilha.push(proximo);
        }
        // voltar
        else {
          lastPosition = pilha.pop();
          console.log(lastPosition);

          if (lastPosition) {
            if (lastPosition.i < cols - 1 && grid[lastPosition.i + 1][lastPosition.j].grama_cortada === false && grid[lastPosition.i + 1][lastPosition.j].formigueiro === false) {
              proximo = grid[lastPosition.i + 1][lastPosition.j];
              proximo.grama_cortada = true;
              grid[i][j].show(color(0, 255, 0));
              total++;
              pilha.push(proximo);
            } else if (lastPosition.i > 0 && grid[lastPosition.i - 1][lastPosition.j].grama_cortada === false && grid[lastPosition.i - 1][lastPosition.j].formigueiro === false) {
              proximo = grid[lastPosition.i - 1][lastPosition.j];
              proximo.grama_cortada = true;
              grid[i][j].show(color(0, 255, 0));
              total++;
              pilha.push(proximo);
            } else if (lastPosition.j < rows - 1 && grid[lastPosition.i][lastPosition.j + 1].grama_cortada === false && grid[lastPosition.i][lastPosition.j + 1].formigueiro === false) {
              proximo = grid[lastPosition.i][lastPosition.j + 1];
              proximo.grama_cortada = true;
              grid[i][j].show(color(0, 255, 0));
              total++;
              pilha.push(proximo);
            } else if (lastPosition.j > 0 && grid[lastPosition.i][lastPosition.j - 1].grama_cortada === false && grid[lastPosition.i][lastPosition.j - 1].formigueiro === false) {
              proximo = grid[lastPosition.i][lastPosition.j - 1];
              proximo.grama_cortada = true;
              grid[i][j].show(color(0, 255, 0));
              total++;
              pilha.push(proximo);
            }
          }

        }


        // if (grid[i][j].grama_cortada === true) {
        //   grid[i][j].show(color(0, 255, 0));
        // }

      }
    }

  } while (isGramaCortada(total));

  console.log(total);
  console.log(total_gramas);
  noLoop();

}

function isGramaCortada(total) {
  if (total === total_gramas)
    return true;

  return false;
}

function validSpot(spot) {
  if (spot.grama_cortada === false && spot.formigueiro === false) {
    return true;
  }

  return false;
}