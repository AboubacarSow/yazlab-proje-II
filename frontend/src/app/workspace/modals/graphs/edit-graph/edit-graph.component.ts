import { Component, Inject } from '@angular/core';
import { GraphStateService } from '../../../../core/services/graph.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { EditGraphCommand, EditGraphResponse } from '../../../../models/graph.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-graph',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-graph.component.html',
  styleUrl: './edit-graph.component.css'
})
export class EditGraphComponent {

  formEdit : FormGroup;
  loading : boolean = false;
  error ?: string;
  constructor(private graphStateService : GraphStateService,
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef<EditGraphResponse>,
    @Inject(DIALOG_DATA) public data: EditGraphCommand,
  ){
    this.formEdit = this.formBuilder.group({
      title: [data.title, Validators.required],
      description: [data.description]
    });
  }

  save() {
      if (this.formEdit.invalid) {
        this.formEdit.markAllAsTouched();
        return;
      }

      this.loading = true;
      this.error = undefined;

      const command: EditGraphCommand = {
        id: this.data.id,
        title: this.formEdit.value.title,
        description: this.formEdit.value.description
      };

      this.graphStateService.updateGraphMetaData(command)
        .subscribe({
          next: response => {
            this.dialogRef.close(response);
          },
          error: () => {
            this.error = 'Unable to update graph metadata';
            this.loading = false;
          }
        });
    }

  cancel(){
    this.dialogRef.close()
  }

}
