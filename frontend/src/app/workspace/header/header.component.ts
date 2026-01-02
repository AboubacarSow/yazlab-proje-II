import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlgorithmResultStorageService } from '../../core/storage/algorithm-result-storage.service';
import { GraphStateService } from '../../core/services/graph.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Input() activeTab: 'graph' | 'data' | 'algorithmResult' = 'graph';
  @Output() tabChange = new EventEmitter<'graph' | 'data' | 'algorithmResult'>();
  @Output() reset = new EventEmitter<void>();

  @Input() isgraphCreated= false;
  isDropdownOpen = false;

  //Algorithm Result
  isAlgoResultExist: boolean= false;

  constructor(private algorithmResultStorage: AlgorithmResultStorageService,
    private graphState: GraphStateService
  ){}

   ngOnInit(): void {
    if(!this.isgraphCreated) return;
    this.graphState.currentGraph$.pipe(take(1)).subscribe({
      next:graph=>{
        if(!graph) return;
        this.isAlgoResultExist = this.algorithmResultStorage.isAlgorithmExist(graph.id);
      },
      error: err=>{
        console.error('An error occured while retrieving graph from localstorage',err)
      }
    })
  }
  switchTab(tab: 'graph' | 'data' | 'algorithmResult') {
    this.tabChange.emit(tab);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  requestReset() {
    this.reset.emit();
    this.closeDropdown();
  }
}
