import { Ship } from "./ship";

export class Gameboard {
  #dim;
  #board;
  #missedAttacks;
  #ships;
  #gameOver;

  constructor(dim) {
    this.#dim = dim;
    this.#board = Array.from({ length: this.#dim }, () =>
      Array(this.#dim).fill(0)
    );
    this.#missedAttacks = [];
    this.#ships = new Map();
    this.#gameOver = false;
  }

  #isCollision(row, col, align, length) {
    if (align === "x") {
      for (let i = 0; i < length; i++) {
        if (this.#board[row][col + i] === 1) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (this.#board[row + i][col] === 1) {
          return true;
        }
      }
    }
    return false;
  }

  #isInvalidCoord(row, col) {
    if (
      row < 0 ||
      col < 0 ||
      row >= this.#board.length ||
      col >= this.#board[0].length
    ) {
      return true;
    }
    return false;
  }

  // The align param sets whether a ship is aligned along the x or y axis. If align=y, the ship is aligned downwards. Otherwise, the ship is aligned to the right along the x axis.
  placeShip(row, col, align, length) {
    if (
      length > this.#dim ||
      this.#isInvalidCoord(row, col) ||
      this.#isCollision(row, col, align, length)
    ) {
      return;
    }

    let ship = new Ship(length);
    let shipCoord = new Set();

    if (align === "x" && length - 1 + col < this.#board[0].length) {
      for (let i = 0; i < length; i++) {
        this.#board[row][col + i] = 1;
        shipCoord.add(`${row},${col + i}`);
      }
    } else if (length - 1 + row < this.#board.length) {
      for (let i = 0; i < length; i++) {
        this.#board[row + i][col] = 1;
        shipCoord.add(`${row + i},${col}`);
      }
    }

    this.#ships.set(ship, shipCoord);
    return shipCoord;
  }

  #isDirectHit(row, col) {
    for (const key of this.#ships.keys()) {
      if (this.#ships.get(key).has(`${row},${col}`)) {
        return key;
      }
    }
    return null;
  }

  checkGameOver() {
    for (const key of this.#ships.keys()) {
      if (!key.isSunk()) {
        return false;
      }
    }
    this.#gameOver = true;
    return true;
  }

  freezeBoard() {
    this.#gameOver = true;
  }

  receiveAttack(row, col) {
    if (!this.#gameOver) {
      if (this.#isInvalidCoord(row, col)) {
        return;
      }
  
      let ship = this.#isDirectHit(row, col);
      if (ship) {
        ship.hit();
        this.#board[row][col] = "x";
        this.checkGameOver();
        if (ship.isSunk()) {
          return this.#ships.get(ship);
        } 
        return [row, col, "y"];
      } else {
        this.#board[row][col] = "o";
        this.#missedAttacks.push([row, col]);
        return [row, col, "n"];
      }
    }
  }

  boardState() {
    return this.#board;
  }

  toString() {
    return `board dimensions: ${this.#dim} by ${this.#dim}`;
  }
}
