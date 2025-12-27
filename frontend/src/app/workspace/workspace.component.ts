import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { SchemaCreationComponent } from './schema-creation/schema-creation.component';
import { DataViewComponent } from './data-view/data-view.component';
import { GraphStateService } from '../core/services/graph.service';
import { Guid } from '../models/graph.model';


@Component({
  selector: 'app-workspace',
  imports: [CommonModule, HeaderComponent, SidebarComponent, GraphViewComponent, SchemaCreationComponent,
    DataViewComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit  {
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
  onGraphCreated(graphId: Guid) {
    this.graphCreated = true;
    this.currentGraphId = graphId;
  }



  onTabChange(tab: 'graph' | 'data') {
    this.activeTab = tab;
  }
}
