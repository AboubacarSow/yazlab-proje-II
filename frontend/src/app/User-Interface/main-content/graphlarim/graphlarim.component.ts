import { ToastService } from './../../../core/utils/toast-service.service';
import { Graph } from './../../../models/graph.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { GraphsService } from '../../../services/graphs.service';
import { AuthService } from '../../../core/services/auth.service';
import { take } from 'rxjs';
import { GraphItem, Guid } from '../../../models/graph.model';
import { GraphStateService } from '../../../core/services/graph.service';



@Component({
  selector: 'app-graphlarim',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './graphlarim.component.html',
  styleUrl: './graphlarim.component.css'
})
export class GraphlarimComponent implements OnInit{


  graphs: GraphItem[] = [
  ];
  constructor(private graphService: GraphsService,
    private graphStateService: GraphStateService,
     private authService: AuthService, private router: Router,private toastService: ToastService){}

  ngOnInit(): void {

   this.authService.currentUser$.pipe(take(1)).subscribe(user=>{
    this.graphService.getAllGraphsByUser(user.sub).subscribe({
      next: response =>{
        if(!response){
          this.graphs =[]
          return;
        }
        else{
          this.graphs = response.graphs
        }

      }
    })
   }
   )
  }
  loadGraph(graphId: Guid) {
    this.graphService.getGraph(graphId).subscribe({
      next:response=>{
        if(!response){
          console.warn('graph not found')
          return;
        }
        this.graphStateService.setCurrentGraph(response.graph)
        this.router.navigate(['/workspace'])

      },
      error : err=>{
        console.log(err)
        this.toastService.error("Something went wrong")
      }
    })
  }
  deleteGraph(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
