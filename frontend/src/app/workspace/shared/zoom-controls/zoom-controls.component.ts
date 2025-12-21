import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zoom-controls',
  imports: [CommonModule],
  templateUrl: './zoom-controls.component.html',
  styleUrl: './zoom-controls.component.css'
})
export class ZoomControlsComponent {
  @Input() zoomLevel: number = 100;
  @Output() zoomChange = new EventEmitter<number>();

  zoomIn() {
    if (this.zoomLevel < 200) {
      this.zoomLevel += 10;
      this.zoomChange.emit(this.zoomLevel);
    }
  }

  zoomOut() {
    if (this.zoomLevel > 50) {
      this.zoomLevel -= 10;
      this.zoomChange.emit(this.zoomLevel);
    }
  }
}
