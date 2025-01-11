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
  _height = new FormControl(10);
  _width = new FormControl(10);

  @Input() running: boolean = false;
  @Output() onRunningChange = new EventEmitter<boolean>();

  @Input("width")
  set width(value: number) {
    this._width.setValue(value);
  }
  get width(): number {
    return this._width.value as number;
  }
  @Output() onWidthChange = new EventEmitter<number>();

  @Input("height")
  set height(value: number) {
    this._height.setValue(value);
  }
  get height(): number {
    return this._height.value as number;
  }
  @Output() onHeightChange = new EventEmitter<number>();

  @Output() onRandomise = new EventEmitter<void>();

  constructor() {
    this._width.valueChanges.subscribe((value) => {
      this.onWidthChange.emit(value as number);
    });
    this._height.valueChanges.subscribe((value) => {
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
