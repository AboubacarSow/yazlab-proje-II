import { Injectable } from '@angular/core';
import { EdgeApiService } from '../../services/edges.service';
import { GraphStateService } from './graph.service';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { Graph } from '../../models/graph.model';
import { AddEdgeDto, Edge } from '../../models/edge.model';

@Injectable({
  providedIn: 'root'
})
export class EdgesService {

  constructor(private edgesApi: EdgeApiService,
    private graphState:GraphStateService) { }

  private withCurrentGraph<T>(
      action: (graph: Graph) => Observable<T>
    ): Observable<T> {
      return this.graphState.currentGraph$.pipe(
        take(1),
        filter((g): g is Graph => !!g && !!g.id),
        switchMap(action)
      );
    }

  addEdge(sourceId:number, targetId:number):Observable<Edge>{

      return this.withCurrentGraph(graph => {
        const payload: AddEdgeDto = {
          graphId:graph.id,
          nodeAId:sourceId,
          nodeBId:targetId
        };

        return this.edgesApi.addEdgeToGraph(payload).pipe(
          tap(res => {
            const edge = res.edge
            if (!edge) return;
            const updatedGraph: Graph = {
              ...graph,
              edges: [...(graph.edges ?? []), edge]
            };
            this.graphState.setCurrentGraph(updatedGraph);
          }),
            map(res => res.edge as Edge )
          );
        });
  }

  deleteEdge(sourceId:number,targetId:number) : Observable<Graph>
  {
    return this.withCurrentGraph(graph => {

        return this.edgesApi.deleteEdgeFromGraphByNodes(graph.id,sourceId,targetId).pipe(
          tap(res => {
            const new_graph = res.graph
            if (!new_graph) return;
            this.graphState.setCurrentGraph(new_graph);
          }),
            map(res => res.graph )
          );
        });
  }
}
