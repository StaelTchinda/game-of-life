import { Component } from '@angular/core';
import { GameBoardTableComponent } from 'components/game-board-table/game-board-table.component';
import { GameBoard } from 'models/game-board';
import { GameBoardService } from 'services/game-board.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameBoardTableComponent],
  providers: [GameBoardService],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  board: GameBoard;
  running: boolean;

  constructor(private gameBoardService: GameBoardService) {
    this.board = gameBoardService.createBoard(10, 10);
    this.running = true;
    console.log("Game board created", this.board);
  }
}
