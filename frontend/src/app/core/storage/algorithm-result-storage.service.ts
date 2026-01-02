import { Injectable } from '@angular/core';
import { AlgorithmResult } from '../../models/algorith.model';
import { Guid } from '../../models/graph.model';
import { BehaviorSubject, take } from 'rxjs';
import { GraphStateService } from '../services/graph.service';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmResultStorageService {
  private currentAlgorithmResultSubject = new BehaviorSubject<AlgorithmResult[] | null>(null);
  currentAlgorithmResult$ = this.currentAlgorithmResultSubject.asObservable();

  constructor(private graphState: GraphStateService) { }

  save(result : AlgorithmResult): void{

    const key = this.key(result.graphId)
    const list = this.load(result.graphId);
    list.push(result);
    localStorage.setItem(key,JSON.stringify(list));
  }

  private load(graphId : Guid): AlgorithmResult[]{
    const raw= localStorage.getItem(this.key(graphId));
    return raw ? JSON.parse(raw) : []
  }
  private key(graphId: Guid):Guid{
    return `algorithm-result:${graphId}`
  }
  isAlgorithmExist(graphId : Guid) : boolean {
      const result= localStorage.getItem(this.key(graphId))
      return result ? true: false;
  }
  loadAlgorithmResulsFromLocalStorage(){
    this.graphState.currentGraph$.pipe(take(1)).subscribe({
      next: graph=>{
        if(!graph) return ;
        const raw= localStorage.getItem(this.key(graph.id))
        const results = raw ? JSON.parse(raw) : []
        this.currentAlgorithmResultSubject.next(results);
      }
    })
  }
}
