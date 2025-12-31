import { Graph, Guid } from "./graph.model";

export interface NodeImportDto {
  tag: string;
  activity: number;
  interaction: number;
}
export interface Node {
  id: number;
  graphId: Guid;
  tag: string;
  activity: number;
  interaction: number;
}
export interface AddNodeDto extends NodeImportDto {
  graphId: Guid;
}

export interface EditNodeDto {
  nodeId: number;
  tag: string;
  activity: number;
  interaction: number;
}
export interface ExportNodeDto{
  id:number,
  graphId:Guid,
  tag : string,
  activity: number,
  interaction: number
}
export interface ExportEdge{
  nodeA: number
  nodeB: number,
  weight:number
}


export interface NodeSnapshot {
  id: number;
  tag: string;
  activity: number;
  interaction: number;
}

export interface DeleteNodeRespose{
  result: Graph
}



