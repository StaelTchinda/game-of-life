export interface GameTable {
  width: number;
  height: number;
//   grid: boolean[][];

  isCellAlive(x: number, y: number): boolean;
  toggleCellLiveness(x: number, y: number): void;
  tick(): void;
}

export class Game implements GameTable {
  width: number;
  height: number;
  private grid: boolean[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(false));
  }

    isCellAlive(x: number, y: number): boolean {
        return this.grid[x][y];
    }

  toggleCellLiveness(x: number, y: number): void {
    this.grid[x][y] = !this.grid[x][y];
  }

  tick(): void {
    const newGrid = new Array(this.height)
      .fill(null)
      .map(() => new Array(this.width).fill(false));
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const aliveNeighborsCount = this.getAliveNeighborsCount(i, j);
        if (this.isCellAlive(i, j) && aliveNeighborsCount < 2) {
            newGrid[i][j] = false;
        } else if (this.isCellAlive(i, j) && aliveNeighborsCount > 3) {
            newGrid[i][j] = false;
        } else if (this.isCellDead(i, j) && aliveNeighborsCount === 3) {
            newGrid[i][j] = true;
        }
        else {
          newGrid[i][j] = this.grid[i][j];
        }
      }
    }
    this.grid = newGrid;
  }

  private getNeighborsCount(x: number, y: number, alive: boolean): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const x1 = x + i;
        const y1 = y + j;
        if (x1 >= 0 && x1 < this.width && y1 >= 0 && y1 < this.height) {
          if (this.grid[x1][y1] === alive) {
            count++;
          }
        }
      }
    }
    return count;
  }

  private getAliveNeighborsCount(x: number, y: number): number {
    return this.getNeighborsCount(x, y, true);
  }

  private isCellDead(x: number, y: number): boolean {
    return !this.isCellAlive(x, y);
  }

}
