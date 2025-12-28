import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlgorithmDefinition } from '../utils/algorithm-definition';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsStateService {

  constructor() { }
  private selectedAlgorithmSubject =
    new BehaviorSubject<AlgorithmDefinition | null>(null);

  readonly selectedAlgorithm$ = this.selectedAlgorithmSubject.asObservable();

  setSelectedAlgorithm(algo: AlgorithmDefinition) {
    this.selectedAlgorithmSubject.next(algo);
  }

  clear() {
    this.selectedAlgorithmSubject.next(null);
  }
}
