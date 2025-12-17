import { Injectable } from '@angular/core';

export interface NodeColorAssignment {
  nodeId: string;
  colorIndex: number;
}

export interface NodeColor {
  nodeId: string;
  colorIndex: number;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class GraphColorService {
  // UI palette; extend or swap as needed.
  private readonly palette = [
    '#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4',
    '#8b5cf6', '#ef4444', '#10b981', '#0ea5e9', '#f97316'
  ];

  colorForIndex(index: number): string {
    if (index < 0 || Number.isNaN(index)) return '#9ca3af';
    return this.palette[index % this.palette.length];
  }

  mapAssignments(assignments: NodeColorAssignment[]): NodeColor[] {
    return assignments.map(a => ({
      nodeId: a.nodeId,
      colorIndex: a.colorIndex,
      color: this.colorForIndex(a.colorIndex)
    }));
  }
}
