import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgorithmDefinition } from '../../core/utils/algorithm-definition';

@Component({
  selector: 'app-algorithm-control-panel',
  imports: [],
  templateUrl: './algorithm-control-panel.component.html',
  styleUrl: './algorithm-control-panel.component.css'
})
export class AlgorithmControlPanelComponent {

  @Input() algorithm!: AlgorithmDefinition;
  @Output() run = new EventEmitter<any>();

  startNode?: string;
  endNode?: string;
  executionTime?:string


  canRun(): boolean {
    if (this.algorithm.requiresStartNode && !this.startNode) return false;
    if (this.algorithm.requiresEndNode && !this.endNode) return false;
    return true;
  }

  runAlgorithm() {
    this.run.emit({
      algorithm: this.algorithm.key,
      startNode: this.startNode,
      endNode: this.endNode,
    });
  }
}
