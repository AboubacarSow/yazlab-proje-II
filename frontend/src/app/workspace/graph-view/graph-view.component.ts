import { AlgorithmResultAdapterService } from './../../core/services/algorithm-result-adapter.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, Subject, take, takeUntil } from 'rxjs';
import { GraphrenderService } from '../../core/services/graphrender.service';
import { GraphStateService } from '../../core/services/graph.service';
import { AlgorithmsStateService } from '../../core/services/algorithms-state.service';
import { AlgorithmDefinition } from '../../core/utils/algorithm-definition';
import { AlgorithmsService } from '../../services/algorithms.service';

@Component({
  selector: 'app-graph-view',
  imports: [CommonModule],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent implements AfterViewInit, OnDestroy{


  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  currentAlgorithm? : AlgorithmDefinition

  private destroy$ = new Subject<void>();

  constructor(private graphStateService: GraphStateService,
              private renderer : GraphrenderService,
              private algorithmState: AlgorithmsStateService,
              private algorithmService: AlgorithmsService,
              private adapter : AlgorithmResultAdapterService){}


  ngOnInit() {
    this.algorithmState.selectedAlgorithm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(algo => {
        if (!algo) return;
        this.prepareVisualization(algo);
      });
  }
  prepareVisualization(algo: AlgorithmDefinition) {
    this.renderer.reset();
    this.currentAlgorithm = algo;

   // this.renderer.setMod(this.currentAlgorithm.key);

   // this.renderer.setMod(algo.key);



    switch (this.currentAlgorithm.key){
      case 'bfs':
        this.renderer.enableNodeSelection({
        max: 1,
        label: 'Select start node'
      });
      break;
      case 'dfs':
        this.renderer.enableNodeSelection({
        max: 1,
        label: 'Select start node'
      });
      break;
      case 'dijkstra':
        this.renderer.enableNodeSelection({
        max: 2,
        label: 'Select start and end nodes'
      });
      break;
      case 'astar':
        this.renderer.enableNodeSelection({
        max: 2,
        label: 'Select start and end nodes'
      });
      break;
      case 'degree-centrality':
        this.renderer.disableNodeSelection();
      break;
      case 'connected-components':
        this.renderer.disableNodeSelection();
      break;
      case 'community-detection':
        this.renderer.disableNodeSelection();
      break;
      case 'coloring':
        this.renderer.disableNodeSelection();
      break;
      default:
        console.log('invalid key algorithm')
      break
    }

    this.renderer.onSelectionChange(ids => {
      this.onNodesSelected(ids);
      console.log("selected nodes:",ids);
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.renderer.init(this.containerRef.nativeElement);

    combineLatest([
      this.graphStateService.graphNodes$,
      this.graphStateService.graphLinks$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([nodes, links]) => {
      console.log('NODES', nodes);
      console.log('LINKS', links);
      this.renderer.setData(nodes, links);
    });
  }

  private onNodesSelected(nodeIds: string[]) {
    if (!this.currentAlgorithm) return;

    switch (this.currentAlgorithm.key) {

      case 'bfs': {
        if (nodeIds.length !== 1) return;
        this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          const startNodeId = Number(nodeIds[0]);
          console.log('selected node Id:',startNodeId);
          this.algorithmService
            .runBFS(graph.id, startNodeId)
            .subscribe(res => {
              console.log("algorithm service api is called")
              console.log("Result of bfs:",res);
              const traversal = this.adapter.buildTraversalResult(res.result);
              this.renderer.renderTraversal(traversal);
              console.log("rendering is done")
            });
        });

        break;
      }
      default:
        console.log("_default")
      break
    }
  }


}
