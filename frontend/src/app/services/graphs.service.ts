import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Graph, 
  Node, 
  Edge, 
  CreateGraphDto, 
  AddNodeDto, 
  AddEdgeDto, 
  EditNodeDto 
} from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  private readonly BASE_URL = environment.apiUrl + 'graphs';
  
  // Graph endpoints
  private readonly GET_ALL_GRAPHS = this.BASE_URL;
  private readonly POST_GRAPH = this.BASE_URL;
  private readonly GET_GRAPH = (graphId: number) => `${this.BASE_URL}/${graphId}`;
  private readonly DEL_GRAPH = (graphId: number) => `${this.BASE_URL}/${graphId}`;
  
  // Node endpoints
  private readonly POST_NODE = (graphId: number) => `${this.BASE_URL}/${graphId}/nodes`;
  private readonly PUT_NODE = (graphId: number, nodeId: number) => `${this.BASE_URL}/${graphId}/nodes/${nodeId}`;
  private readonly DEL_NODE = (graphId: number, nodeId: number) => `${this.BASE_URL}/${graphId}/nodes/${nodeId}`;
  
  // Edge endpoints
  private readonly POST_EDGE = (graphId: number) => `${this.BASE_URL}/${graphId}/edges`;
  private readonly DEL_EDGE = (graphId: number, edgeId: number) => `${this.BASE_URL}/${graphId}/edges/${edgeId}`;

  constructor(private http: HttpClient) { }

  // Graph operations
  getAllGraphs(): Observable<{ graphs: Graph[] }> {
    return this.http.get<{ graphs: Graph[] }>(this.GET_ALL_GRAPHS);
  }

  createGraph(graphDto: CreateGraphDto): Observable<{ id: number; tag: string }> {
    return this.http.post<{ id: number; tag: string }>(this.POST_GRAPH, { graph: graphDto });
  }

  getGraph(graphId: number): Observable<{ graph: Graph }> {
    return this.http.get<{ graph: Graph }>(this.GET_GRAPH(graphId));
  }

  deleteGraph(graphId: number): Observable<void> {
    return this.http.delete<void>(this.DEL_GRAPH(graphId));
  }

  // Node operations
  addNodeToGraph(nodeDto: AddNodeDto): Observable<{ nodeDto: Node }> {
    return this.http.post<{ nodeDto: Node }>(
      this.POST_NODE(nodeDto.graphId), 
      { node: nodeDto }
    );
  }

  editNodeInGraph(graphId: number, nodeDto: EditNodeDto): Observable<{ nodeDto: Node }> {
    return this.http.put<{ nodeDto: Node }>(
      this.PUT_NODE(graphId, nodeDto.nodeId), 
      { node: nodeDto }
    );
  }

  deleteNodeFromGraph(graphId: number, nodeId: number): Observable<void> {
    return this.http.delete<void>(this.DEL_NODE(graphId, nodeId));
  }

  // Edge operations
  addEdgeToGraph(edgeDto: AddEdgeDto): Observable<{ isSuccess: boolean, edge: Edge }> {
    return this.http.post<{ isSuccess: boolean, edge: Edge }>(
      this.POST_EDGE(edgeDto.graphId), 
      { edge: edgeDto }
    );
  }

  deleteEdgeFromGraph(graphId: number, edgeId: number): Observable<void> {
    return this.http.delete<void>(this.DEL_EDGE(graphId, edgeId));
  }
}
