import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardControlsComponent } from "./game-board-controls.component";

describe("GameBoardControlsComponent", () => {
  let component: GameBoardControlsComponent;
  let fixture: ComponentFixture<GameBoardControlsComponent>;

  let onRunningChangeSpy: jasmine.Spy;
  let onClearSpy: jasmine.Spy;
  let onRandomiseSpy: jasmine.Spy;
  let onWidthChangeSpy: jasmine.Spy;
  let onHeightChangeSpy: jasmine.Spy;
  let onSpeedChangeSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardControlsComponent);
    component = fixture.componentInstance;
    onRunningChangeSpy = spyOn(component.onRunningChange, "emit");
    onRandomiseSpy = spyOn(component.onRandomise, "emit");
    onWidthChangeSpy = spyOn(component.onWidthChange, "emit");
    onHeightChangeSpy = spyOn(component.onHeightChange, "emit");
    onSpeedChangeSpy = spyOn(component.onSpeedChange, "emit");
    onClearSpy = spyOn(component.onClear, "emit");
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
    });

    it("should have a button to randomise the game board", () => {
      const button = fixture.nativeElement.querySelector(
        'button[action="randomise-board"]'
      );
      expect(button).toBeTruthy();
    });

    it("should have a button to clear the game", () => {
      const button = fixture.nativeElement.querySelector(
        'button[action="clear-board"]'
      );
      expect(button).toBeTruthy();
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

    it("should have an input field to change the game's speed", () => {
      const input = fixture.nativeElement.querySelector('input[name="speed"]');
      expect(input).toBeTruthy();
      expect(input.type).toBe("range");
      expect(input.name).toBe("speed");
    });

    it("should have size inputs disabled when the game is running", () => {
      component.running = true;
      fixture.detectChanges();
      const widthInput = fixture.nativeElement.querySelector(
        'input[name="width"]'
      );
      const heightInput = fixture.nativeElement.querySelector(
        'input[name="height"]'
      );
      expect(widthInput.disabled).toEqual(true);
      expect(heightInput.disabled).toEqual(true);
    });

    it("should have size inputs enabled when the game is not running", () => {
      component.running = false;
      fixture.detectChanges();
      const widthInput = fixture.nativeElement.querySelector(
        'input[name="width"]'
      );
      const heightInput = fixture.nativeElement.querySelector(
        'input[name="height"]'
      );
      expect(widthInput.disabled).toEqual(false);
      expect(heightInput.disabled).toEqual(false);
    });

    it("should have a speed input field always enabled", () => {
      component.running = true;
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input[name="speed"]');

      expect(input.disabled).toEqual(false);

      component.running = false;
      fixture.detectChanges();

      expect(input.disabled).toEqual(false);
    });

    it("should have buttons clear and randomise disabled when the game is running", () => {
      component.running = true;
      fixture.detectChanges();
      const clearButton = fixture.nativeElement.querySelector(
        'button[action="clear-board"]'
      );
      const randomiseButton = fixture.nativeElement.querySelector(
        'button[action="randomise-board"]'
      );
      expect(clearButton.disabled).toEqual(true);
      expect(randomiseButton.disabled).toEqual(true);
    });

    it("should have buttons clear and randomise enabled when the game is not running", () => {
      component.running = false;
      fixture.detectChanges();
      const clearButton = fixture.nativeElement.querySelector(
        'button[action="clear-board"]'
      );
      const randomiseButton = fixture.nativeElement.querySelector(
        'button[action="randomise-board"]'
      );
      expect(clearButton.disabled).toEqual(false);
      expect(randomiseButton.disabled).toEqual(false);
    });

    it("should have a button to start the game when the game is not running", () => {
      component.running = false;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        'button[action="start-pause-game"]'
      );
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Start");
    });

    it("should have a button to pause the game when the game is running", () => {
      component.running = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector(
        'button[action="start-pause-game"]'
      );
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Pause");
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

    it("should have a width input", () => {
      component.width = 20;
      expect(component.width).toBe(20);
    });

    it("should have a height input", () => {
      component.height = 20;
      expect(component.height).toBe(20);
    });

    it("should have a speed input", () => {
      component.speed = 20;
      expect(component.speed).toBe(20);
    });

    it("should emit an event when the width changes", () => {
      component.onWidthChange.emit(30);
      expect(onWidthChangeSpy).toHaveBeenCalled();
    });

    it("should emit an event when the height changes", () => {
      component.onHeightChange.emit(30);
      expect(onHeightChangeSpy).toHaveBeenCalled();
    });

    it("should emit an event when the speed changes", () => {
      component.onSpeedChange.emit(30);
      expect(onSpeedChangeSpy).toHaveBeenCalled();
    });
  });

  describe("Logic", () => {
    it("change of width input field should emit an event", () => {
      const input = fixture.nativeElement.querySelector('input[name="width"]');
      input.value = 30;
      input.dispatchEvent(new Event("input"));
      expect(onWidthChangeSpy).toHaveBeenCalledWith(30);
    });

    it("change of height input field should emit an event", () => {
      const input = fixture.nativeElement.querySelector('input[name="height"]');
      input.value = 30;
      input.dispatchEvent(new Event("input"));
      expect(onHeightChangeSpy).toHaveBeenCalledWith(30);
    });

    it("change of speed input field should emit an event", () => {
      const input = fixture.nativeElement.querySelector('input[name="speed"]');
      input.value = 30;
      input.dispatchEvent(new Event("input"));
      expect(onSpeedChangeSpy).toHaveBeenCalledWith(30);
    });
    it("should start the game when the start/pause button is clicked", () => {
      const button = fixture.nativeElement.querySelector(
        'button[action="start-pause-game"]'
      );
      button.click();
      expect(onRunningChangeSpy).toHaveBeenCalled();
    });

    it("should randomise the game board when the randomise button is clicked", () => {
      const button = fixture.nativeElement.querySelector(
        'button[action="randomise-board"]'
      );
      button.click();
      expect(onRandomiseSpy).toHaveBeenCalled();
    });

    it("should clear the game when the clear button is clicked", () => {
      const button = fixture.nativeElement.querySelector(
        'button[action="clear-board"]'
      );
      button.click();
      expect(onClearSpy).toHaveBeenCalled();
    });
  });
});
