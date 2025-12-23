import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AddNodeDto, EditNodeDto } from '../models/node.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  private readonly BASE_URL = environment.apiUrl + 'graphs';


  private readonly POST_NODE = (graphId: Guid) => `${this.BASE_URL}/${graphId}/nodes`;
  private readonly PUT_NODE = (graphId: Guid, nodeId: number) => `${this.BASE_URL}/${graphId}/nodes/${nodeId}`;
  private readonly DEL_NODE = (graphId: Guid, nodeId: number) => `${this.BASE_URL}/${graphId}/nodes/${nodeId}`;
  constructor(private http : HttpClient) { }


    // Node operations
    addNodeToGraph(nodeDto: AddNodeDto): Observable<{ nodeDto: Node }> {
      return this.http.post<{ nodeDto: Node }>(
        this.POST_NODE(nodeDto.graphId),
        { node: nodeDto }
      );
    }

    editNodeInGraph(graphId: Guid, nodeDto: EditNodeDto): Observable<{ nodeDto: Node }> {
      return this.http.put<{ nodeDto: Node }>(
        this.PUT_NODE(graphId, nodeDto.nodeId),
        { node: nodeDto }
      );
    }

    deleteNodeFromGraph(graphId: Guid, nodeId: number): Observable<void> {
      return this.http.delete<void>(this.DEL_NODE(graphId, nodeId));
    }
}
