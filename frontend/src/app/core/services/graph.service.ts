import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Graph, Guid, ImportGraphCommand } from '../../models/graph.model';
import { GraphsService } from '../../services/graphs.service';

@Injectable({ providedIn: 'root' })

export class GraphStateService {

  private currentGraphSubject = new BehaviorSubject<Graph | null>(null);
  currentGraph$ = this.currentGraphSubject.asObservable();

  constructor(private graphsApi: GraphsService) {}

  /** CREATE GRAPH */
  createGraph(title: string) {
    return this.graphsApi.createGraph({ title: title }).pipe(
      tap((res) => {
        const graph: Graph = {
          id: res.id,
          title: res.title,
          description: null,
          order: 0,
          size: 0,
          nodes: [],
          edges: []
        };
        this.setCurrentGraph(graph);
      })
    );
  }
  importGraph(command: ImportGraphCommand) {
  return this.graphsApi.importGraph(command).pipe(
    tap((graph: Graph) => {
        this.setCurrentGraph(graph);
      })
    );
  }
  /** SET CURRENT GRAPH */
  setCurrentGraph(graph: Graph) {
    console.log('✅ setCurrentGraph called:', graph);
    this.currentGraphSubject.next(graph);
    localStorage.setItem('currentGraph', JSON.stringify(graph));
  }

  loadCurrentGraphFromStorage() {
    const raw = localStorage.getItem('currentGraph');
    console.log('📦 localStorage raw:', raw);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        console.log('✅ Parsed from localStorage:', parsed);
        this.currentGraphSubject.next(parsed);
      } catch (err) {
        console.error('❌ Error parsing localStorage graph:', err);
      }
    } else {
      console.log('⚠️ No graph in localStorage');
    }
  }
  /** LOAD GRAPH */
  loadGraph(graphId: Guid) {
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
