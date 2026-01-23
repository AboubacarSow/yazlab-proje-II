import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlgorithmResultStorageService } from '../../core/storage/algorithm-result-storage.service';
import { GraphStateService } from '../../core/services/graph.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Input() activeTab: 'graph' | 'data' | 'algorithmResult' = 'graph';
  @Output() tabChange = new EventEmitter<'graph' | 'data' | 'algorithmResult'>();
  @Output() reset = new EventEmitter<void>();

  @Input() isgraphCreated= false;
  isDropdownOpen = false;
  isWorkspaceMenuOpen= false;
  dropdownPosition = { top: '0px', left: '0px' };

  //Algorithm Result
  isAlgoResultExist: boolean= false;
  private hideTimeout: any;

  constructor(private algorithmResultStorage: AlgorithmResultStorageService,
    private graphState: GraphStateService, private router : Router
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

  showDropdown(event: MouseEvent) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.dropdownPosition = {
      top: `${rect.top +35}px`,
      left: `${rect.left + 60}px`
    };
    this.isWorkspaceMenuOpen = true;
  }

  hideDropdown() {
    this.hideTimeout = setTimeout(() => {
      this.isWorkspaceMenuOpen = false;
    }, 200);
  }

  keepDropdownOpen() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }
  manageGraphs(){
    return this.router.navigate(['user/dashboard']);
  }
  saveWorkspace(){

  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  requestReset() {
    this.reset.emit();
    this.closeDropdown();
  }
}
