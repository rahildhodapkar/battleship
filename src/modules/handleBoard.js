export function setUpBoards() {
  const playerBoard = document.getElementById("player-board");
  const computerBoard = document.getElementById("computer-board");
  
  function setUpBoardHelper(board) {
    let flag = 1;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const div = document.createElement("div");
        div.id = `cell-${r}-${c}`;
        div.className = "board-cell"
        if (c % 2 === flag) {
          div.style.backgroundColor = "gray"
        } else {
          div.style.backgroundColor = "lightgray"
        }
        board.appendChild(div);
      }
      flag = flag === 1 ? 0 : 1;
    }
  }

  setUpBoardHelper(playerBoard);
  setUpBoardHelper(computerBoard);
}

export function placeShips(row, col, align, length, gameboard, player=true) {
  const shipCoord = gameboard.placeShip(row, col, align, length);
  shipCoord.forEach((coord) => {
    coord = coord.split(',');
    row = coord[0];
    col = coord[1];

    if (player) {
      document.getElementById(`cell-${row}-${col}`).style.backgroundColor = "blue";
    }
  });
}

function colorSunkShip(shipCoord, player) {
  shipCoord.forEach((coord) => {
    coord = coord.split(',');
    const row = coord[0];
    const col = coord[1];

    if (player) {
      document.querySelector(`#player-board #cell-${row}-${col}`).style.backgroundColor = "red";
    } else {
      document.querySelector(`#computer-board #cell-${row}-${col}`).style.backgroundColor = "red";
    }
  });
}

export function handleAttack(row, col, gameboard, player=true) {
  const res = gameboard.receiveAttack(row, col);

  if (!res) {
    return;
  }

  if (res instanceof Set) {
    colorSunkShip(res, player);
  } else if (res[2] === "y") {
    row = res[0];
    col = res[1];

    if (player) {
      document.querySelector(`#player-board #cell-${row}-${col}`).style.backgroundColor = "orange";
    } else {
      document.querySelector(`#computer-board #cell-${row}-${col}`).style.backgroundColor = "orange";
    }
  } else {
    row = res[0];
    col = res[1];

    if (player) {
      document.querySelector(`#player-board #cell-${row}-${col}`).style.backgroundColor = "green";
    } else {
      document.querySelector(`#computer-board #cell-${row}-${col}`).style.backgroundColor = "green";
    }
  }
}