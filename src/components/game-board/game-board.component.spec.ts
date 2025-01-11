import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardComponent } from "./game-board.component";

describe("GameBoardComponent", () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Logic", () => {
    it("should create a game board on initialisation", () => {
      expect(component.board).toBeTruthy();
    });

    it("should not start the game on initialisation", () => {
      expect(component.running).toBeFalse();
    });

    it("should start the game when running changes to true", () => {
      component.onRunningChange(true);
      expect(component.running).toBeTrue();
    });

    it("should stop the game when running changes to false", () => {
      component.onRunningChange(false);
      expect(component.running).toBeFalse();
    });

    it("should update the game board when the game is running", () => {
      component.onRunningChange(true);
      const initialBoard = component.board;
      setTimeout(() => {
        expect(component.board).not.toEqual(initialBoard);
      }, component.speed * 1.5);
    });

    it("should randomise the game board", () => {
      const initialBoard = component.board;
      component.onBoardRandomise();
      expect(component.board).not.toEqual(initialBoard);
    });

    it("should update the game board width", () => {
      const initialBoard = component.board;
      component.onBoardWidthChange(20);
      expect(component.board).not.toEqual(initialBoard);
      expect(component.board.width).toBe(20);
    });

    it("should update the game board height", () => {
      const initialBoard = component.board;
      component.onBoardHeightChange(20);
      expect(component.board).not.toEqual(initialBoard);
      expect(component.board.height).toBe(20);
    });
  });
});
