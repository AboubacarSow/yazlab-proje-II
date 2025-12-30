import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgorithmsService } from '../../services/algorithms.service';
import { TopFiveNodeInDegreeResult } from '../../models/algorith.model';
import { GraphStateService } from '../../core/services/graph.service';
import { take } from 'rxjs';
import { ToastService } from '../../core/utils/toast-service.service';
import { Graph } from '../../models/graph.model';
import { PrettyJsonPipe } from "../../pipes/pretty-json.pipe";
import { PrettyCsvPipe } from "../../pipes/pretty-csv.pipe";

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, FormsModule, PrettyJsonPipe, PrettyCsvPipe],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent {
  dataFormat:'top-five'| 'json' | 'csv' | 'table'  = 'json';


  topFiveNodeInDegree? : TopFiveNodeInDegreeResult
  graph?: Graph
  graphCsv:any;
  nodesCsv:any
  edgesCsv:any
  constructor(private algorithmService: AlgorithmsService,
            private graphStateService: GraphStateService,
            private toastService : ToastService){
            this.getcurrentGraph()
            }

  switchFormat(format: 'json' | 'csv' | 'table' | 'top-five') {
    this.dataFormat = format;
    if(this.dataFormat==='json' || this.dataFormat==='table' || this.dataFormat==='csv'){
      this.getcurrentGraph()
    }
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
  getcurrentGraph(){
    this.graphStateService.currentGraph$.pipe((take(1)))
      .subscribe(
      graph=>{
        this.graph=graph!
        this.graphCsv = [{
          id: graph?.id,
          title: graph?.title,
          description: graph?.description,
          nodeCount: graph?.nodes.length,
          edgeCount: graph?.edges.length
        }];
        this.nodesCsv= this.graph?.nodes.map(n => ({
            id: n.id,
            tag: n.tag,
            activity: n.activity,
            interaction: n.interaction,
          }));

        this.edgesCsv=this.graph?.edges.map(e => ({
          from: e.nodeAId,
          to: e.nodeBId,
          weight:e.weight
        }));

      }
    )
  }

}
