export interface Graph {
  id: number;
  tag: string;
  order: number;
  size: number;
}

export interface Node {
  id: number;
  graphId: number;
  tag: string;
  activity: number;
  interaction: number;
}

export interface Edge {
  id: number;
  weight: number;
  nodeAId: number;
  nodeBId: number;
}

export interface CreateGraphDto {
  tag: string;
}

export interface AddNodeDto {
  graphId: number;
  tag: string;
  activity: number;
  interaction: number;
}

export interface AddEdgeDto {
  graphId: number;
  nodeAId: number;
  nodeBId: number;
}

export interface EditNodeDto {
  nodeId: number;
  tag: string;
  activity: number;
  interaction: number;
}
