import { Injectable } from '@angular/core';
import { GraphStateService } from './graph.service';
import { EdgesService as EdgesApiService } from '../../services/edges.service';
import { AddEdgeDto, Edge } from '../../models/edge.model';
import { Graph, Guid } from '../../models/graph.model';
import { tap } from 'rxjs';

/**
 * EdgeStateService - Handles edge operations and state management
 * Works with GraphStateService to keep graph state in sync
 */
@Injectable({
  providedIn: 'root'
})
export class EdgesService {

  constructor(
    private graphState: GraphStateService,
    private edgesApi: EdgesApiService
  ) { }

  /**
   * Add edge to current graph
   */
  addEdge(nodeAId: number, nodeBId: number) {
    const current = this.graphState.getCurrentGraph();
    
    if (!current || !current.id) {
      throw new Error('No active graph selected');
    }

    if (nodeAId === nodeBId) {
      throw new Error('Cannot create edge between same node');
    }

    const payload: AddEdgeDto = {
      graphId: current.id as Guid,
      nodeAId: Number(nodeAId),
      nodeBId: Number(nodeBId)
    };

    return this.edgesApi.addEdgeToGraph(payload).pipe(
      tap((res) => {
        const edge = (res as any)?.Edge as Edge ?? (res as any)?.edge as Edge;
        if (edge) {
          const updatedGraph: Graph = {
            ...current,
            edges: [...(current.edges ?? []), edge]
          };
          this.graphState.setCurrentGraph(updatedGraph);
        }
      })
    );
  }

  /**
   * Delete edge from current graph
   */
  deleteEdge(edgeId: number) {
    const current = this.graphState.getCurrentGraph();
    
    if (!current || !current.id) {
      throw new Error('No active graph selected');
    }

    const edge = (current.edges ?? []).find(e => e.id === edgeId);
    if (!edge) {
      throw new Error('Edge not found in current graph');
    }

    return this.edgesApi
      .deleteEdgeFromGraphByNodes(current.id as Guid, edge.nodeAId, edge.nodeBId)
      .pipe(
        tap(() => {
          const updatedEdges = (current.edges ?? []).filter(e => e.id !== edgeId);
          const updatedGraph: Graph = { ...current, edges: updatedEdges };
          this.graphState.setCurrentGraph(updatedGraph);
        })
      );
  }

  /**
   * Get all edges from current graph
   */
  getCurrentEdges(): Edge[] {
    return this.graphState.getCurrentGraph()?.edges ?? [];
  }
}
