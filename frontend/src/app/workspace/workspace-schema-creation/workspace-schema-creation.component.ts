import { Component } from '@angular/core';
import { SchemaCreationComponent } from "../schema-creation/schema-creation.component";

@Component({
  selector: 'app-workspace-schema-creation',
  imports: [SchemaCreationComponent],
  templateUrl: './workspace-schema-creation.component.html',
  styleUrl: './workspace-schema-creation.component.css'
})
export class WorkspaceSchemaCreationComponent {
  
  onGraphCreated($event: string) {
  throw new Error('Method not implemented.');
  }

}
