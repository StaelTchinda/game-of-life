import { Component } from "@angular/core";
import { GameBoardControlsComponent } from "components/game-board-controls/game-board-controls.component";
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
  board: GameBoard;
  running: boolean = false;

  constructor(private gameBoardService: GameBoardService) {
    this.board = gameBoardService.createBoard(10, 10);
    this.running = true;
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

  private startGame() {
    console.log("Game started");
    this.boardUpdateInterval = setInterval(() => {
      console.log("Game tick");
      const newBoard = this.gameBoardService.tick(this.board);
      console.log("Game board updated", this.board, newBoard);
      this.board = newBoard;
    }, this.speed);
  }

  private stopGame() {
    console.log("Game paused");
    if (this.boardUpdateInterval) {
      clearInterval(this.boardUpdateInterval);
    }
  }
}
