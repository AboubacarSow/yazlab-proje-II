import { Injectable } from '@angular/core';
import { GraphStateService } from './graph.service';
import { NodeApiService as NodesApiService } from '../../services/nodes.service';
import { AddNodeDto, EditNodeDto, Node } from '../../models/node.model';
import { Graph } from '../../models/graph.model';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';

/**
 * NodeStateService - Handles node operations and state management
 * Works with GraphStateService to keep graph state in sync
 */
@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(
    private graphState: GraphStateService,
    private nodesApi: NodesApiService
  ) { }

  /**
   * Add node to current graph
   */
  addNode(
  tag: string,
  activity: number,
  interaction: number
): Observable<Node> {

  const payloadBase = {
    tag,
    activity: Number(activity),
    interaction: Number(interaction)
  };

  return this.withCurrentGraph(graph => {
    const payload: AddNodeDto = {
      graphId: graph.id,
      ...payloadBase
    };

    return this.nodesApi.addNodeToGraph(payload).pipe(
      tap(res => {
        const node = res.node
        if (!node) return;
        const updatedGraph: Graph = {
          ...graph,
          nodes: [...(graph.nodes ?? []), node]
        };
        this.graphState.setCurrentGraph(updatedGraph);
      }),
        map(res => res.node as Node )
      );
    });
  }

  editNode(
      nodeId: number,
      tag: string,
      activity: number,
      interaction: number
      ): Observable<Node> {
      const payload: EditNodeDto = {
        nodeId,
        tag,
        activity: Number(activity),
        interaction: Number(interaction)
      };

      return this.withCurrentGraph(graph =>
        this.nodesApi.editNodeInGraph(graph.id, payload).pipe(
          tap(res => {
            const node =(res as any)?.node as Node
            console.log(node)
            if (!node) return;
            const updatedGraph: Graph = {
              ...graph,
              nodes: (graph.nodes ?? []).map(n =>
                n.id === node.id ? node : n
              )
            };
            if(!updatedGraph){
              console.log('updated graph:',updatedGraph)
            }
            console.log("new graph",updatedGraph);
            this.graphState.setCurrentGraph(updatedGraph);
          }),
          map(res =>(res.node as Node))
        )
      );
    }

  /**
   * Delete node from current graph
   */
  deleteNode(nodeId: number): Observable<void> {
    return this.withCurrentGraph(graph =>
      this.nodesApi.deleteNodeFromGraph(graph.id, nodeId).pipe(
        tap(res => {
          const updatedGraph = res.result
          console.log('new graph:',updatedGraph)
          this.graphState.setCurrentGraph(updatedGraph);
        }),
        map(() => void 0)
      )
    );
  }

  private withCurrentGraph<T>(
    action: (graph: Graph) => Observable<T>
  ): Observable<T> {
    return this.graphState.currentGraph$.pipe(
      take(1),
      filter((g): g is Graph => !!g && !!g.id),
      switchMap(action)
    );
  }

}
