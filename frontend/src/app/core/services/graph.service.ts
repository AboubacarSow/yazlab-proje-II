import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Graph } from '../../models/graph.model';
import { GraphsService } from '../../services/graphs.service';

@Injectable({ providedIn: 'root' })

export class GraphService {

  private currentGraphSubject = new BehaviorSubject<Graph | null>(null);
  currentGraph$ = this.currentGraphSubject.asObservable();

  constructor(private graphsApi: GraphsService) {}

  /** CREATE GRAPH */
  createGraph(tag: string) {
    return this.graphsApi.createGraph({ tag });
  }

  /** SET CURRENT GRAPH */
  setCurrentGraph(graph: Graph) {
    this.currentGraphSubject.next(graph);
    localStorage.setItem('currentGraph', JSON.stringify(graph));
    
  }
   loadCurrentGraphFromStorage() {
    const raw = localStorage.getItem('currentGraph');
    if (raw) {
      this.currentGraphSubject.next(JSON.parse(raw));
    }
  }
  /** LOAD GRAPH */
  loadGraph(graphId: number) {
    return this.graphsApi.getGraph(graphId);
  }

  /** GET CURRENT */
  getCurrentGraph(): Graph | null {
    return this.currentGraphSubject.value;
  }

  clear() {
    this.currentGraphSubject.next(null);
  }
   clearCurrentGraph() {
    this.currentGraphSubject.next(null);
    localStorage.removeItem('currentGraph');
  }
}
