import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgorithmsService } from '../../services/algorithms.service';
import { TopFiveNodeInDegreeResult } from '../../models/algorith.model';
import { GraphStateService } from '../../core/services/graph.service';
import { take } from 'rxjs';
import { ToastService } from '../../core/utils/toast-service.service';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {
  dataFormat:'top-five'| 'json' | 'csv' | 'table'  = 'json';

  sampleData = {
    nodes: [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' }
    ],
    edges: [
      { source: 1, target: 2 },
      { source: 2, target: 3 }
    ]
  };
  topFiveNodeInDegree? : TopFiveNodeInDegreeResult
  csvData = '';
  constructor(private algorithmService: AlgorithmsService,
            private graphStateService: GraphStateService,
            private toastService : ToastService){}

  switchFormat(format: 'json' | 'csv' | 'table' | 'top-five') {
    this.dataFormat = format;
    if(this.dataFormat==='top-five'){
      this.getTopFiveNode()
      return;
    }
  }

  getTopFiveNode(){
    this.graphStateService.currentGraph$
            .pipe(take(1))
            .subscribe(graph => {
              if (!graph) return;
              this.algorithmService
                .getTopFiveNodeInDegree(graph.id)
                .subscribe(res => {
                  this.topFiveNodeInDegree = res.result
                  console.log('result of top five node:',res.result.nodes)
                  this.toastService.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
                });
              });
  }


}
