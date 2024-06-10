import "./styles.css";
import { Player } from "./classes/player";
import { setUpBoards, placeShips, handleAttack } from "./modules/handleBoard";

setUpBoards();

const player = new Player();
const computer = new Player();

placeShips(0, 0, "y", 3, player.gameboard);
placeShips(0, 8, "y", 5, player.gameboard);
placeShips(8, 0, "x", 3, player.gameboard);
placeShips(9, 0, "x", 2, player.gameboard);

placeShips(0, 0, "y", 3, computer.gameboard, false);
placeShips(0, 8, "y", 5, computer.gameboard, false);
placeShips(8, 0, "x", 3, computer.gameboard, false);
placeShips(9, 0, "x", 2, computer.gameboard, false);

let gameOver = false;
let yourTurn = true;

const movesMade = new Set();
function randomMove() {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);
  while (movesMade.has(`${row},${col}`)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }
  movesMade.add(`${row},${col}`);
  handleAttack(row, col, player.gameboard);
  yourTurn = !yourTurn;
}

function winMessage(msg) {
  const div = document.getElementById("win-message");
  div.textContent = msg;
}

document.querySelector("#computer-board").addEventListener("click", (e) => {
  if (gameOver || !yourTurn) return;

  if (e.target.className === "board-cell") {
    let idName = e.target.id;
    const coord = idName.split("-").splice(1);
    const row = coord[0];
    const col = coord[1];
    handleAttack(row, col, computer.gameboard, false);
    yourTurn = !yourTurn;
    if (!yourTurn) setTimeout(randomMove, 100);
  }

  if (player.gameboard.checkGameOver()) {
    player.gameboard.freezeBoard();
    computer.gameboard.freezeBoard();
    gameOver = true;
    winMessage("You lost :(");
  } else if (computer.gameboard.checkGameOver()) {
    player.gameboard.freezeBoard();
    computer.gameboard.freezeBoard();
    gameOver = true;
    winMessage("You won :D");
  }
});
