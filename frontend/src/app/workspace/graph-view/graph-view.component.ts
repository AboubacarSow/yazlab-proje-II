import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomControlsComponent } from '../shared/zoom-controls/zoom-controls.component';

@Component({
  selector: 'app-graph-view',
  imports: [CommonModule, ZoomControlsComponent],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent {
  zoomLevel = 100;

  onZoomChange(level: number) {
    this.zoomLevel = level;
  }
}
