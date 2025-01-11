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
  height = new FormControl(1);
  width = new FormControl(1);

  @Input() running: boolean = false;
  @Output() onRunningChange = new EventEmitter<boolean>();

  onStartPauseClick() {
    console.log("start/pause button clicked");
    this.onRunningChange.emit(!this.running);
  }
}
