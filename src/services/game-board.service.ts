import { Injectable } from "@angular/core";
import { GameBoard } from "models/game-board";

@Injectable({
  providedIn: "root",
})
export class GameBoardService {
  constructor() {}

  createBoard(width: number, height: number): GameBoard {
    return {
      width,
      height,
      grid: Array.from({ length: height }, () =>
        Array.from({ length: width }, () => false)
      ),
    } as GameBoard;
  }

  createRandomBoard(width: number, height: number): GameBoard {
    return {
      width,
      height,
      grid: Array.from({ length: height }, () =>
        Array.from({ length: width }, () => Math.random() > 0.5)
      ),
    } as GameBoard;
  }

  isCellAlive(board: GameBoard, x: number, y: number): boolean {
    return board.grid[x][y];
  }

  toggleCellLiveness(board: GameBoard, x: number, y: number): GameBoard {
    board.grid[x][y] = !board.grid[x][y];
    return board;
  }

  private countNeighbors(
    board: GameBoard,
    x: number,
    y: number,
    livenessState: boolean
  ): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        const xIndex = x + i;
        const yIndex = y + j;

        if (
          xIndex >= 0 &&
          xIndex < board.width &&
          yIndex >= 0 &&
          yIndex < board.height
        ) {
          if (this.isCellAlive(board, xIndex, yIndex) === livenessState) {
            count++;
          }
        }
      }
    }
    return count;
  }

  private countAliveNeighbors(board: GameBoard, x: number, y: number): number {
    return this.countNeighbors(board, x, y, true);
  }

  tick(board: GameBoard): GameBoard {
    const newGrid = Array.from({ length: board.width }, () =>
      Array.from({ length: board.height }, () => false)
    );

    for (let i = 0; i < board.grid.length; i++) {
      for (let j = 0; j < board.grid[i].length; j++) {
        const aliveNeighbors = this.countAliveNeighbors(board, i, j);

        if (this.isCellAlive(board, i, j) && aliveNeighbors < 2) {
          newGrid[i][j] = false;
        } else if (this.isCellAlive(board, i, j) && aliveNeighbors in [2, 3]) {
          newGrid[i][j] = true;
        } else if (this.isCellAlive(board, i, j) && aliveNeighbors > 3) {
          newGrid[i][j] = false;
        } else if (!this.isCellAlive(board, i, j) && aliveNeighbors === 3) {
          newGrid[i][j] = true;
        } else {
          newGrid[i][j] = board.grid[i][j];
        }
      }
    }
    return { ...board, grid: newGrid };
  }

  tickWithTracks(board: GameBoard): [GameBoard, [number, number][]] {
    const newGrid = Array.from({ length: board.width }, () =>
      Array.from({ length: board.height }, () => false)
    );
    const tracks: [number, number][] = [];

    for (let i = 0; i < board.grid.length; i++) {
      for (let j = 0; j < board.grid[i].length; j++) {
        const aliveNeighbors = this.countAliveNeighbors(board, i, j);

        if (this.isCellAlive(board, i, j) && aliveNeighbors < 2) {
          newGrid[i][j] = false;
        } else if (this.isCellAlive(board, i, j) && aliveNeighbors in [2, 3]) {
          newGrid[i][j] = true;
        } else if (this.isCellAlive(board, i, j) && aliveNeighbors > 3) {
          newGrid[i][j] = false;
        } else if (!this.isCellAlive(board, i, j) && aliveNeighbors === 3) {
          newGrid[i][j] = true;
        } else {
          newGrid[i][j] = board.grid[i][j];
        }

        if (newGrid[i][j] !== board.grid[i][j]) {
          tracks.push([i, j]);
        }
      }
    }
    return [{ ...board, grid: newGrid }, tracks];
  }
}
