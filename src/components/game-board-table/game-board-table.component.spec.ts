import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardTableComponent } from './game-board-table.component';
import { GameBoard } from 'models/game-board';

describe('GameBoardTableComponent', () => {
  let component: GameBoardTableComponent;
  let fixture: ComponentFixture<GameBoardTableComponent>;
  let board: GameBoard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardTableComponent]
    })
    .compileComponents();
    board = {
      height: 3,
      width: 3,
      grid: [[false, false, false], [false, false, false], [false, false, false]]
    }
    
    fixture = TestBed.createComponent(GameBoardTableComponent);
    component = fixture.componentInstance;
    component.board = board;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a number of rows equal to the board's height", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tr');
    expect(rows.length).toBe(board.height);
  });

  it("should have a number of cells equal to the board's width * height", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cells = compiled.querySelectorAll('td');
    expect(cells.length).toBe(board.width * board.height);
  });
});
