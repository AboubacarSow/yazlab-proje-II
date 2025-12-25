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
    if (this.graphCreationForm.invalid) return;

    this.loading = true;
    const title = this.graphCreationForm.value.title;
    this.graphCreationForm.reset();
    this.submitted=false;
    this.graphService.createGraph(title).subscribe({
      next: (res) => {
        // Fetch freshly created graph so nodes/edges are available in state
        this.graphService.loadGraph(res.id).subscribe({
          next: (loaded) => {
            const loadedGraph = loaded.graph ?? loaded;
            // Ensure id and title are preserved from creation response
            const graph: Graph = {
              id: res.id || loadedGraph.id,
              title: res.title || loadedGraph.title,
              description: loadedGraph.description ?? null,
              order: loadedGraph.order ?? 0,
              size: loadedGraph.size ?? 0,
              nodes: loadedGraph.nodes ?? [],
              edges: loadedGraph.edges ?? []
            };
            console.log('✅ Graph loaded successfully:', graph);
            this.graphService.setCurrentGraph(graph);
            this.dialogRef.close(graph);
          },
          error: () => {
            // Fallback to minimal graph if load fails
            const graph : Graph = {
              id: res.id,
              title: res.title,
              description: null,
              order: 0,
              size: 0,
              nodes:[],
              edges:[]
            };
            console.log('⚠️ Using fallback graph:', graph);
            this.graphService.setCurrentGraph(graph);
            this.dialogRef.close(graph);
          }
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  cancel(){
    this.dialogRef.close();
  }


  }





