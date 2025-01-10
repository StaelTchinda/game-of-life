import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardTableCellComponent } from './game-board-table-cell.component';

describe('GameBoardTableCellComponent', () => {
  let component: GameBoardTableCellComponent;
  let fixture: ComponentFixture<GameBoardTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardTableCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBoardTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [true, false].forEach((alive) => {
    it('should toggle cell liveness on click when clickable when ', () => {
      component.alive = alive;
      component.clickable = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const cell = compiled.querySelector('.game-board-table-cell') as HTMLElement;

      if (!cell) {
        fail('Cell not found');
        return;
      }

      cell.click();
      fixture.detectChanges();
      expect(component.alive).toBe(!alive);
    })
  });

  [true, false].forEach((alive) => {
    it('should not toggle cell liveness on click when not clickable when ', () => {
      component.alive = alive;
      component.clickable = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const cell = compiled.querySelector('.game-board-table-cell') as HTMLElement;

      if (!cell) {
        fail('Cell not found');
        return;
      }

      cell.click();
      fixture.detectChanges();
      expect(component.alive).toBe(alive);
    })
  });
});
