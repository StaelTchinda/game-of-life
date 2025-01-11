import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardControlsComponent } from "./game-board-controls.component";

describe("GameBoardControlsComponent", () => {
  let component: GameBoardControlsComponent;
  let fixture: ComponentFixture<GameBoardControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
