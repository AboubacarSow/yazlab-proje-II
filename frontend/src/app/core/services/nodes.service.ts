import { Injectable } from '@angular/core';
import { GraphStateService } from './graph.service';
import { NodesService as NodesApiService } from '../../services/nodes.service';
import { AddNodeDto, EditNodeDto, GraphNode } from '../../models/node.model';
import { Graph, Guid } from '../../models/graph.model';
import { tap } from 'rxjs';

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
  addNode(tag: string, activity: number, interaction: number) {
    const current = this.graphState.getCurrentGraph();
    
    if (!current || !current.id) {
      throw new Error('No active graph selected');
    }

    const payload: AddNodeDto = {
      graphId: current.id as Guid,
      tag,
      activity: Number(activity),
      interaction: Number(interaction)
    };

    return this.nodesApi.addNodeToGraph(payload).pipe(
      tap((res) => {
        const node = (res as any)?.nodeDto as GraphNode ?? (res as any)?.node as GraphNode;
        if (node) {
          const updatedGraph: Graph = {
            ...current,
            nodes: [...(current.nodes ?? []), node]
          };
          this.graphState.setCurrentGraph(updatedGraph);
        }
      })
    );
  }

  /**
   * Edit node in current graph
   */
  editNode(nodeId: number, tag: string, activity: number, interaction: number) {
    const current = this.graphState.getCurrentGraph();
    
    if (!current || !current.id) {
      throw new Error('No active graph selected');
    }

    const payload: EditNodeDto = {
      nodeId,
      tag,
      activity: Number(activity),
      interaction: Number(interaction)
    };

    return this.nodesApi.editNodeInGraph(current.id as Guid, payload).pipe(
      tap((res) => {
        const node = (res as any)?.nodeDto as GraphNode ?? (res as any)?.node as GraphNode;
        if (node && current) {
          const updatedNodes = (current.nodes ?? []).map(n => n.id === node.id ? node : n);
          const updatedGraph: Graph = {
            ...current,
            nodes: updatedNodes
          };
          this.graphState.setCurrentGraph(updatedGraph);
        }
      })
    );
  }

  /**
   * Delete node from current graph
   */
  deleteNode(nodeId: number) {
    const current = this.graphState.getCurrentGraph();
    
    if (!current || !current.id) {
      throw new Error('No active graph selected');
    }

    return this.nodesApi.deleteNodeFromGraph(current.id as Guid, nodeId).pipe(
      tap(() => {
        if (current) {
          const updatedNodes = (current.nodes ?? []).filter(n => n.id !== nodeId);
          const updatedGraph: Graph = {
            ...current,
            nodes: updatedNodes
          };
          this.graphState.setCurrentGraph(updatedGraph);
        }
      })
    );
  }

  /**
   * Get all nodes from current graph
   */
  getCurrentNodes(): GraphNode[] {
    return this.graphState.getCurrentGraph()?.nodes ?? [];
  }
}
