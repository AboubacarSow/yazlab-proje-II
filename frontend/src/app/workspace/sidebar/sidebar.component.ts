import { GraphStateService } from './../../core/services/graph.service';
import { Component, Input, OnInit, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable, take, filter, switchMap } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { EditGraphCommand, EditGraphResponse, Graph, Guid } from '../../models/graph.model';
import { GraphsService } from '../../services/graphs.service';
import { ToastService } from '../../core/utils/toast-service.service';
import { EditGraphComponent } from '../modals/graphs/edit-graph/edit-graph.component';
import { GraphSummaryComponent } from '../modals/graphs/graph-summary/graph-summary.component';
import { AlgorithmCategory, AlgorithmDefinition, AlgorithmResultSummary, ALGORITHMS } from '../../core/utils/algorithm-definition';
import { AlgorithmsStateService } from '../../core/services/algorithms-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  onAction(arg0: string) {
  throw new Error('Method not implemented.');
  }
  // Expandable sections state
  isNodeExpanded = false;
  isEdgeExpanded = false;

  // Graph dropdown state
  showGraphDropdown = false;
  dropdownPosition = { top: '0px', left: '0px' };
  private hideTimeout: any;

  graphTitle$!: Observable<string>;
  graphId$!:Observable<Guid>;
  private dialog = inject(Dialog);

  //Algoritms Section Variables
  categories = AlgorithmCategory;
  algorithms = ALGORITHMS;
  selectedAlgorithm? : AlgorithmDefinition;
  //@Input() algorithmResult?: AlgorithmResultSummary;

  //End of the section

  constructor(private graphStateService: GraphStateService,private graphApiService: GraphsService,
    private toast : ToastService, private algorithmState: AlgorithmsStateService){
    }



  ngOnInit(): void {
    this.graphTitle$ = this.graphStateService.currentGraph$.pipe(
    map(graph => graph?.title ?? 'Default'));

    this.graphId$ = this.graphStateService.currentGraph$.pipe(
    map(graph => graph?.id?? 'undefined'))

  }



  toggleSection(section: string) {
    switch(section) {
      case 'node':
        this.isNodeExpanded = !this.isNodeExpanded;
        break;
      case 'edge':
        this.isEdgeExpanded = !this.isEdgeExpanded;
        break;

    }
  }



  // Modals Actions
  openSummary(){
    this.graphStateService.getGraphSummary().subscribe({
    next: summary => {
      this.dialog.open(GraphSummaryComponent, {
        data: summary,
        panelClass: 'graph-summary-panel',
        disableClose: true
      });
    },
    error: () => {
      this.toast.error('Unable to load graph summary')
    }
  });
  }

  openEditGraph() {
  this.graphStateService.getCurrentGraph$().pipe(
    take(1),
    filter((g): g is Graph => !!g && !!g.id)
    ).subscribe({
    next: (currentGraph) => {
      const command: EditGraphCommand = {
        id: currentGraph.id,
        title: currentGraph.title,
        description: currentGraph.description ?? ''
      };

      const dialogRef = this.dialog.open(EditGraphComponent, {
        data: command,
        panelClass: 'edit-graph-panel',
        disableClose: true
      });
      dialogRef.closed.subscribe(response=>{
        if(response){
          this.toast.success( `Graph ${(response as EditGraphResponse).title}  successfully updated`);
          return;
        }
      })
    },
    error: () => this.toast.error('Unable to load Graph')
  });
  }


  export() {
    this.graphStateService.currentGraph$.pipe(
      take(1),
      filter((g): g is Graph => !!g),
      switchMap(graph =>
        this.graphApiService.exportGraph(graph.id)
      )
    ).subscribe({
      next: response => {
        const blob = new Blob(
          [JSON.stringify(response.graph, null, 2)],
          { type: 'application/json' }
        );

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${response.graph.title}.json`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.toast.error('Unable to export graph')
    });
}


  showDropdown(event: MouseEvent) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.dropdownPosition = {
      top: `${rect.top}px`,
      left: `${rect.right + 8}px`
    };
    this.showGraphDropdown = true;
  }

  hideDropdown() {
    this.hideTimeout = setTimeout(() => {
      this.showGraphDropdown = false;
    }, 200);
  }

  keepDropdownOpen() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }



  //Algoritms Section Functions
  getAlgorithmsByCategory(category: AlgorithmCategory) {
      return this.algorithms.filter(a => a.category === category);
  }
  selectAlgorithm(algo: AlgorithmDefinition) {
    this.selectedAlgorithm = algo;
    console.log(this.selectedAlgorithm)
    this.algorithmState.setSelectedAlgorithm(algo);
  }

  //End of the section
}
