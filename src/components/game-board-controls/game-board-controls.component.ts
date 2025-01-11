import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-game-board-controls",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./game-board-controls.component.html",
  styleUrl: "./game-board-controls.component.scss",
})
export class GameBoardControlsComponent {
  heightFormControl = new FormControl(10);
  widthFormControl = new FormControl(10);

  private _running: boolean = false;
  @Input()
  set running(value: boolean) {
    console.log("running set to ", value);
    this._running = value || false;
    console.log("running is now ", this._running);
    if (this._running) {
      this.heightFormControl.disable({ emitEvent: false });
      this.widthFormControl.disable({ emitEvent: false });
      console.log("Game is running");
    } else {
      this.heightFormControl.enable({ emitEvent: false });
      this.widthFormControl.enable({ emitEvent: false });
      console.log("Game is paused");
    }
  }
  get running(): boolean {
    return this._running;
  }
  @Output() onRunningChange = new EventEmitter<boolean>();

  @Input("width")
  set width(value: number) {
    this.widthFormControl.setValue(value);
  }
  get width(): number {
    return this.widthFormControl.value as number;
  }
  @Output() onWidthChange = new EventEmitter<number>();

  @Input("height")
  set height(value: number) {
    this.heightFormControl.setValue(value);
  }
  get height(): number {
    return this.heightFormControl.value as number;
  }
  @Output() onHeightChange = new EventEmitter<number>();

  @Output() onRandomise = new EventEmitter<void>();

  constructor() {
    this.widthFormControl.valueChanges.subscribe((value) => {
      this.onWidthChange.emit(value as number);
    });
    this.heightFormControl.valueChanges.subscribe((value) => {
      this.onHeightChange.emit(value as number);
    });
  }

  onStartPauseClick() {
    console.log("start/pause button clicked");
    this.onRunningChange.emit(!this.running);
  }
  onRandomiseClick() {
    console.log("randomise button clicked");
    this.onRandomise.emit();
  }
}
