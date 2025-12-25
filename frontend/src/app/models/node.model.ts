import { Guid } from "./graph.model";

export interface NodeImportDto {
  tag: string;
  activity: number;
  interaction: number;
}
export interface GraphNode {
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
