import { Ship } from "../classes/ship";

describe("Ship", () => {
  test("Ship class should be defined", () => {
    expect(Ship).toBeDefined();
    expect(typeof Ship === "class");
  });
});