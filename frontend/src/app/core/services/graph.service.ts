import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, switchMap, take, tap, throwError } from 'rxjs';
import { EditGraphCommand,
  EditGraphResponse,
  Graph,
  GraphSnapshot,
  GraphSummary,
  Guid,
  ImportGraphCommand,
  ImportGraphResponse } from '../../models/graph.model';
import { GraphsService } from '../../services/graphs.service';
import { Node } from '../../models/node.model'
import { Edge } from '../../models/edge.model';
import { mapToGraphVisualization } from '../utils/mapperHelper';

@Injectable({ providedIn: 'root' })

export class GraphStateService {

  private currentGraphSubject = new BehaviorSubject<Graph | null>(null);
  currentGraph$ = this.currentGraphSubject.asObservable();

  //Visualisation Settings
  visualizationGraph$ = combineLatest([
    this.getCurrentGraphNodes(),
    this.getCurrentGraphEdges()
  ]).pipe(
    map(([nodes, edges]) => {
      if (!nodes || !edges) {
        return { nodes: [], links: [] };
      }

      return mapToGraphVisualization(nodes, edges);
    }),
    shareReplay(1)
  );

  graphNodes$ = this.visualizationGraph$.pipe(map(g => g.nodes));
  graphLinks$ = this.visualizationGraph$.pipe(map(g => g.links));

  // End of Visualization settings
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
    console.log('✅ setCurrentGraph called:', graph);
    this.currentGraphSubject.next(graph);
    localStorage.setItem('currentGraph', JSON.stringify(graph));
  }
  getNodeById$(id: number): Observable<Node | undefined> {
    return this.getCurrentGraphNodes().pipe(
      take(1),
      map(nodes => nodes.find(n => n.id === id))
    );
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
  getCurrentGraph$(): Observable<Graph | null> {
    return this.currentGraph$;
  }
  getCurrentGraphNodes(): Observable<Node[] | []> {
    return this.currentGraph$.pipe(
      map(g => g?.nodes ?? [])
    );
  }

  getCurrentGraphEdges(): Observable<Edge[]| []>{
    return this.currentGraph$.pipe(
      map(g => g?.edges ?? [])
    )
  }

  getCurrentGraphEdgesSnapshot(): Edge[] {
    return this.currentGraphSubject.value?.edges ?? [];
  }

  getCurrentGraphNodesSnapshot(): Node[] {
    return this.currentGraphSubject.value?.nodes ?? [];
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

  resetGraph(graphId:Guid){
    this.graphsApi.clearGraph(graphId).subscribe(graph=>{
      this.setCurrentGraph(graph);
    })
  }

}
