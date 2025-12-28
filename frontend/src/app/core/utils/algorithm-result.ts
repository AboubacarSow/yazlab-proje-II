export interface BFSResponse {
  startNodeId: number;
  visitOrder: number[];        // BFS traversal order
  levels: Record<number, number>; // nodeId → depth
  edgesTraversed: [number, number][];
}
