import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { DataViewComponent } from './data-view/data-view.component';
import { GraphStateService } from '../core/services/graph.service';
import { Guid } from '../models/graph.model';
import { Subject } from 'rxjs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlgorithmResultComponent } from "./algorithm-result/algorithm-result.component";



@Component({
  selector: 'app-workspace',
  imports: [CommonModule, GraphViewComponent,
    DataViewComponent, SidebarComponent, AlgorithmResultComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit, OnDestroy  {


  activeTab: 'graph' | 'data'| 'algorithmResult' = 'graph';
  graphCreated = false;
  currentGraphId?: Guid;

  private destroy$ = new Subject<void>()
  
  constructor(private graphStateService: GraphStateService){
    console.log(`Workspace initiated. GraphCreate value: ${this.graphCreated}`);
  }

  ngOnInit(): void {
    this.graphStateService.loadCurrentGraphFromStorage();

    this.graphStateService.currentGraph$.subscribe(graph=>{
      if(!graph){
        this.graphCreated = false;
        this.currentGraphId = undefined
        return;
      }
      this.graphCreated=true;
      this.currentGraphId=graph.id;
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onGraphCreated(graphId: Guid) {
    console.log('✅ Graph created with ID:', graphId);
    this.graphCreated = true;
    this.currentGraphId = graphId;
  }

  onResetRequested() {
    this.graphStateService.clearCurrentGraph();
    this.graphCreated = false;
    this.activeTab = 'graph';
  }



  onTabChange(tab: 'graph' | 'data' | 'algorithmResult') {
    this.activeTab = tab;
  }
}
