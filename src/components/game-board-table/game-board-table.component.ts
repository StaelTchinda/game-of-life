import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { Input } from "@angular/core";
import { GameBoard } from "models/game-board";

@Component({
  selector: "app-game-board-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./game-board-table.component.html",
  styleUrl: "./game-board-table.component.scss",
})
export class GameBoardTableComponent {
  @Input() board!: GameBoard;
  @Output()
  onBoardCellToggle = new EventEmitter<{
    i: number;
    j: number;
  }>();
  @Input() running!: boolean;

  toggleLiveness(i: number, j: number): void {
    if (!this.running) {
      this.onBoardCellToggle.emit({ i, j });
    }
  }
}
