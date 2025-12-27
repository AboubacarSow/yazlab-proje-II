import { GraphStateService } from './../../core/services/graph.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable, take,pipe, filter, switchMap } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { NodeAddComponent } from '../graph-view/node-add/node-add.component';
import { NodeEditComponent } from '../graph-view/node-edit/node-edit.component';
import { NodeDeleteComponent } from '../graph-view/node-delete/node-delete.component';
import { NodeSelectComponent } from '../graph-view/node-select/node-select.component';
import { NodeListComponent } from '../graph-view/node-list/node-list.component';
import { EdgeAddComponent } from '../graph-view/edge-add/edge-add.component';
import { EdgeSelectComponent } from '../graph-view/edge-select/edge-select.component';
import { EdgeDeleteComponent } from '../graph-view/edge-delete/edge-delete.component';
import { EdgeListComponent } from '../graph-view/edge-list/edge-list.component';
import { GraphStateService } from '../../core/services/graph.service';
import { GraphNode } from '../../models/node.model';
import { Edge } from '../../models/edge.model';
import { EditGraphCommand, EditGraphResponse, Graph, Guid } from '../../models/graph.model';
import { GraphsService } from '../../services/graphs.service';
import { ToastService } from '../../core/utils/toast-service.service';
import { EditGraphComponent } from '../modals/graphs/edit-graph/edit-graph.component';
import { GraphSummaryComponent } from '../modals/graphs/graph-summary/graph-summary.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  // Expandable sections state
  isGraphlarimExpanded = false;
  isNodeExpanded = false;
  isEdgeExpanded = false;
  isTraversalsExpanded = false;
  isBFSExpanded = false;
  isDFSExpanded = false;
  isMetricsExpanded = false;
  isComponentsExpanded = false;

  // Graph dropdown state
  showGraphDropdown = false;
  dropdownPosition = { top: '0px', left: '0px' };
  private hideTimeout: any;

  // Traversals dropdown state
  showTraversalsDropdown = false;
  traversalsDropdownPosition = { top: '0px', left: '0px' };
  private traversalsHideTimeout: any;

  // Components dropdown state
  showComponentsDropdown = false;
  componentsDropdownPosition = { top: '0px', left: '0px' };
  private componentsHideTimeout: any;

  // Graph selection
  selectedGraph: string = '';
  graphs: string[] = ['Graph 1', 'Graph 2', 'Graph 3'];

  // Algorithms list
  algorithms = [
    { id: 'bfs', name: 'BFS', icon: '🔍' },
    { id: 'dfs', name: 'DFS', icon: '🎯' },
    { id: 'dijkstra', name: 'Dijkstra', icon: '🛤️' },
    { id: 'astar', name: 'A*', icon: '⭐' }
  ];
  graphTitle$!: Observable<string>;
  graphId$!:Observable<Guid>;
  private dialog = inject(Dialog);
  constructor(private graphStateService: GraphStateService,private graphApiService: GraphsService,
     private toast : ToastService){
  }
  ngOnInit(): void {
    this.graphTitle$ = this.graphStateService.currentGraph$.pipe(
    map(graph => graph?.title ?? 'Default')
  );
  this.graphId$ = this.graphStateService.currentGraph$.pipe(
    map(graph => graph?.id?? 'undefined'))
  }



  toggleSection(section: string) {
    switch(section) {
      case 'graphlarim':
        this.isGraphlarimExpanded = !this.isGraphlarimExpanded;
        break;
      case 'node':
        this.isNodeExpanded = !this.isNodeExpanded;
        break;
      case 'edge':
        this.isEdgeExpanded = !this.isEdgeExpanded;
        break;
      case 'traversals':
        this.isTraversalsExpanded = !this.isTraversalsExpanded;
        break;
      case 'bfs':
        this.isBFSExpanded = !this.isBFSExpanded;
        break;
      case 'dfs':
        this.isDFSExpanded = !this.isDFSExpanded;
        break;
      case 'metrics':
        this.isMetricsExpanded = !this.isMetricsExpanded;
        break;
      case 'components':
        this.isComponentsExpanded = !this.isComponentsExpanded;
        break;
    }
  }


  // Actions
  onAction(action: string) {
    switch(action) {
      case 'node-add':
        {
          this.graphStateService.loadCurrentGraphFromStorage();
          const cg = this.graphStateService.getCurrentGraph();
          if (!cg) {
            alert('Lütfen önce bir graph oluşturun veya içe aktarın.');
            return;
          }
          this.dialog.open(NodeListComponent, {
            disableClose: true,
            panelClass: 'node-list-panel',
            data: { mode: 'add' }
          });
        }
        break;
      case 'node-edit':
        {
          this.graphStateService.loadCurrentGraphFromStorage();
          const cg = this.graphStateService.getCurrentGraph();
          if (!cg) {
            alert('Lütfen önce bir graph oluşturun veya içe aktarın.');
            return;
          }
          this.dialog.open(NodeListComponent, {
            disableClose: true,
            panelClass: 'node-list-panel',
            data: { mode: 'edit' }
          });
        }
        break;
      case 'node-delete':
        {
          this.graphStateService.loadCurrentGraphFromStorage();
          const cg = this.graphStateService.getCurrentGraph();
          if (!cg) {
            alert('Lütfen önce bir graph oluşturun veya içe aktarın.');
            return;
          }
          this.dialog.open(NodeListComponent, {
            disableClose: true,
            panelClass: 'node-list-panel',
            data: { mode: 'delete' }
          });
        }
        break;
      case 'edge-add':
        {
          this.graphStateService.loadCurrentGraphFromStorage();
          const cg = this.graphStateService.getCurrentGraph();
          if (!cg) {
            alert('Lütfen önce bir graph oluşturun veya içe aktarın.');
            return;
          }
          this.dialog.open(EdgeListComponent, {
            disableClose: true,
            panelClass: 'edge-list-panel',
            data: { mode: 'add' }
          });
        }
        break;
      case 'edge-delete':
        {
          this.graphStateService.loadCurrentGraphFromStorage();
          const cg = this.graphStateService.getCurrentGraph();
          if (!cg) {
            alert('Lütfen önce bir graph oluşturun veya içe aktarın.');
            return;
          }
          this.dialog.open(EdgeListComponent, {
            disableClose: true,
            panelClass: 'edge-list-panel',
            data: { mode: 'delete' }
          });
        }
        break;
      default:
        console.log('Action:', action);
        break;
    }
  }

  private openNodeSelectThenEdit() {
    const ref = this.dialog.open(NodeSelectComponent, { disableClose: true, panelClass: 'graph-creation-panel', data: { mode: 'edit' } });
    ref.closed.subscribe(value => {
      const node = value as GraphNode | null;
      if (!node) return;
      const current = this.graphStateService.getCurrentGraph();
      if (!current) return;
      this.dialog.open(NodeEditComponent, { disableClose: true, panelClass: 'graph-creation-panel', data: { node, graphId: current.id } });
    });
  }

  private openNodeSelectThenDelete() {
    const ref = this.dialog.open(NodeSelectComponent, { disableClose: true, panelClass: 'graph-creation-panel', data: { mode: 'delete' } });
    ref.closed.subscribe(value => {
      const node = value as GraphNode | null;
      if (!node) return;
      const current = this.graphStateService.getCurrentGraph();
      if (!current) return;
      this.dialog.open(NodeDeleteComponent, { disableClose: true, panelClass: 'graph-creation-panel', data: { node, graphId: current.id } });
    });
  }

  private openEdgeSelectThenDelete() {
    this.graphStateService.loadCurrentGraphFromStorage();
    const ref = this.dialog.open(EdgeSelectComponent, { disableClose: true, panelClass: 'graph-creation-panel', data: { mode: 'delete' } });
    ref.closed.subscribe(value => {
      const edge = value as Edge | null;
      if (!edge) return;
      const current = this.graphStateService.getCurrentGraph();
      if (!current) return;
      this.dialog.open(EdgeDeleteComponent, { disableClose: true, panelClass: 'edge-delete-panel', data: { edge, graphId: current.id } });
    });
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
    take(1), // On prend le snapshot actuel
    filter((g): g is Graph => !!g && !!g.id) // On s'assure qu'il existe
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

  selectGraph(graph: string) {
    this.selectedGraph = graph;
    this.showGraphDropdown = false;
    console.log('Selected graph:', graph);
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

  // Traversals Dropdown Methods
  showTraversalsDropdownMenu(event: MouseEvent) {
    if (this.traversalsHideTimeout) {
      clearTimeout(this.traversalsHideTimeout);
    }
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.traversalsDropdownPosition = {
      top: `${rect.top}px`,
      left: `${rect.right + 8}px`
    };
    this.showTraversalsDropdown = true;
  }

  hideTraversalsDropdown() {
    this.traversalsHideTimeout = setTimeout(() => {
      this.showTraversalsDropdown = false;
    }, 200);
  }

  keepTraversalsDropdownOpen() {
    if (this.traversalsHideTimeout) {
      clearTimeout(this.traversalsHideTimeout);
    }
  }

  selectAlgorithm(algorithm: any) {
    console.log('Selected algorithm:', algorithm);
    this.showTraversalsDropdown = false;
    this.onAction(`algorithm-${algorithm.id}`);
  }

  // Components Dropdown Methods
  showComponentsDropdownMenu(event: MouseEvent) {
    if (this.componentsHideTimeout) {
      clearTimeout(this.componentsHideTimeout);
    }
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.componentsDropdownPosition = {
      top: `${rect.top}px`,
      left: `${rect.right + 8}px`
    };
    this.showComponentsDropdown = true;
  }

  hideComponentsDropdown() {
    this.componentsHideTimeout = setTimeout(() => {
      this.showComponentsDropdown = false;
    }, 200);
  }

  keepComponentsDropdownOpen() {
    if (this.componentsHideTimeout) {
      clearTimeout(this.componentsHideTimeout);
    }
  }
}
