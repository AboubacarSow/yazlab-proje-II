import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeAddComponent } from './node-add/node-add.component';
import { NodeEditComponent } from './node-edit/node-edit.component';
import { GraphStateService } from '../../core/services/graph.service';
import { AlgorithmsStateService } from '../../core/services/algorithms-state.service';
import { AlgorithmDefinition } from '../../core/utils/algorithm-definition';
import { AlgorithmsService } from '../../services/algorithms.service';
import { ToastService } from '../../core/utils/toast-service.service';
import { CommunityLegendItem } from '../../core/utils/algorithm-result';
import { GraphrenderService } from '../../core/services/graphrender.service';
import { AlgorithmResultAdapterService } from '../../core/services/algorithm-result-adapter.service';
import { combineLatest, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-graph-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent implements AfterViewInit, OnDestroy{


  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  currentAlgorithm? : AlgorithmDefinition
  communityLegends?: CommunityLegendItem[]

  private destroy$ = new Subject<void>();

  constructor(private graphStateService: GraphStateService,
              private renderer : GraphrenderService,
              private algorithmState: AlgorithmsStateService,
              private algorithmService: AlgorithmsService,
              private adapter : AlgorithmResultAdapterService,
              private toast : ToastService){}


   ngOnInit() {
      // Subscribe to graph changes
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
      case 'bfs': {
        this.renderer.enableNodeSelection({
        max: 1,
        label: 'Select start node'
      });
        this.toast.algo("Selet start node")
      break;
      }
      case 'dfs':{
        this.renderer.enableNodeSelection({
        max: 1,
        label: 'Select start node'
        });
        this.toast.algo("select start node")
      break;
      }
      case 'dijkstra':{
        this.renderer.enableNodeSelection({
          max: 2,
          label: 'Select start and end nodes'
        });
        this.toast.algo("select source and target nodes")
        break;
      }
      case 'astar':{
        this.renderer.enableNodeSelection({
          max: 2,
          label: 'Select start and end nodes'
        });
        this.toast.algo("Select source and target nodes")
        break;
      }
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
        console.log('Invalid key algorthim')
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
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
            });
        });

        break;
      }
      case 'dfs': {
        if (nodeIds.length !== 1) return;
        this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          const startNodeId = Number(nodeIds[0]);
          console.log('selected node Id:',startNodeId);
          this.algorithmService
            .runDFS(graph.id, startNodeId)
            .subscribe(res => {
              console.log("algorithm service api is called")
              console.log("Result of dfs:",res);
              const traversal = this.adapter.buildTraversalResult(res.result);
              this.renderer.renderTraversal(traversal);
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
              console.log("rendering is done")

            });
        });
        break;
      }
      case 'astar': {
        if (nodeIds.length !== 2) return;
        this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          const startNodeId = Number(nodeIds[0]);
          const targetNodeId= Number(nodeIds[1])
          console.log('selected source Id:',startNodeId);
          console.log('selected target Id:',targetNodeId);
          this.algorithmService
            .runAStarPathFinding(graph.id, startNodeId,targetNodeId)
            .subscribe(res => {
              const pathTraversal= this.adapter.buildTraversalResult(res.result);
              this.renderer.renderShortestPathResult(pathTraversal.edgesTraversed,pathTraversal.visitOrder)
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
              console.log("rendering is done")

            });
        });
        break;
      }
      case 'dijkstra': {
        if (nodeIds.length !== 2) return;
        this.graphStateService.currentGraph$
        .pipe(take(1))
        .subscribe(graph => {
          if (!graph) return;

          const startNodeId = Number(nodeIds[0]);
          const targetNodeId= Number(nodeIds[1])
          console.log('selected source Id:',startNodeId);
          console.log('selected target Id:',targetNodeId);
          this.algorithmService
            .runDijkstraPathFinding(graph.id, startNodeId,targetNodeId)
            .subscribe(res => {
              const pathTraversal= this.adapter.buildTraversalResult(res.result);
              this.renderer.renderShortestPathResult(pathTraversal.edgesTraversed,pathTraversal.visitOrder)
              this.toast.runtime(`Algorithm execution took ${res.result.executionTime} ms `)
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

  // Simple circular layout for nodes
  getNodeX(index: number): number {
    const radius = 200;
    const centerX = 400;
    const angle = (index / Math.max(this.nodes.length, 1)) * 2 * Math.PI;
    return centerX + radius * Math.cos(angle);
  }

  getNodeY(index: number): number {
    const radius = 200;
    const centerY = 300;
    const angle = (index / Math.max(this.nodes.length, 1)) * 2 * Math.PI;
    return centerY + radius * Math.sin(angle);
  }

  getNodePosition(nodeId: number): { x: number; y: number } | null {
    const index = this.nodes.findIndex(n => n.id === nodeId);
    if (index === -1) return null;
    return { x: this.getNodeX(index), y: this.getNodeY(index) };
  }


    openAddNode(node:GraphNode){
    const dialogRef = this.dialog.open(NodeAddComponent, {
      disableClose: true,
      panelClass: 'graph-creation-panel'
    });

    dialogRef.closed.subscribe((node) => {
      // Node başarıyla eklendi, UI güncellenecek
      console.log('Node ekleme tamamlandı:', node);
    });
  }

  openEditNode(node: GraphNode) {
    const current = this.graphState.getCurrentGraph();
    if (!current) return;
    this.dialog.open(NodeEditComponent, {
      disableClose: true,
      panelClass: 'graph-creation-panel',
      data: { node, graphId: current.id }
    });
  }



}
