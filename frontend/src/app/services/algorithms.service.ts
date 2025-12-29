import { ConnectedComponentResponse, TopFiveNodeInDegreeResponse } from './../models/algorith.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Guid } from '../models/graph.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BFSResponse, DFSResponse, DegreeCentralityResponse, WelshPowellResponse } from '../models/algorith.model';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {

  private BASE_URL : string = environment.apiUrl + 'analysis'

  private readonly BFS=(graphId: Guid)=>`${this.BASE_URL}/bfs/graphId=${graphId}`
  private readonly DFS=(graphId: Guid)=>`${this.BASE_URL}/dfs/graphId=${graphId}`
  private readonly DEGREE_CENTRALITY =(graphId : Guid)=> `${this.BASE_URL}/degree-centrality/graphId=${graphId}`
  private readonly TOP_FIVE =(graphId : Guid)=> `${this.BASE_URL}/top-five-node/graphId=${graphId}`
  private readonly COLORING =(graphId : Guid)=> `${this.BASE_URL}/coloring/graphId=${graphId}`
  private readonly COMPONENTS_DETECTION =(graphId: Guid) => `${this.BASE_URL}/connected-components/graphId=${graphId}`

  constructor(private http : HttpClient) { }

  runBFS(graphId : Guid, startNodeId: number) : Observable<BFSResponse>{
    console.log("BFS running:")
    const command = {
      graphId:graphId,
      startNodeId: startNodeId
    }
    return this.http.post<BFSResponse>(this.BFS(graphId),{command});
  }

  runDFS(graphId: Guid, startNodeId: number): Observable<DFSResponse> {
     const command = {
      graphId:graphId,
      startNodeId: startNodeId
    }
    return this.http.post<DFSResponse>(this.DFS(graphId), {command});
  }
  runWelshPowellColoring(graphId:Guid): Observable<WelshPowellResponse>{
    return this.http.get<WelshPowellResponse>(this.COLORING(graphId));
  }

  runDegreeCentrality(graphId: Guid): Observable<DegreeCentralityResponse> {
    return this.http.get<DegreeCentralityResponse>(
        this.DEGREE_CENTRALITY(graphId)
    );
  }

  getTopFiveNodeInDegree(graphId:Guid): Observable<TopFiveNodeInDegreeResponse>{
    return this.http.get<TopFiveNodeInDegreeResponse>(this.TOP_FIVE(graphId));
  }

  getConnectedComponents(graphId:Guid): Observable<ConnectedComponentResponse>{
    return this.http.get<ConnectedComponentResponse>(this.COMPONENTS_DETECTION(graphId));
  }



}
