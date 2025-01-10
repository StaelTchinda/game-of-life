import { Game } from "game";

it("should initialise game with 2 dimensions", () => {
  const gameWidth = 10;
  const gameHeight = 10;
  const game = new Game(gameWidth, gameHeight);

  expect(game.width).toBe(gameWidth);
  expect(game.height).toBe(gameHeight);
});

it("shoud initialise game with 1 dimension", () => {
  const gameLength = 5;
  const game = new Game(gameLength);

  expect(game.width).toBe(gameLength);
  expect(game.height).toBe(gameLength);
});

it("should have dead cells at start", () => {
  const gameWidth = 2;
  const gameHeight = 2;
  const game = new Game(gameWidth, gameHeight);

  expect(game.isCellAlive(0, 0)).toBe(false);
  expect(game.isCellAlive(0, 1)).toBe(false);
  expect(game.isCellAlive(1, 0)).toBe(false);
  expect(game.isCellAlive(1, 1)).toBe(false);
});

it("should be able to set a cell to alive", () => {
  const gameWidth = 2;
  const gameHeight = 2;
  const cellX = 0;
  const cellY = 0;
  const game = new Game(gameWidth, gameHeight);

  expect(game.isCellAlive(cellX, cellY)).toBe(false);

  game.toggleCellLiveness(cellX, cellY);

  expect(game.isCellAlive(cellX, cellY)).toBe(true);

  game.toggleCellLiveness(cellX, cellY);

  expect(game.isCellAlive(cellX, cellY)).toBe(false);
});

describe("game logic", () => {
  it("dead cell should stay dead if they are all dead", () => {
    const gameWidth = 2;
    const gameHeight = 2;
    const game = new Game(gameWidth, gameHeight);

    expect(game.isCellAlive(0, 0)).toBe(false);
    expect(game.isCellAlive(0, 1)).toBe(false);
    expect(game.isCellAlive(1, 0)).toBe(false);
    expect(game.isCellAlive(1, 1)).toBe(false);

    game.tick();

    expect(game.isCellAlive(0, 0)).toBe(false);
    expect(game.isCellAlive(0, 1)).toBe(false);
    expect(game.isCellAlive(1, 0)).toBe(false);
    expect(game.isCellAlive(1, 1)).toBe(false);
  });

  it("alive cell should die if it has less than 2 neighbors", () => {
    const gameWidth = 2;
    const gameHeight = 2;
    const cellX = 1;
    const cellY = 1;
    const game = new Game(gameWidth, gameHeight);

    game.toggleCellLiveness(cellX, cellY);

    expect(game.isCellAlive(cellX, cellY)).toBe(true);
    expect(game.isCellAlive(cellX - 1, cellY - 1)).toBe(false);
    expect(game.isCellAlive(cellX - 1, cellY)).toBe(false);

    game.tick();

    expect(game.isCellAlive(cellX, cellY)).toBe(false);
  });

  it("alive cell should live if it has 2 or 3 neighbors", () => {
    const gameWidth = 3;
    const gameHeight = 3;
    const cellX = 1;
    const cellY = 1;
    const game = new Game(gameWidth, gameHeight);

    game.toggleCellLiveness(cellX, cellY);
    game.toggleCellLiveness(cellX - 1, cellY);
    game.toggleCellLiveness(cellX + 1, cellY);

    expect(game.isCellAlive(cellX, cellY)).toBe(true);
    expect(game.isCellAlive(cellX - 1, cellY)).toBe(true);
    expect(game.isCellAlive(cellX + 1, cellY)).toBe(true);

    game.tick();

    expect(game.isCellAlive(cellX, cellY)).toBe(true);
  });

  it("alive cell should die if it has more than 3 neighbors", () => {
    const gameWidth = 3;
    const gameHeight = 3;
    const cellX = 1;
    const cellY = 1;
    const game = new Game(gameWidth, gameHeight);

    game.toggleCellLiveness(cellX, cellY);
    game.toggleCellLiveness(cellX - 1, cellY);
    game.toggleCellLiveness(cellX + 1, cellY);
    game.toggleCellLiveness(cellX, cellY - 1);
    game.toggleCellLiveness(cellX, cellY + 1);

    expect(game.isCellAlive(cellX, cellY)).toBe(true);
    expect(game.isCellAlive(cellX - 1, cellY)).toBe(true);
    expect(game.isCellAlive(cellX + 1, cellY)).toBe(true);
    expect(game.isCellAlive(cellX, cellY - 1)).toBe(true);
    expect(game.isCellAlive(cellX, cellY + 1)).toBe(true);

    game.tick();

    expect(game.isCellAlive(cellX, cellY)).toBe(false);
  });

  it("dead cell should live if it has exactly 3 neighbors", () => {
    const gameWidth = 3;
    const gameHeight = 3;
    const cellX = 1;
    const cellY = 1;
    const game = new Game(gameWidth, gameHeight);

    game.toggleCellLiveness(cellX - 1, cellY);
    game.toggleCellLiveness(cellX + 1, cellY);
    game.toggleCellLiveness(cellX, cellY - 1);

    expect(game.isCellAlive(cellX, cellY)).toBe(false);
    expect(game.isCellAlive(cellX - 1, cellY)).toBe(true);
    expect(game.isCellAlive(cellX + 1, cellY)).toBe(true);
    expect(game.isCellAlive(cellX, cellY - 1)).toBe(true);

    game.tick();

    expect(game.isCellAlive(cellX, cellY)).toBe(true);
  });
});
