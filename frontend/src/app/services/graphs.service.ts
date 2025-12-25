import {EditGraphCommand, EditGraphRequest, EditGraphResponse, ExportGraphResponse, GetGraphSummaryResponse, GraphSnapshot, Guid, ImportGraphCommand, ImportGraphRequest } from './../models/graph.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Graph,
  CreateGraphDto,
} from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  private readonly BASE_URL = environment.apiUrl + 'graphs'

  // Graph endpoints
  private readonly GET_ALL_GRAPHS = this.BASE_URL
  private readonly POST_GRAPH = this.BASE_URL
  private readonly GET_GRAPH = (graphId: Guid) => `${this.BASE_URL}/${graphId}`
  private readonly DEL_GRAPH = (graphId: Guid) => `${this.BASE_URL}/${graphId}`
  private readonly IMPORT_GRAPH = this.BASE_URL + '/import'
  private readonly GET_SUMMARY = (graphId:Guid) => `${this.BASE_URL}/${graphId}/summary`
  private readonly EXPORT_GRAPH = (graphId:Guid) => `${this.BASE_URL}/${graphId}/export`
  private readonly PUT_GRAPH =(graphId:Guid) =>`${this.BASE_URL}/${graphId}`
  private readonly IMPORT_SNAPSHOT = this.BASE_URL + "/import-snapshot"




  constructor(private http: HttpClient) { }

  // Graph operations
  getAllGraphs(): Observable<{ graphs: Graph[] }> {
    return this.http.get<{ graphs: Graph[] }>(this.GET_ALL_GRAPHS);
  }

  createGraph(graphDto: CreateGraphDto): Observable<{ id: Guid; title: string }> {
    return this.http.post<{ id: Guid; title: string }>(this.POST_GRAPH, { graph: graphDto });
  }

  getGraph(graphId: Guid): Observable<{ graph: Graph }> {
    return this.http.get<{ graph: Graph }>(this.GET_GRAPH(graphId));
  }

  deleteGraph(graphId: Guid): Observable<void> {
    return this.http.delete<void>(this.DEL_GRAPH(graphId));
  }

  importGraph(command : ImportGraphCommand) : Observable<Graph>{
    const payload: ImportGraphRequest = {
      importGraph: command
    };
    return this.http.post<Graph>(this.IMPORT_GRAPH, payload)
  }

  importSnapshot(snapshot: GraphSnapshot) : Observable<Graph>{
    return this.http.post<Graph>(this.IMPORT_SNAPSHOT,snapshot);
  }
  
  exportGraph(graphId: Guid) : Observable<ExportGraphResponse>{
    return this.http.get<ExportGraphResponse>(this.EXPORT_GRAPH(graphId))
  }

  getGraphSummary(graphId: Guid) {
    return this.http.get<GetGraphSummaryResponse>(
      this.GET_SUMMARY(graphId)
    );
  }

  editGraph(graphId : Guid,graph: EditGraphCommand ) : Observable<EditGraphResponse>{
    const payload : EditGraphRequest ={
      graph : graph
    }
    return this.http.put<EditGraphResponse>(this.PUT_GRAPH(graphId),payload)
  }


}
