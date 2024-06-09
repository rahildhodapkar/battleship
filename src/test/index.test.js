import { Ship } from "../classes/ship";
import { Gameboard } from "../classes/gameboard";
import { Player } from "../classes/player";

describe("Ship", () => {
  let ship;
  beforeAll(() => {
    ship = new Ship(3);
  });

  test("Ship class should be defined", () => {
    expect(Ship).toBeDefined();
    expect(typeof Ship === "class");
  });

  test("Ship class should be properly instantiated with a length of 3", () => {
    expect(ship.toString()).toBe(
      "length: 3, number of hits: 0, is sunk: false"
    );
  });

  test("Ship class should accurately return number of hits", () => {
    expect(ship.getHits()).toBe(0);
  });

  test("Ship class should increment Ship.numHits by one each time Ship.hit() is called", () => {
    ship.hit();
    expect(ship.getHits()).toBe(1);
  });

  test("Ship class should accurately return whether it is sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("Ship class should accurately return whether it is sunk after being hit enough times to be sunk", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
    // Make sure that hitting a ship past its length still results in it being sunk
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe("Gameboard", () => {
  let gameboard;
  beforeAll(() => {
    gameboard = new Gameboard(3);
  });

  test("Gameboard class should be defined", () => {
    expect(Gameboard).toBeDefined();
    expect(typeof Gameboard === "class");
  });

  test("Gameboard class should be properly instantiated with a board dimension of 3x3", () => {
    expect(gameboard.toString()).toBe("board dimensions: 3 by 3");
  });

  test("Gameboard class should be able to place ships along the y axis", () => {
    let targetBoardState = [
      [1, 0, 0],
      [1, 0, 0],
      [0, 0, 0],
    ];
    gameboard.placeShip(0, 0, "y", 2);
    expect(gameboard.boardState()).toStrictEqual(targetBoardState);
  });

  test("Gameboard class should be able to place ships along the x axis", () => {
    let targetBoardState = [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ];
    gameboard.placeShip(2, 0, "x", 3);
    expect(gameboard.boardState()).toStrictEqual(targetBoardState);
  });

  test("Gameboard class should be able to reject placing ships on top of existing ships", () => {
    let targetBoardState = [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ];
    gameboard.placeShip(1, 1, "y", 2);
    expect(gameboard.boardState()).toStrictEqual(targetBoardState);
  });

  test("Gameboard class should be able to handle direct hits", () => {
    let targetBoardState = [
      [1, 0, 0],
      [1, 0, 0],
      [1, "x", 1],
    ];
    gameboard.receiveAttack(2, 1);
    expect(gameboard.boardState()).toStrictEqual(targetBoardState);
  });

  test("Gameboard class should be able to handle misses", () => {
    let targetBoardState = [
      [1, 0, 0],
      [1, "o", 0],
      [1, "x", 1],
    ];
    gameboard.receiveAttack(1, 1);
    expect(gameboard.boardState()).toStrictEqual(targetBoardState);
  });
});

describe("Player", () => {
  test("Player class should be defined", () => {
    expect(Player).toBeDefined();
    expect(typeof Player === "class");
  });
});
