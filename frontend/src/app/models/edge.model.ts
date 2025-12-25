export interface Edge {
  id: number;
  weight: number;
  nodeAId: number;
  nodeBId: number;
}
export interface EdgeImportDto {
  nodeTagA: string;
  nodeTagB: string;
}
export interface AddEdgeDto {
  graphId: import('./graph.model').Guid;
  nodeAId: number;
  nodeBId: number;
}
