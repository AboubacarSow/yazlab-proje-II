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
import { GraphrenderService } from '../../core/services/graphrender.service';
import { AlgorithmsService } from '../../services/algorithms.service';
import { buildComponentColorMap } from '../../core/utils/mapperHelper';
import { AddNodeComponent } from '../modals/nodes/add-node/add-node.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{


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
  @Output() algorithmSelected = new EventEmitter<{
      key: string;
      params?: any;
    }>();

  //End of the section

  constructor(private graphStateService: GraphStateService,
    private graphApiService: GraphsService,
    private toast : ToastService,
    private renderer : GraphrenderService,
    private algorithmState: AlgorithmsStateService,
    private algorithmService : AlgorithmsService){
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



  // Modals Graph Actions
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

  clearGraphFields() {
    this.graphStateService.currentGraph$.pipe(take(1))
    .subscribe(graph=>{
      this.graphStateService.resetGraph(graph?.id!)
      console.log("graph reset")
      this.toast.info(`Graph ${graph?.title} has been successfully cleared`)
    })
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
  //End Modal Actions Graphs


  //Algoritms Section Functions
  getAlgorithmsByCategory(category: AlgorithmCategory) {
      return this.algorithms.filter(a => a.category === category);
  }
  selectAlgorithm(algo: AlgorithmDefinition) {
    this.selectedAlgorithm = algo;
    console.log('selected algo:',this.selectedAlgorithm)
    if(this.selectedAlgorithm.key==='coloring'){
        this.runcoloring();
        return;
    }
    if(this.selectedAlgorithm.key==='degree-centrality'){
      this.runDegreeCentrality();
      return;
    }
    if(this.selectedAlgorithm.key==='connected-components'){
      this.runDetectionComponent()
      return;
    }
    if(this.selectedAlgorithm.key === 'community-detection'){
      this.runCommuntityDetection()
      return;
    }
    this.algorithmSelected.emit({key:this.selectedAlgorithm.key})
    this.algorithmState.setSelectedAlgorithm(algo);

  }

  runcoloring(){
    this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          console.log('Coloring is head to start')
          this.algorithmService
            .runWelshPowellColoring(graph.id)
            .subscribe(res => {
              console.log("algorithm service api is called")
              console.log("Result of WelshPowell:",res);
              this.renderer.renderColoring(res.result.nodeWithColors);
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
              console.log("rendering is done")

            });
          });
  }

  runDegreeCentrality(){
    this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          this.algorithmService
            .runDegreeCentrality(graph.id)
            .subscribe(res => {
              console.log("algorithm service api is called")
              console.log("Result of Degree Centrality:",res);
              this.renderer.renderDegreeCentrality(res.result.nodeDegrees,res.result.maxDegree);
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
              console.log("rendering is done")

            });
          });
  }

  runDetectionComponent(){
     this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          console.log('Detection of connected components is head to start')
          this.algorithmService
            .getConnectedComponents(graph.id)
            .subscribe(res => {
              console.log("Result of Detection:",res);
              this.renderer.renderConnectedComponents(buildComponentColorMap(res.result.components));
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
              console.log("rendering is done")

            });
          });
  }
  runCommuntityDetection(){
    this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          console.log('Detection of community is head to start')
          this.algorithmService
            .runCommunityDetection(graph.id)
            .subscribe(res => {
              console.log("Result of Detection:",res);
              console.log('community count:',res.communityCount)
              this.renderer.renderCommunities(res.nodeToCommunity);
              this.toast.runtime(`Detected ${res.communityCount} communities in ${res.executionTime} ms`)
              console.log("rendering is done")

            });
          });
  }
  //End of the section


  // Node's Action
  onAction(action: string) {
    switch (action) {
      case 'node-add':{
        this.dialog.open(AddNodeComponent,
            { disableClose: true,
              data:{mode:'add'},
              panelClass:'add-node-panel'
            } )
      }
    }
  }
}
