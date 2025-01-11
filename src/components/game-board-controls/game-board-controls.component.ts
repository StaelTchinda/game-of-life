import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

export const MAX_SPEED = 1000;

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
  speedFormControl = new FormControl(MAX_SPEED / 2);

  maxSpeed = MAX_SPEED;

  private _running: boolean = false;
  @Input()
  set running(value: boolean) {
    this._running = value || false;
    if (this._running) {
      this.disableSizeInputs();
    } else {
      this.enableSizeInputs();
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

  @Input("speed")
  set speed(value: number) {
    this.speedFormControl.setValue(value);
  }
  get speed(): number {
    return this.speedFormControl.value as number;
  }
  @Output() onSpeedChange = new EventEmitter<number>();

  @Output() onRandomise = new EventEmitter<void>();
  @Output() onClear = new EventEmitter<void>();

  constructor() {
    this.widthFormControl.valueChanges.subscribe((value) => {
      this.onWidthChange.emit(value as number);
    });
    this.heightFormControl.valueChanges.subscribe((value) => {
      this.onHeightChange.emit(value as number);
    });
    this.speedFormControl.valueChanges.subscribe((value) => {
      this.onSpeedChange.emit(value as number);
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
  onClearClick() {
    console.log("clear button clicked");
    this.onClear.emit();
  }

  private enableSizeInputs() {
    this.enableDisableSizeInputs(true);
  }

  private disableSizeInputs() {
    this.enableDisableSizeInputs(false);
  }

  private enableDisableSizeInputs(enabled: boolean) {
    if (enabled) {
      this.heightFormControl.enable({ emitEvent: false });
      this.widthFormControl.enable({ emitEvent: false });
    } else {
      this.heightFormControl.disable({ emitEvent: false });
      this.widthFormControl.disable({ emitEvent: false });
    }
  }
}
