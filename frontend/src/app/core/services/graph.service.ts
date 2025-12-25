import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { EditGraphCommand,
  EditGraphResponse,
  Graph,
  GraphSnapshot,
  GraphSummary,
  Guid,
  ImportGraphCommand,
  ImportGraphResponse } from '../../models/graph.model';
import { GraphsService } from '../../services/graphs.service';

@Injectable({ providedIn: 'root' })

export class GraphStateService {

  private currentGraphSubject = new BehaviorSubject<Graph | null>(null);
  currentGraph$ = this.currentGraphSubject.asObservable();

  constructor(private graphsApi: GraphsService) {}

  /** CREATE GRAPH */
  createGraph(title: string) {
    return this.graphsApi.createGraph({ title: title });
  }
  importGraph(command: ImportGraphCommand) {
  return this.graphsApi.importGraph(command).pipe(
    tap((response: ImportGraphResponse) => {
        this.setCurrentGraph(response.graph);
      })
    );
  }
  importSnapshot(snapshot: GraphSnapshot){
    return this.graphsApi.importSnapshot(snapshot).pipe(
      tap((graph : Graph)=>{
        this.setCurrentGraph(graph);
      })
    )
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
  loadGraph(graphId: Guid) {
    return this.graphsApi.getGraph(graphId);
  }

  /** GET CURRENT */
  getCurrentGraph$(): Observable<Graph | null> {
    return this.currentGraph$;
  }
   getCurrentGraphTitle$(): Observable<string | undefined> {
    return this.currentGraph$.pipe(
      map(graph => graph?.title)
    );
  }
  clear() {
    this.currentGraphSubject.next(null);
  }
   clearCurrentGraph() {
    this.currentGraphSubject.next(null);
    localStorage.removeItem('currentGraph');
  }

  getGraphSummary(): Observable<GraphSummary> {
    return this.currentGraph$.pipe(
      take(1), // On prend juste l'état à l'instant T (snapshot réactif)
      switchMap(graph => {
        if (!graph || !graph.id) {
          return throwError(() => new Error('No graph selected'));
        }
        // Appel API
        return this.graphsApi.getGraphSummary(graph.id).pipe(
          map((res: any) => res.graphSummary)
        );
      })
    );
  }

 updateGraphMetaData(command: EditGraphCommand): Observable<EditGraphResponse> {
    return this.currentGraph$.pipe(
      take(1),
      switchMap(currentGraph => {
        if (!currentGraph) {
          return throwError(() => new Error('No active graph selected'));
        }
        if (!currentGraph.id) {
          return throwError(() => new Error('Graph Id is undefined'));
        }

        return this.graphsApi.editGraph(currentGraph.id, command).pipe(
          tap((response: EditGraphResponse) => {
            const updatedGraph: Graph = {
              ...currentGraph,
              title: response.title,
              description: command.description
            };

            this.setCurrentGraph(updatedGraph);
          })
        );
      })
    );
  }

}
