import { Graph, Guid } from "./graph.model";

export interface Edge {
  weight: number;
  nodeAId: number;
  nodeBId: number;
}
export interface EdgeImportDto {
  nodeTagA: string;
  nodeTagB: string;
}
export interface AddEdgeDto {
  graphId: Guid;
  nodeAId: number;
  nodeBId: number;
}
export interface ExportEdgeDto{
  nodeA: number
  nodeB: number,
  weight: number
}

export interface EdgeSnapshot {
  nodeAId: number;
  nodeBId: number;
  weight?: number;
}
export interface AddEdgeResponse{
  isSuccess: boolean,
  edge:Edge
}
export interface DeleteEdgeResponse{
  graph:Graph
}

