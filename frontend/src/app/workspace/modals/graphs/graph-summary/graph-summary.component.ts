import { Component, Inject} from '@angular/core';
import { GraphSummary } from '../../../../models/graph.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-graph-summary',
  imports: [DecimalPipe, NgIf],
  templateUrl: './graph-summary.component.html',
  styleUrl: './graph-summary.component.css'
})
export class GraphSummaryComponent {

   constructor(
    @Inject(DIALOG_DATA) public summary: GraphSummary,
    private dialogRef: DialogRef<void>
  ) {}

  close() {
    this.dialogRef.close();
  }

}
