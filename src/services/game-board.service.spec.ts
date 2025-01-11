import { TestBed } from "@angular/core/testing";

import { GameBoardService } from "./game-board.service";

describe("BoardBoardService", () => {
  let service: GameBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameBoardService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialise board", () => {
    const boardWidth = 2;
    const boardHeight = 2;
    const board = service.createBoard(boardWidth, boardHeight);

    expect(board.width).toBe(boardWidth);
    expect(board.height).toBe(boardHeight);
    expect(board.grid.length).toBe(boardWidth);
    expect(board.grid[0].length).toBe(boardHeight);
  });

  it("should initialise random board", () => {
    const boardWidth = 2;
    const boardHeight = 2;
    const board = service.createRandomBoard(boardWidth, boardHeight);

    expect(board.width).toBe(boardWidth);
    expect(board.height).toBe(boardHeight);
    expect(board.grid.length).toBe(boardWidth);
    expect(board.grid[0].length).toBe(boardHeight);
  });

  it("should have dead cells at start", () => {
    const boardWidth = 2;
    const boardHeight = 2;
    const board = service.createBoard(boardWidth, boardHeight);

    expect(service.isCellAlive(board, 0, 0)).toBe(false);
    expect(service.isCellAlive(board, 0, 1)).toBe(false);
    expect(service.isCellAlive(board, 1, 0)).toBe(false);
    expect(service.isCellAlive(board, 1, 1)).toBe(false);
  });

  it("should toggle cell liveness", () => {
    const boardWidth = 3;
    const boardHeight = 3;
    const cellX = 1;
    const cellY = 1;
    let board = service.createBoard(boardWidth, boardHeight);

    expect(service.isCellAlive(board, cellX, cellY)).toBe(false);

    board = service.toggleCellLiveness(board, cellX, cellY);

    expect(service.isCellAlive(board, cellX, cellY)).toBe(true);

    board = service.toggleCellLiveness(board, cellX, cellY);

    expect(service.isCellAlive(board, cellX, cellY)).toBe(false);
  });

  describe("board logic", () => {
    it("dead cell should stay dead if they are all dead", () => {
      const boardWidth = 2;
      const boardHeight = 2;
      let board = service.createBoard(boardWidth, boardHeight);

      expect(service.isCellAlive(board, 0, 0)).toBe(false);
      expect(service.isCellAlive(board, 0, 1)).toBe(false);
      expect(service.isCellAlive(board, 1, 0)).toBe(false);
      expect(service.isCellAlive(board, 1, 1)).toBe(false);

      board = service.tick(board);

      expect(service.isCellAlive(board, 0, 0)).toBe(false);
      expect(service.isCellAlive(board, 0, 1)).toBe(false);
      expect(service.isCellAlive(board, 1, 0)).toBe(false);
      expect(service.isCellAlive(board, 1, 1)).toBe(false);
    });

    it("alive cell should die if it has less than 2 neighbors", () => {
      const boardWidth = 3;
      const boardHeight = 3;
      const cellX = 1;
      const cellY = 1;
      let board = service.createBoard(boardWidth, boardHeight);

      service.toggleCellLiveness(board, cellX, cellY);

      expect(service.isCellAlive(board, cellX, cellY)).toBe(true);
      expect(service.isCellAlive(board, cellX - 1, cellY - 1)).toBe(false);
      expect(service.isCellAlive(board, cellX - 1, cellY)).toBe(false);

      board = service.tick(board);

      expect(service.isCellAlive(board, cellX, cellY)).toBe(false);
    });

    it("alive cell should live if it has 2 neighbors", () => {
      const boardWidth = 3;
      const boardHeight = 3;
      const cellX = 1;
      const cellY = 1;
      let board = service.createBoard(boardWidth, boardHeight);

      board = service.toggleCellLiveness(board, cellX, cellY);
      board = service.toggleCellLiveness(board, cellX - 1, cellY - 1);
      board = service.toggleCellLiveness(board, cellX - 1, cellY);
      board = service.tick(board);

      expect(service.isCellAlive(board, cellX, cellY)).toBe(true);
    });

    it("alive cell should live if it has 3 neighbors", () => {
      const boardWidth = 3;
      const boardHeight = 3;
      const cellX = 1;
      const cellY = 1;
      let board = service.createBoard(boardWidth, boardHeight);

      board = service.toggleCellLiveness(board, cellX, cellY);
      board = service.toggleCellLiveness(board, cellX - 1, cellY - 1);
      board = service.toggleCellLiveness(board, cellX - 1, cellY);
      board = service.toggleCellLiveness(board, cellX + 1, cellY);
      board = service.tick(board);

      expect(service.isCellAlive(board, cellX, cellY)).toBe(true);
    });

    it("alive cell should die if it has more than 3 neighbors", () => {
      const boardWidth = 3;
      const boardHeight = 3;
      const cellX = 1;
      const cellY = 1;
      let board = service.createBoard(boardWidth, boardHeight);

      board = service.toggleCellLiveness(board, cellX, cellY);
      board = service.toggleCellLiveness(board, cellX - 1, cellY - 1);
      board = service.toggleCellLiveness(board, cellX - 1, cellY);
      board = service.toggleCellLiveness(board, cellX + 1, cellY);
      board = service.toggleCellLiveness(board, cellX, cellY - 1);
      board = service.tick(board);

      expect(service.isCellAlive(board, cellX, cellY)).toBe(false);
    });

    it("dead cell should live if it has exactly 3 neighbors", () => {
      const boardWidth = 3;
      const boardHeight = 3;
      const cellX = 1;
      const cellY = 1;
      let board = service.createBoard(boardWidth, boardHeight);

      board = service.toggleCellLiveness(board, cellX - 1, cellY - 1);
      board = service.toggleCellLiveness(board, cellX - 1, cellY);
      board = service.toggleCellLiveness(board, cellX + 1, cellY);
      board = service.tick(board);

      expect(service.isCellAlive(board, cellX, cellY)).toBe(true);
    });
  });
});
