import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardControlsComponent } from "./game-board-controls.component";

describe("GameBoardControlsComponent", () => {
  let component: GameBoardControlsComponent;
  let fixture: ComponentFixture<GameBoardControlsComponent>;
  let onRunningChangeSpy: jasmine.Spy;
  let onRandomiseSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardControlsComponent);
    component = fixture.componentInstance;
    onRunningChangeSpy = spyOn(component.onRunningChange, "emit");
    onRandomiseSpy = spyOn(component.onRandomise, "emit");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("UI", () => {
    it("should have a button to start/pause the game", () => {
      const button = fixture.nativeElement.querySelector(
        'button[action="start-pause-game"]'
      );
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Start");
    });

    it("should have an input field to change the game's width", () => {
      const input = fixture.nativeElement.querySelector('input[name="width"]');
      expect(input).toBeTruthy();
      expect(input.type).toBe("number");
      expect(input.name).toBe("width");
    });

    it("should have an input field to change the game's height", () => {
      const input = fixture.nativeElement.querySelector('input[name="height"]');
      expect(input).toBeTruthy();
      expect(input.type).toBe("number");
      expect(input.name).toBe("height");
    });
  });

  describe("Component", () => {
    it("should have a method to start/pause the game", () => {
      component.onRunningChange.emit(true);
      expect(onRunningChangeSpy).toHaveBeenCalled();
    });

    it("should have a method to randomise the game board", () => {
      component.onRandomise.emit();
      expect(onRandomiseSpy).toBeTruthy;
    });
  });
});
