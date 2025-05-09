// Déssiner un rond
function drawCircle(xPos, yPos) {
  context.linewidth = 10;
  context.strokeStyle = "#DCD6F7";

  context.beginPath();

  context.arc(xPos, yPos, size, 0, 2 * Math.PI);

  context.stroke();
}

// Déssiner une croix
function drawCross(xPos, yPos) {
  context.linewidth = 10;
  context.strokeStyle = "#A6B1E1";
  context.beginPath();
  context.moveTo(xPos - size, yPos - size);
  context.lineTo(xPos + size, yPos + size);
  context.stroke();

  context.beginPath();
  context.moveTo(xPos + size, yPos - size);
  context.lineTo(xPos - size, yPos + size);
  context.stroke();
}

// Déssiner la grille de jeu
function drawGrid() {
  context.linewidth = 10;
  context.lineCap = "round";
  context.strokeStyle = "#985F6F";

  let widthSquare = playground.width;
  let heightSquare = playground.height;
  let leftSquare = playground.left;
  let topSquare = playground.top;

  let lineLength = 300;

  context.beginPath();

  for (let i = 1; i <= 2; i++) {
    context.moveTo(100, i * 100 + 100);
    context.lineTo(lineLength + 100, i * 100 + 100);
  }

  for (let j = 1; j <= 2; j++) {
    context.moveTo(j * 100 + 100, 100);
    context.lineTo(j * 100 + 100, lineLength + 100);
  }

  context.stroke();
}


// génération conditions victoire
const winConditions = [];
// Horizontales
for (let y = 0; y < 5; y++) {
  for (let x = 0; x <= 2; x++) {
    winConditions.push([
      [x, y],
      [x + 1, y],
      [x + 2, y],
    ]);
  }
}
// Verticales
for (let x = 0; x < 5; x++) {
  for (let y = 0; y <= 2; y++) {
    winConditions.push([
      [x, y],
      [x, y + 1],
      [x, y + 2],
    ]);
  }
}
// Diagonales ↘ (haut-gauche → bas-droit)
for (let x = 0; x <= 2; x++) {
  for (let y = 0; y <= 2; y++) {
    winConditions.push([
      [x, y],
      [x + 1, y + 1],
      [x + 2, y + 2],
    ]);
  }
}
// Diagonales ↙ (haut-droit → bas-gauche)
for (let x = 2; x < 5; x++) {
  for (let y = 0; y <= 2; y++) {
    winConditions.push([
      [x, y],
      [x - 1, y + 1],
      [x - 2, y + 2],
    ]);
  }
}
