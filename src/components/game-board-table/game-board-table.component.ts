import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { GameBoardTableCellComponent } from "components/game-board-table-cell/game-board-table-cell.component";
import { GameBoard } from "models/game-board";

@Component({
  selector: "app-game-board-table",
  standalone: true,
  imports: [GameBoardTableCellComponent, CommonModule],
  templateUrl: "./game-board-table.component.html",
  styleUrl: "./game-board-table.component.scss",
})
export class GameBoardTableComponent {
  @Input() board!: GameBoard;
  @Input() running: boolean = false;
}
