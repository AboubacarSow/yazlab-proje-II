import { Edge, EdgeImportDto } from "./edge.model";
import { NodeImportDto } from "./node.model";


export type Guid = string;

export interface Graph {
  id: Guid;
  title: string,
  description?: string | null,
  order: number | 0;
  size: number | 0;
  nodes:Node[];
  edges:Edge[];
}
export interface ImportGraph {
  title: string;
  description?: string;
  nodes: NodeImportDto[];
  edges: EdgeImportDto[];
};

export interface GraphDto {
  id: Guid;
  title: string;
  description?: string;
  order: number;
  size: number;
  nodes: NodeImportDto[];
  edges: EdgeImportDto[];
}
export interface CreateGraphDto {
  title: string;
}

export interface ImportGraphCommand {
  title: string;
  description?: string;
  nodes: NodeImportDto[];
  edges: EdgeImportDto[];
}

export interface ImportGraphRequest {
  importGraph: ImportGraphCommand;
}

export interface ImportGraphResponse {
  graph: Graph;
}






