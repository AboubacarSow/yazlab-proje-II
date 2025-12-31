import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddNodeDto, DeleteNodeRespose, EditNodeDto, Node } from '../models/node.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graph, Guid } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class NodeApiService {
  private readonly BASE_URL = environment.apiUrl + 'graphs';


  private readonly POST_NODE = (graphId: Guid) => `${this.BASE_URL}/${graphId}/nodes`;
  private readonly PUT_NODE = (graphId: Guid, nodeId: number) => `${this.BASE_URL}/${graphId}/nodes/${nodeId}`;
  private readonly DEL_NODE = (graphId: Guid, nodeId: number) => `${this.BASE_URL}/${graphId}/nodes/${nodeId}`;
  constructor(private http : HttpClient) { }


    // Node operations
    addNodeToGraph(nodeDto: AddNodeDto): Observable<{ node: Node }> {
      // Backend expects AddNodeToGraphRequest { Node: AddNodeToGraphCommand }
      return this.http.post<{ node: Node }>(
        this.POST_NODE(nodeDto.graphId),
        { node: nodeDto }
      );
    }

    editNodeInGraph(graphId: Guid, nodeDto: EditNodeDto): Observable<{ node: Node }> {
      // Backend expects EditNodeInGraphRequest { Vertex: EditNodeInGraphCommand }

      const  vertex = {
          id: nodeDto.nodeId,
          graphId: graphId,
          tag: nodeDto.tag,
          activity: nodeDto.activity,
          interaction: nodeDto.interaction
        };
      return this.http.put<{ node: Node }>(
        this.PUT_NODE(graphId, nodeDto.nodeId),
        {vertex}
      );
    }

    deleteNodeFromGraph(graphId: Guid, nodeId: number): Observable<DeleteNodeRespose> {
      return this.http.delete<DeleteNodeRespose>(this.DEL_NODE(graphId, nodeId));
    }
}
