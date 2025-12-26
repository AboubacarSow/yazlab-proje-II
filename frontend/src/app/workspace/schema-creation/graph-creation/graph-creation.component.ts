import { Graph } from './../../../models/graph.model';
import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GraphStateService } from '../../../core/services/graph.service';



@Component({
  selector: 'app-graph-creation-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './graph-creation.component.html',
  styleUrls: ['./graph-creation.component.css']
})
export class GraphCreationComponent {

  graphCreationForm : FormGroup;
  serverError: string | null = null;
  submitted = false;
  loading = false;
  constructor(private formBuilder: FormBuilder,
    private dialogRef : DialogRef<Graph>,
    private graphService : GraphStateService
  ){
    this.graphCreationForm= this.formBuilder.group({
      title: ['', Validators.required]
    })
  }
  create() {
    this.submitted= true;
     this.serverError = null;
    if (this.graphCreationForm.invalid) return;

    this.loading = true;
    const title = this.graphCreationForm.value.title;

    this.submitted=false;
    this.graphService.createGraph(title).subscribe({
      next: (res) => {
        const graph : Graph = {
          id: res.id,
          title: res.title,
          description: null,
          order: 0,
          size: 0,
          nodes:[],
          edges:[]
        };
        this.graphCreationForm.reset();
        this.dialogRef.close(graph);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 500) {
          this.serverError = 'An internal server error occurred. Please try again.';
        } else if (err.error?.message) {
          this.serverError = err.error.message;
        } else {
          this.serverError = 'Unexpected error occurred.';
        }
      }
    });
  }
  cancel(){
    this.dialogRef.close();
  }


  }





