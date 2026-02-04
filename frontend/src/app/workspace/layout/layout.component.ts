import { HeaderComponent } from './../header/header.component';
import { GraphStateService } from '../../core/services/graph.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  graphCreated = false;

  constructor(private graphStateService: GraphStateService){

  }
  ngOnInit(): void {
    this.graphStateService.currentGraph$.subscribe(graph=>{
      if(!graph){
        this.graphCreated = false;
       // this.currentGraphId = undefined
        return;
      }
      this.graphCreated=true;
      //this.currentGraphId=graph.id;
    })
  }

  onResetRequested() {
    this.graphStateService.clearCurrentGraph();
    this.graphCreated = false;
  }

}
