import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-board-table-cell',
  standalone: true,
  imports: [],
  templateUrl: './game-board-table-cell.component.html',
  styleUrl: './game-board-table-cell.component.scss'
})
export class GameBoardTableCellComponent {
  @Input() alive!: boolean;
  @Input() clickable!: boolean;

  toggleLiveness(): void {
    if (this.clickable) {
      this.alive = !this.alive;
    }
  }
}
