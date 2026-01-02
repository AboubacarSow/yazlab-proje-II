import { Component, OnInit } from '@angular/core';
import { AlgorithmResultStorageService } from '../../core/storage/algorithm-result-storage.service';
import { take } from 'rxjs';
import { AlgorithmResult } from '../../models/algorith.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-algorithm-result',
  imports: [ CommonModule],
  templateUrl: './algorithm-result.component.html',
  styleUrl: './algorithm-result.component.css'
})
export class AlgorithmResultComponent implements OnInit{

  algorithmResults?: AlgorithmResult[]
  constructor(private algorithmStorage: AlgorithmResultStorageService){
  }
  ngOnInit(): void {
    this.algorithmStorage.loadAlgorithmResulsFromLocalStorage()

    this.algorithmStorage.currentAlgorithmResult$.pipe(take(1)).subscribe({
      next:(results)=>{
        if(!results){
          console.log('No Algorithm result yet')
          return;
        }
        this.algorithmResults = results
      }
    })
  }
}
