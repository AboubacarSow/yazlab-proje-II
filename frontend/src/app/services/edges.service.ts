import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddEdgeDto, Edge } from '../models/edge.model';
import { Observable } from 'rxjs';
import { Guid } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class EdgesService {

  private readonly BASE_URL = environment.apiUrl + 'graphs';
  // Edge endpoints
  private readonly POST_EDGE = (graphId: Guid) => `${this.BASE_URL}/${graphId}/edges`;
  private readonly DEL_EDGE = (graphId: Guid, edgeId: number) => `${this.BASE_URL}/${graphId}/edges/${edgeId}`;

  constructor(private http: HttpClient) { }


    // Edge operations
  addEdgeToGraph(edgeDto: AddEdgeDto): Observable<{ IsSuccess: boolean, Edge: Edge }> {
    // Backend expects AddEdgeToGraphRequest { Edge: AddEdgeToGraphCommand }
    // Backend uses PascalCase: GraphId, NodeAId, NodeBId
    const requestBody = {
      Edge: {
        GraphId: edgeDto.graphId,
        NodeAId: edgeDto.nodeAId,
        NodeBId: edgeDto.nodeBId
      }
    };
    return this.http.post<{ IsSuccess: boolean, Edge: Edge }>(
      this.POST_EDGE(edgeDto.graphId),
      requestBody
    );
  }

  deleteEdgeFromGraphByNodes(graphId: Guid, nodeAId: number, nodeBId: number): Observable<void> {
    // Backend expects MapDelete with body: { Edge: { GraphId, NodeAId, NodeBId } }
    const url = `${this.BASE_URL}/${graphId}/edges`;
    const body = { Edge: { GraphId: graphId, NodeAId: nodeAId, NodeBId: nodeBId } };
    return this.http.request<void>('DELETE', url, { body });
  }
}
