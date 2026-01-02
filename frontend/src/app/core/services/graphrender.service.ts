import { inject, Injectable } from '@angular/core';
import { GraphLink, GraphNode } from '../../models/graph.model';
import * as d3 from 'd3';
import { Dialog } from '@angular/cdk/dialog';
import { AddNodeComponent } from '../../workspace/modals/add-node/add-node.component';
import { GraphStateService } from './graph.service';
import { take } from 'rxjs';
import { EdgesService } from './edges.service';
import { ToastService } from '../utils/toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class GraphrenderService {

  private width = 0;
  private height = 0;

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private containerG!: d3.Selection<SVGGElement, unknown, null, undefined>;

  private links!: d3.Selection<SVGLineElement, GraphLink, SVGGElement, unknown>;
  private nodes!: d3.Selection<SVGCircleElement, GraphNode, SVGGElement, unknown>;
  private labels!: d3.Selection<SVGTextElement, GraphNode, SVGGElement, unknown>;

  private simulation!: d3.Simulation<GraphNode, GraphLink>;

  private tooltip!: d3.Selection<HTMLDivElement, unknown, any, any>;
  private readonly defaultNodeColor = '#2f757dff';
  private readonly nodeHighlightColor = '#450722ff'
  private readonly defaultNodeRadius = 20;
  private readonly scaleNodeRadius = 30;

  //Algorithm Visualization & Animation
  private traversalTimer: any;
  private traversalSpeed = 600;
  private selectedNodes = new Set<string>();
  private selectionCallback?: (ids: string[]) => void;
  private traversalActive = false;
  selectionEnabled: boolean=false;
  private selectionMax = 0;
  private colorScale = d3.scaleOrdinal<number, string>()
  .range(d3.schemeTableau10);
  private degreeColorScale = d3.scaleLinear<string>()
        .range(['#e0f3ff', '#6b0857ff']);

  private degreeRadiusScale = d3.scaleLinear<number, number>();
  private readonly minNodeRadius = this.defaultNodeRadius;
  private readonly maxNodeRadius = 35;
  private componentColorScale = d3
  .scaleOrdinal<number, string>()
  .unknown('#bc2c9dff')
  .range(d3.schemePaired.concat(d3.schemeSet3));

  private exploredEdgeColor = '#4085a8ff';   // light gray-blue
  private pathNodeColor = '#fba185ff';       // strong orange
  private pathEdgeColor = '#D84315';

  private communityColorScale = d3.scaleOrdinal<string, string>()
  .range(
    d3.schemeTableau10
      .concat(d3.schemeSet3)
      .concat(d3.schemePaired)
  );
  // Ends

  //Modal select node for edit
  private dialog = inject(Dialog)

  //Edge operations
  private edgeMode = false;
  private edgeSourceNodeId: number | null = null;
  edgeDeleted?: (sourceId: number, targetId: number) => void;
  edgeCreated? :(sourceId: number, targetId:number) => void;

  constructor(private graphStateService: GraphStateService,
              private toast: ToastService
  ) { }

  init(container: HTMLElement): void {
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    d3.select(container).selectAll('*').remove();


    this.tooltip = d3.select(container)
    .style('position', 'relative')
    .append('div')
    .attr('class', 'graph-tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('opacity', 0);


    this.svg = d3.select(container)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.containerG = this.svg.append('g');

    this.simulation = d3.forceSimulation<GraphNode>()
    .force('link', d3.forceLink<GraphNode, GraphLink>().id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(this.width / 2, this.height / 2))
    .force('collide', d3.forceCollide(30));

    this.simulation.on('tick', () => this.ticked());
    this.enableZoom()
  }

  setData(nodes: GraphNode[], links: GraphLink[]): void {
    // --- LINKS ---
    this.links = this.containerG.selectAll<SVGLineElement, GraphLink>('line')
      .data(links, d => d.id ?? `${d.source}-${d.target}`)
      .join(
        enter => enter
          .append('line')
          .attr('class', 'link')
          .attr('stroke', '#484b4bff')
          .attr('stroke-width', 2)
          .on('mouseenter', (event) => {
            this.tooltip
              .style('opacity', 1)
              .html('Hold <b>Alt</b> + Click to delete edge');
          })
          .on('mousemove', (event) => {
            this.tooltip
              .style('left', event.offsetX + 12 + 'px')
              .style('top', event.offsetY + 12 + 'px');

            // Optional visual cue when Alt is pressed
            d3.select(event.currentTarget)
              .attr('stroke', event.altKey ? '#e53935' : '#484b4bff')
              .attr('stroke-width', event.altKey ? 4 : 2);
          })
          .on('mouseleave', (event) => {
                this.tooltip.style('opacity', 0);
                d3.select(event.currentTarget)
                  .attr('stroke', '#484b4bff')
                  .attr('stroke-width', 2);
          })
          .on('click', (event, d) => {
            if (!event.altKey) return;

            event.stopPropagation();
            this.emitDeleteEdge(d);
          }),
        update => update,
        exit => exit.remove()
      );

    // --- NODES ---
    this.nodes = this.containerG
            .selectAll<SVGCircleElement, GraphNode>('circle')
            .data(nodes, d => d.id)
            .join(
              enter => enter
                .append('circle')
                .attr('r', this.defaultNodeRadius)
                .attr('fill', d => d.color ?? this.defaultNodeColor)
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .call(this.createDrag())
                .on('mouseenter', (event, d) => {
                  d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr('r', 32)
                    .attr('fill', '#74190dff');

                  this.highlightLinks(d.id);
                  this.tooltip
                    .style('opacity', 1)
                    .html(`
                      <div class="tooltip-title">${d.label}</div>
                      <div class="tooltip-row">
                        <span class="tooltip-key">Activity</span>
                        <span class="tooltip-value text-info">${d.domain.activity ?? '-'}</span>
                      </div>
                      <div class="tooltip-row">
                        <span class="tooltip-key">Interaction</span>
                        <span class="tooltip-value text-info">${d.domain.interaction ?? '-'}</span>
                      </div>
                    `);
                })
                .on('mousemove', event => {
                  this.tooltip
                    .style('left', event.offsetX + 15 + 'px')
                    .style('top', event.offsetY + 15 + 'px');
                })
                .on('mouseleave', (event, d) => {
                  if (this.traversalActive) return;

                  d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr('r', this.defaultNodeRadius)
                    .attr('fill', d.color ?? this.defaultNodeColor);

                  this.tooltip.style('opacity', 0);
                  this.resetStyles();
                })
                .on('click', (_, d) => {
                  if (this.edgeMode) {
                    this.handleEdgeClick(d);
                    return;
                  }

                  if (!this.selectionEnabled) {
                    const id = Number(d.id);
                    this.graphStateService.getNodeById$(id)
                      .pipe(take(1))
                      .subscribe(editnode => {
                        if (!editnode) return;

                        this.dialog.open(AddNodeComponent, {
                          disableClose: true,
                          panelClass: 'add-node-panel',
                          data: { mode: 'edit', node: editnode }
                        });
                      });
                    return;
                  }

                  if (this.selectedNodes.has(d.id)) return;
                  if (this.selectedNodes.size >= this.selectionMax) return;

                  this.selectedNodes.add(d.id);
                  this.highlightNode(d.id);
                  this.selectionCallback?.([...this.selectedNodes]);
                }),

              // UPDATE
              update => update
                .attr('fill', d => d.color ?? this.defaultNodeColor),

              // EXIT
              exit => exit.remove()
            );

    // --- LABELS ---
    this.labels = this.containerG.selectAll<SVGTextElement, GraphNode>('text')
      .data(nodes, d => d.id)
      .join(
      enter => enter
        .append('text')
        .attr('class', 'label')
        .attr('font-size', 12)
        .attr('dx', 22)
        .attr('dy', 5)
        .text(d => d.label),
      update => update.text(d => d.label),
      exit => exit.remove()
  );

    // Restart simulation
    this.simulation.nodes(nodes);
    (this.simulation.force('link') as d3.ForceLink<GraphNode, GraphLink>)
      .links(links);

    this.simulation.alpha(1).restart();
  }

  private ticked(): void {
    this.links
      .attr('x1', d => (d.source as GraphNode).x!)
      .attr('y1', d => (d.source as GraphNode).y!)
      .attr('x2', d => (d.target as GraphNode).x!)
      .attr('y2', d => (d.target as GraphNode).y!);

    this.nodes
      .attr('cx', d => d.x!)
      .attr('cy', d => d.y!);

    this.labels
      .attr('x', d => d.x!)
      .attr('y', d => d.y!);
  }


  private createDrag() {
    return d3.drag<SVGCircleElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  }

  resetStyles(): void {
    this.nodes
      .transition()
      .duration(300)
      .attr('fill', this.defaultNodeColor)
      .attr('r', 20);
  }

  private enableZoom(): void {
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 5]) // min / max zoom
      .on('zoom', (event) => {
        this.containerG.attr('transform', event.transform);
      });

    this.svg.call(zoom as any);
  }

  private highlightLinks(nodeId: string): void {
    this.links
      .attr('stroke', d =>
        (d.source as GraphNode).id === nodeId ||
        (d.target as GraphNode).id === nodeId
          ? '#ff9800'
          : '#ccc'
      )
      .attr('stroke-width', d =>
        (d.source as GraphNode).id === nodeId ||
        (d.target as GraphNode).id === nodeId
          ? 4
          : 1
      );
  }

  //Algorithm Visualisation & Animation
  reset(): void {
    this.traversalActive = false;

    if (this.traversalTimer) {
      clearTimeout(this.traversalTimer);
      this.traversalTimer = null;
    }

    this.resetStyles();
  }

  private highlightNode(nodeId: string) {
    this.nodes
      .filter(d => d.id === nodeId)
      .interrupt() // IMPORTANT
      .raise()
      .transition()
      .duration(300)
      .attr('fill', this.nodeHighlightColor)
      .attr('r', this.scaleNodeRadius);
  }
  private highlightEdge(a: string, b: string) {
    this.links
      .filter(d =>
        ((d.source as GraphNode).id === a &&
        (d.target as GraphNode).id === b) ||
        ((d.source as GraphNode).id === b &&
        (d.target as GraphNode).id === a)
      )
      .interrupt() // IMPORTANT
      .raise()
      .transition()
      .duration(300)
      .attr('stroke', '#ff2290ff')
      .attr('stroke-width', 4);
  }


  renderTraversal(result: {
    visitOrder: number[];
    edgesTraversed: [number, number][];
    }) {
    this.simulation.stop();
    this.reset();
    this.traversalActive = true;

    let step = 0;

    const animate = () => {
      if (!this.traversalActive) return;
      if (step >= result.visitOrder.length) return;

      const nodeId = result.visitOrder[step];
      console.log('highlight node:',nodeId)
      this.highlightNode(String(nodeId));

      if (step > 0 && result.edgesTraversed[step - 1]) {
        const [a, b] = result.edgesTraversed[step - 1];
        console.log('highlight edge:',a,b)
        this.highlightEdge(String(a), String(b));
      }

      step++;
      console.log('step:', step);
      this.traversalTimer = setTimeout(
        animate,
        this.traversalSpeed
      );
    };

    animate();
  }

  enableNodeSelection(options: { max: number; label: string }) {
    this.selectionEnabled = true;
    this.selectionMax = options.max;
    this.selectedNodes.clear();
  }

  disableNodeSelection() {
    this.selectionEnabled=false;
    this.nodes.on('click', null);
  }


  onSelectionChange(cb: (ids: string[]) => void) {
    this.selectionCallback = cb;
  }

  //WelshPowell
  renderColoring(nodeWithColors: Record<number, number>): Record<string,string> {
    // Coloring cancels traversal visuals
    this.traversalActive = false;
    if (this.traversalTimer) {
      clearTimeout(this.traversalTimer);
      this.traversalTimer = null;
    }
    const colorsUsedPerNode: Record<string,string>={}
    this.nodes
      .interrupt() // stop ongoing transitions
      .transition()
      .duration(400)
      .attr('fill', d => {
        const colorIndex = nodeWithColors[Number(d.id)];
        if(colorIndex!==undefined){
          const color = this.colorScale(colorIndex);
          colorsUsedPerNode[d.id]=color;
          return color;
        }
        return this.defaultNodeColor
      })
      .attr('r', 20);

    // Reset links to neutral state
    this.links
      .transition()
      .duration(300)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

      return colorsUsedPerNode
  }
  //Degree Centrality

  renderDegreeCentrality(nodeDegrees: Record<string, number>, maxDegree: number): void {
    this.simulation.stop();
    this.reset();

    this.degreeColorScale.domain([0, maxDegree]);
    this.degreeRadiusScale.domain([0, maxDegree])
    .range([this.minNodeRadius, this.maxNodeRadius]);

    this.nodes
      .transition()
      .duration(500)
      .attr('r', d => {
          const degree = nodeDegrees[d.id];
          return degree !== undefined
            ? this.degreeRadiusScale(degree)
            : this.defaultNodeRadius;
      })
      .attr('fill', d => {
        const degree = nodeDegrees[d.id];
        return degree !== undefined
          ? this.degreeColorScale(degree)
          : this.defaultNodeColor;
      });
  }


  //Path Finding

  renderShortestPathResult(
    exploredEdges: [number, number][],
    path: number[]
  ): void {
    this.simulation.stop();
    this.reset();

    this.renderPathExploration(exploredEdges);
    this.renderShortestPath(path);
  }

  private renderShortestPath(path: number[]): void {
    this.simulation.stop();
    this.reset();
    this.traversalActive = true;

    let step = 0;

    const animate = () => {
      if (!this.traversalActive) return;
      if (step >= path.length) return;

      const nodeId = String(path[step]);

      this.nodes
      .filter(d => d.id === nodeId)
      .attr('fill', this.pathNodeColor)
      .attr('r', 10);

      if (step > 0) {
        const prev = String(path[step - 1]);

        this.links
        .filter(d =>
          (d.source === prev && d.target === nodeId) ||
          (d.source === nodeId && d.target === prev)
        )
        .attr('stroke', this.pathEdgeColor)
        .attr('stroke-width', 3);
      }

      step++;
      this.traversalTimer = setTimeout(
        animate,
        this.traversalSpeed
      );
    };

    animate();
  }

  private renderPathExploration(exploredEdges: [number, number][]): void {
    exploredEdges.forEach(([a, b]) => {
      this.links
      .filter(d =>
        (d.source === String(a) && d.target === String(b)) ||
        (d.source === String(b) && d.target === String(a))
      )
      .attr('stroke', this.exploredEdgeColor)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');
    });
  }

  //Detection Connected Components

  renderConnectedComponents(nodeToComponent: Record<string, number>): void {
    this.simulation.stop();
    this.reset();

    this.nodes
      .transition()
      .duration(600)
      .attr('fill', d => {
        const componentId = nodeToComponent[d.id];
        return componentId !== undefined
          ? this.componentColorScale(componentId)
          : this.defaultNodeColor;
      })
      .attr('stroke', d => {
        const componentId = nodeToComponent[d.id];
        return componentId !== undefined
          ? d3.color(this.componentColorScale(componentId))!
              .darker(0.9)
              .toString()
          : '#09097eff';
      })
      .attr('stroke-width', 3)
      .attr('r', 22);

    this.links
      .transition()
      .duration(600)
      .attr('stroke', '#09097eff')
      .attr('stroke-opacity', 0.25)
      .attr('stroke-width', 1.5);

      this.simulation
      .force(
        'component-x',
        d3.forceX<GraphNode>(d => {
          const c = nodeToComponent[d.id] ?? 0;
          return (c % 4) * (this.width / 4) + this.width / 8;
        }).strength(0.25)
      )
      .force(
        'component-y',
        d3.forceY<GraphNode>(d => {
          const c = nodeToComponent[d.id] ?? 0;
          return Math.floor(c / 4) * (this.height / 3) + this.height / 6;
        }).strength(0.25)
      )
      .alpha(1)
      .restart();
  }

  //Communtity Detection
  renderCommunities(nodeToCommunity: Record<string, number>): void {
      this.simulation.stop();
      this.reset();

      // Normalize community IDs → strings
      const communities = Array.from(
        new Set(Object.values(nodeToCommunity))
      );

      const communityKey = new Map<number, string>();
      communities.forEach((id, index) => {
        communityKey.set(id, `community-${index}`);
      });

      this.nodes
        .transition()
        .duration(600)
        .attr('fill', d => {
          const communityId = nodeToCommunity[d.id];
          if (communityId === undefined) {
            return this.defaultNodeColor;
          }

          return this.communityColorScale(
            communityKey.get(communityId)!
          );
        })
        .attr('r', d => {
          const communityId = nodeToCommunity[d.id];
          return communityId !== undefined
            ? this.defaultNodeRadius + 6
            : this.defaultNodeRadius;
        }).on("mouseenter", null);

      // Optional: soften inter-community edges
      this.links
        .transition()
        .duration(600)
        .attr('stroke', d => {
          const a = nodeToCommunity[(d.source as GraphNode).id];
          const b = nodeToCommunity[(d.target as GraphNode).id];
          return a === b ? '#555' : '#ddd';
        })
        .attr('stroke-width', d => {
          const a = nodeToCommunity[(d.source as GraphNode).id];
          const b = nodeToCommunity[(d.target as GraphNode).id];
          return a === b ? 2.5 : 1;
        });
  }

  //Edge Operations

  enterEdgeMode() {
    this.edgeMode = true;
    this.containerG.classed('edge-mode', true);
  }

  exitEdgeMode() {
    this.edgeMode = false;
    console.log(`value of edgeMode in existMode:${this.edgeMode}`)
    this.resetStyles();
    this.containerG.classed('edge-mode', false);
  }

  private handleEdgeClick(node: GraphNode) {
    if (this.edgeSourceNodeId === null) {
      // First click → source
      this.edgeSourceNodeId = Number(node.id);
      this.highlightNodeSource(node.id);
      return;
    }

    // Second click → target
    const sourceId = this.edgeSourceNodeId;
    const targetId = Number(node.id);
    this.highlightNode(node.id);

    if (sourceId === targetId) {
      console.log(`No serf-loop allowed`)
      this.toast.error(`Self-loop detected`)
      return;
    }

    this.edgeCreated?.(sourceId,targetId);
    this.exitEdgeMode();
  }

  private highlightNodeSource(nodeId: string){
      this.nodes
      .filter(d => d.id === nodeId)
      .interrupt() // IMPORTANT
      .raise()
      .transition()
      .duration(300)
      .attr('fill', '#e5c140ff')
      .attr('r', 38);
  }


  private emitDeleteEdge(edge: GraphLink) {
    const sourceId =
      typeof edge.source === 'object'
        ? Number(edge.source.id)
        : Number(edge.source);

    const targetId =
      typeof edge.target === 'object'
        ? Number(edge.target.id)
        : Number(edge.target);

    this.edgeDeleted?.(sourceId, targetId);
  }


  disableEdgeCreation(): void{
    this.edgeSourceNodeId=null;
  }

}

