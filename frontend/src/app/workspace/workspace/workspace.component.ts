import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GraphViewComponent } from '../graph-view/graph-view.component';
import { DataViewComponent } from '../data-view/data-view.component';
import { SchemaCreationComponent } from '../schema-creation/schema-creation.component';
import { GraphStateService } from '../../core/services/graph.service';
import { Guid } from '../../models/graph.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  imports: [CommonModule, HeaderComponent, SidebarComponent, GraphViewComponent, SchemaCreationComponent,
    DataViewComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit, OnDestroy  {
  activeTab: 'graph' | 'data' = 'graph';

  graphCreated = false;
  currentGraphId?: Guid;
  constructor(private graphStateService: GraphStateService){
    console.log(`Workspace initiated. GraphCreate value: ${this.graphCreated}`);
  }

  ngOnInit(): void {
    this.graphStateService.loadCurrentGraphFromStorage();

    this.graphStateService.currentGraph$.subscribe(graph=>{
      if(!graph){
        this.graphCreated=false;
        this.currentGraphId=undefined
        return;
      }
      this.graphCreated=true;
      this.currentGraphId=graph.id;
    })

  }

  ngOnDestroy(): void {
    this.graphSub?.unsubscribe();
  }

  onGraphCreated(graphId: Guid) {
    console.log('✅ Graph created with ID:', graphId);
    this.graphCreated = true;
    this.currentGraphId = graphId;
  }

  onResetRequested() {
    this.graphService.clearCurrentGraph();
    this.graphCreated = false;
    this.activeTab = 'graph';
  }



  onTabChange(tab: 'graph' | 'data') {
    this.activeTab = tab;
  }
}
