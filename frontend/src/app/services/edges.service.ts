import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddEdgeDto, Edge } from '../models/edge.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdgesService {

  private readonly BASE_URL = environment.apiUrl + 'graphs';
  // Edge endpoints
  private readonly POST_EDGE = (graphId: number) => `${this.BASE_URL}/${graphId}/edges`;
  private readonly DEL_EDGE = (graphId: number, edgeId: number) => `${this.BASE_URL}/${graphId}/edges/${edgeId}`;

  constructor(private http: HttpClient) { }


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
