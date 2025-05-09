const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const size = 30;
const buttons = document.querySelectorAll("button");
const reload = document.getElementById("reload");
const robot = document.getElementById("robot");
const Gamerobot = document.getElementById("robotgame");
const playground = canvas.getBoundingClientRect();



let clickX = "";
let clickY = "";
let roundRobot = "";
let turns = 0;
let gameState = false;
let gameRobot = false;
let symboleRobot = "circle";

robot.addEventListener("click", () => {
  gameRobot = true;
  console.log(gameRobot);
});



const tableGame = [
  [
    { pos: { xPos: 1, yPos: 1 }, symbole: "" },
    { pos: { xPos: 2, yPos: 1 }, symbole: "" },
    { pos: { xPos: 3, yPos: 1 }, symbole: "" },
    { pos: { xPos: 4, yPos: 1 }, symbole: "" },
    { pos: { xPos: 5, yPos: 1 }, symbole: "" },
  ],
  [
    { pos: { xPos: 1, yPos: 2 }, symbole: "" },
    { pos: { xPos: 2, yPos: 2 }, symbole: "" },
    { pos: { xPos: 3, yPos: 2 }, symbole: "" },
    { pos: { xPos: 4, yPos: 2 }, symbole: "" },
    { pos: { xPos: 5, yPos: 2 }, symbole: "" },
  ],
  [
    { pos: { xPos: 1, yPos: 3 }, symbole: "" },
    { pos: { xPos: 2, yPos: 3 }, symbole: "" },
    { pos: { xPos: 3, yPos: 3 }, symbole: "" },
    { pos: { xPos: 4, yPos: 3 }, symbole: "" },
    { pos: { xPos: 5, yPos: 3 }, symbole: "" },
  ],
  [
    { pos: { xPos: 1, yPos: 4 }, symbole: "" },
    { pos: { xPos: 2, yPos: 4 }, symbole: "" },
    { pos: { xPos: 3, yPos: 4 }, symbole: "" },
    { pos: { xPos: 4, yPos: 4 }, symbole: "" },
    { pos: { xPos: 5, yPos: 4 }, symbole: "" },
  ],
  [
    { pos: { xPos: 1, yPos: 5 }, symbole: "" },
    { pos: { xPos: 2, yPos: 5 }, symbole: "" },
    { pos: { xPos: 3, yPos: 5 }, symbole: "" },
    { pos: { xPos: 4, yPos: 5 }, symbole: "" },
    { pos: { xPos: 5, yPos: 5 }, symbole: "" },
  ],
];

// Sélection joueur
let symbolSelected = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.value == "circle") {
      localStorage.setItem("value", symbolSelected);
      symboleRobot = "cross";
      return (symbolSelected = "circle");
    } else {
      localStorage.setItem("value", symbolSelected);
      symboleRobot = "circle";
      return (symbolSelected = "cross");
    }
  });
});

//Refresh la page
reload.addEventListener("click", () => {
  window.location.reload();
});

symbolSelected = localStorage.getItem("value");
console.log(symboleRobot);

// Déssiner
function drawSymbol(x, y, g) {
  if (g == "circle") {
    drawCircle(x, y);
  } else if (g == "cross") {
    drawCross(x, y);
  }
}

let table = [{ xPos: "", yPos: "" }];

// Logique position des cliques
function logicPos(x, y) {
  for (let i = 0; i < y; i += 100) {
    if (y <= i + 1 * 100) {
      table.yPos = 1 + i / 100;
    }
  }
  for (let j = 0; j < x; j += 100) {
    if (x <= j + 1 * 100) {
      table.xPos = 1 + j / 100;
    }
  }
  return table;
}

// Met a jour notre tableau d'objet
function updateTable(xPos, yPos, currSym) {
  tableGame.forEach((ligne) => {
    ligne.forEach((index) => {
      if (index.pos.xPos === xPos && index.pos.yPos === yPos) {
        if (index.symbole) {
          if (roundRobot) {
            robotTurn();
          } else {
            alert("Case déjà occupée : ");
          }
        } else {
          index.symbole = currSym;
          drawSymbol(
            index.pos.xPos * 100 - 50,
            index.pos.yPos * 100 - 50,
            currSym
          );
          roundRobot = true;
          return roundRobot;
        }
      }
    });
  });
}

drawGrid();

function takeTurn(currX, currY, currentSymbol) {
  logicPos(currX, currY);

  //   Mise a jour de la table
  updateTable(table.xPos, table.yPos, currentSymbol);

  //   Vérification win
  checkWin(tableGame, currentSymbol);
}

function checkWin(tableGame, playerSymbol) {
  for (const condition of winConditions) {
    const hasWon = condition.every(
      ([x, y]) => tableGame[y][x].symbole === playerSymbol
    );
    if (hasWon) {
      gameState = true;
      console.log("gagnéé");
    }
  }
  return false;
}

// console.log(winConditions)
function inverseSymbolSelected() {
  if (symbolSelected === "circle") {
    symbolSelected = "cross";
  } else {
    symbolSelected = "circle";
  }
}

function inverseSymbolSelectedRobot() {
  if (symboleRobot === "circle") {
    symboleRobot = "cross";
  } else {
    symboleRobot = "circle";
  }
}

function robotTurn() {
  let robotX = (Math.floor(Math.random() * 5) + 1) * 100;
  let robotY = (Math.floor(Math.random() * 5) + 1) * 100;
    
  takeTurn(robotX, robotY, symboleRobot);
    
}

// Event clique sur le canvas
canvas.addEventListener("click", (e) => {
  clickX = e.clientX - playground.left;
  clickY = e.clientY - playground.top;

  if (gameState === false && gameRobot === true) {
    //   Vérification logique placement
    takeTurn(clickX, clickY, symbolSelected);
    if (roundRobot) {
      robotTurn();
      roundRobot = false;
    }
  } else if (gameState === false && gameRobot === false) {
    //   Vérification logique placement
    inverseSymbolSelected();

    takeTurn(clickX, clickY, symbolSelected);
  } else {
    alert("Veuillez choisir quelque chose !!!");
  }
});




let start = false;
Gamerobot.addEventListener("click", () => {
  if(!gameState){
    const intervalId = setInterval(() => {
    robotTurn();
    inverseSymbolSelectedRobot();
    if(gameState){
      clearInterval(intervalId)
    }
    }, 1000)
  }
});
