import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddEdgeDto, AddEdgeResponse, DeleteEdgeResponse, Edge } from '../models/edge.model';
import { Observable } from 'rxjs';
import { Guid } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class EdgeApiService {

  private readonly BASE_URL = environment.apiUrl + 'graphs';
  // Edge endpoints
  private readonly POST_EDGE = (graphId: Guid) => `${this.BASE_URL}/${graphId}/edges`;
  private readonly DEL_EDGE = (graphId: Guid) => `${this.BASE_URL}/${graphId}/edges/delete`;

  constructor(private http: HttpClient) { }


    // Edge operations
  addEdgeToGraph(edgeDto: AddEdgeDto): Observable<AddEdgeResponse> {

     const edge={
        GraphId: edgeDto.graphId,
        NodeAId: edgeDto.nodeAId,
        NodeBId: edgeDto.nodeBId
      };
    return this.http.post<AddEdgeResponse>(
      this.POST_EDGE(edgeDto.graphId),
      {edge}
    );
  }

  deleteEdgeFromGraphByNodes(graphId: Guid, nodeAId: number, nodeBId: number): Observable<DeleteEdgeResponse> {
    // Backend expects MapDelete with body: { Edge: { GraphId, NodeAId, NodeBId } }
    const edge= {
      graphId: graphId,
      nodeAId: nodeAId,
      nodeBId: nodeBId
      };
      return this.http.post<DeleteEdgeResponse>(this.DEL_EDGE(graphId),{edge})
}
}
