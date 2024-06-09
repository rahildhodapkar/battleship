export class Ship {
  #length;
  // Number of times ship has been hit
  #numHits;
  #sunk;

  constructor(length) {
    this.#length = length;
    this.#numHits = 0;
    this.#sunk = false;
  }

  hit() {
    // If ship is already sunk, cannot get hit more
    if (this.#sunk) {
      return;
    }

    this.#numHits++;
  }

  getHits() {
    return this.#numHits;
  }

  isSunk() {
    if (!this.#sunk && this.#length === this.#numHits) {
      this.#sunk = true;
    }

    return this.#sunk;
  }

  toString() {
    return `length: ${this.#length}, number of hits: ${
      this.#numHits
    }, is sunk: ${this.#sunk}`;
  }
}
