import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardTableComponent } from "./game-board-table.component";
import { GameBoard } from "models/game-board";

describe("GameBoardTableComponent", () => {
  let component: GameBoardTableComponent;
  let fixture: ComponentFixture<GameBoardTableComponent>;
  let board: GameBoard;
  let onBoardCellToggleSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardTableComponent],
    }).compileComponents();
    board = {
      height: 3,
      width: 3,
      grid: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    };

    fixture = TestBed.createComponent(GameBoardTableComponent);
    component = fixture.componentInstance;
    component.board = board;
    onBoardCellToggleSpy = spyOn(component.onBoardCellToggle, "emit");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a number of rows equal to the board's height", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll("tr");
    expect(rows.length).toBe(board.height);
  });

  it("should have a number of cells equal to the board's width * height", () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cells = compiled.querySelectorAll("td");
    expect(cells.length).toBe(board.width * board.height);
  });

  [true, false].forEach((alive) => {
    it("should toggle cell liveness on click when game not running", () => {
      const cellx = 0;
      const cellY = 0;

      component.board.grid[cellx][cellY] = alive;
      component.running = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const cell = compiled.querySelector(
        "tr:nth-child(" + (cellY + 1) + ") td:nth-child(" + (cellx + 1) + ")"
      ) as HTMLElement;

      if (!cell) {
        fail("Cell not found");
        return;
      }

      cell.click();
      fixture.detectChanges();
      expect(onBoardCellToggleSpy).toHaveBeenCalledOnceWith({
        i: cellx,
        j: cellY,
      });
    });
  });

  [true, false].forEach((alive) => {
    it("should not toggle cell liveness on click when game running ", () => {
      const cellx = 0;
      const cellY = 0;

      component.board.grid[cellx][cellY] = alive;
      component.running = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const cell = compiled.querySelector(
        "tr:nth-child(" + (cellY + 1) + ") td:nth-child(" + (cellx + 1) + ")"
      ) as HTMLElement;

      if (!cell) {
        fail("Cell not found");
        return;
      }

      cell.click();
      fixture.detectChanges();
      expect(onBoardCellToggleSpy).not.toHaveBeenCalled();
    });
  });
});
