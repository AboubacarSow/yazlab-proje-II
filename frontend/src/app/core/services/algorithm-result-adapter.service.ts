import { Injectable } from '@angular/core';
import { TraversalResult } from '../../models/algorith.model';
import { GraphStateService } from './graph.service';
import { Edge } from '../../models/edge.model';

@Injectable({
  providedIn: 'root'
})

export class AlgorithmResultAdapterService {

  constructor(private graphStateService: GraphStateService) { }

  buildTraversalResult(result: TraversalResult) {
    const visitOrder = result.nodes.map(n => n.id);
    const edges = this.graphStateService.getCurrentGraphEdgesSnapshot();

    return {
      visitOrder,
      edgesTraversed: this.buildTraversalEdges(visitOrder, edges),
    };
  }

  
  private buildTraversalEdges(
    visitOrder: number[],
    edges: Edge[]
  ): [number, number][] {

    if (visitOrder.length < 2) return [];

    const visited = new Set<number>();
    const traversed: [number, number][] = [];

    visited.add(visitOrder[0]); // start node

    for (let i = 1; i < visitOrder.length; i++) {
      const current = visitOrder[i];

      const edge = edges.find(e =>
        (visited.has(e.nodeAId) && e.nodeBId === current) ||
        (visited.has(e.nodeBId) && e.nodeAId === current)
      );

      if (edge) {
        traversed.push([edge.nodeAId, edge.nodeBId]);
      }

      visited.add(current);
    }

    return traversed;
  }
}
