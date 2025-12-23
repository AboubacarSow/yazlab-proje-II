import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GraphCreationComponent } from './graph-creation/graph-creation.component';
import { Dialog } from '@angular/cdk/dialog';
import { Graph } from '../../models/graph.model';
import { GraphService } from '../../core/services/graph.service';


@Component({
  selector: 'app-schema-creation',
  standalone: true,
  templateUrl: './schema-creation.component.html',
  styleUrl: './schema-creation.component.css'
})
export class SchemaCreationComponent {
  private dialog = inject(Dialog);
  @Output() graphCreated = new EventEmitter<number>();

  constructor( private graphService : GraphService) {}

  openCreateModal() {
    const dialogRef = this.dialog.open(GraphCreationComponent, {disableClose:true, 
    panelClass: 'graph-creation-panel'})
    
    dialogRef.closed.subscribe(graph => {
      if (!graph || typeof graph !== 'object') return;
      this.graphService.setCurrentGraph((graph as Graph));
      this.graphCreated.emit((graph as Graph).id);
    });
  };

  importGraph() {
    // plus tard
  }
}

