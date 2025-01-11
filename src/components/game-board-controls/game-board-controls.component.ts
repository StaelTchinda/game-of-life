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
  @Input() running: boolean = false;
  @Output() onRunningChange = new EventEmitter<boolean>();
  height = new FormControl(10);
  width = new FormControl(10);

  onStartPauseClick() {
    console.log("start/pause button clicked");
    this.onRunningChange.emit(!this.running);
  }
}
