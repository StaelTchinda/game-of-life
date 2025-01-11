import { Component } from "@angular/core";
import {
  GameBoardControlsComponent,
  MAX_SPEED,
} from "components/game-board-controls/game-board-controls.component";
import { GameBoardTableComponent } from "components/game-board-table/game-board-table.component";
import { GameBoard } from "models/game-board";
import { GameBoardService } from "services/game-board.service";

@Component({
  selector: "app-game-board",
  standalone: true,
  imports: [GameBoardTableComponent, GameBoardControlsComponent],
  providers: [GameBoardService],
  templateUrl: "./game-board.component.html",
  styleUrl: "./game-board.component.scss",
})
export class GameBoardComponent {
  private boardUpdateInterval: ReturnType<typeof setInterval> | undefined =
    undefined;

  speed: number = MAX_SPEED / 2;
  board: GameBoard;
  running: boolean = false;

  constructor(private gameBoardService: GameBoardService) {
    this.board = gameBoardService.createBoard(10, 10);
    console.log("Game board created", this.board);
  }

  onRunningChange(newRunning: boolean) {
    console.log("Game running changed", newRunning);
    if (newRunning) {
      this.startGame();
    } else {
      this.stopGame();
    }
    this.running = newRunning;
  }

  onBoardRandomise() {
    console.log("Game board randomised");
    this.board = this.gameBoardService.createRandomBoard(
      this.board.width,
      this.board.height
    );
  }

  onBoardClear() {
    console.log("Game board cleared");
    this.board = this.gameBoardService.createBoard(
      this.board.width,
      this.board.height
    );
  }

  onBoardSpeedChange(newSpeed: number) {
    console.log("Game speed changed", newSpeed);
    this.speed = newSpeed;
    if (this.running) {
      this.stopGame();
      this.startGame();
    }
  }

  onBoardCellToggle({ i, j }: { i: number; j: number }) {
    console.log("Game board cell toggled", i, j);
    this.board = this.gameBoardService.toggleCellLiveness(this.board, i, j);
  }

  onBoardWidthChange(newWidth: number) {
    console.log("Game board width changed", newWidth);
    this.onBoardSizeChange(newWidth, this.board.height);
  }

  onBoardHeightChange(newHeight: number) {
    console.log("Game board height changed", newHeight);
    this.onBoardSizeChange(this.board.width, newHeight);
  }

  private onBoardSizeChange(newWidth: number, newHeight: number) {
    console.log("Game board size changed", newWidth, newHeight);
    this.board = this.gameBoardService.createBoard(newWidth, newHeight);
  }

  private startGame() {
    const interval = MAX_SPEED ** 2 / this.speed ** 2;
    console.log("Game started at interval", interval, "wit speed", this.speed);
    this.boardUpdateInterval = setInterval(() => {
        console.log("Game tick");
        const newBoard = this.gameBoardService.tick(this.board);
        console.log("Game board updated", this.board, newBoard);
        this.board = newBoard;
    }, interval);
  }

  private stopGame() {
    console.log("Game paused");
    if (this.boardUpdateInterval) {
      clearInterval(this.boardUpdateInterval);
    }
  }
}
