import { Edge, EdgeImportDto,EdgeSnapshot,ExportEdgeDto } from "./edge.model";
import { ExportNodeDto, NodeImportDto, NodeSnapshot, Node } from "./node.model";


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
export interface GraphSummary {
  id: Guid;
  nodeCount: number;
  edgeCount: number;
  title: string;
  description: string;
  isConnected: boolean;
  isWeighted: boolean;
  isDirected: boolean;
  density: number;
  averageDegree: number;
}

export interface GetGraphSummaryResponse {
  graphSummary: GraphSummary;
}
export interface EditGraphResponse{
  title: string;
  description: string
}
export interface EditGraphCommand{
  id : Guid;
  title:string;
  description: string
}
export interface EditGraphRequest{
  graph : EditGraphCommand
}

export interface ExportGraphDto{
  id: Guid,
  title:string,
  description: string,
  isConnected:boolean,
  isWeighted:boolean,
  order:number,
  size: number,
  nodes:ExportNodeDto[],
  edges:ExportEdgeDto[]
}
export interface ExportGraphResponse{
  graph: ExportGraphDto
}

export interface GraphSnapshot {
  id:Guid,
  title: string;
  description?: string;
  nodes: NodeSnapshot[];
  edges: EdgeSnapshot[];
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  color?: string;
  domain: Node
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  id?: string;
  source: string | GraphNode;
  target: string | GraphNode;
  weight:number;
  domain: Edge
}





