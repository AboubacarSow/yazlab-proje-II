import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GraphViewComponent } from '../graph-view/graph-view.component';
import { DataViewComponent } from '../data-view/data-view.component';
import { SchemaCreationComponent } from '../schema-creation/schema-creation.component';
import { GraphService } from '../../core/services/graph.service';

@Component({
  selector: 'app-workspace',
  imports: [CommonModule,HeaderComponent,SidebarComponent,GraphViewComponent,SchemaCreationComponent,
      DataViewComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit  {
  activeTab: 'graph' | 'data' = 'graph';

  graphCreated = false;
  currentGraphId?: number;
  constructor(private graphService: GraphService){
    console.log(`Workspace initiated. GraphCreate value: ${this.graphCreated}`);
  }
  ngOnInit(): void {
    this.graphService.loadCurrentGraphFromStorage();

    const graph = this.graphService.getCurrentGraph();
    if (graph) {
      this.graphCreated = true;
      this.currentGraphId = graph.id;
    }
  }
  onGraphCreated(graphId: number) {
    this.graphCreated = true;
    this.currentGraphId = graphId;
  }



  onTabChange(tab: 'graph' | 'data') {
    this.activeTab = tab;
  }
}
