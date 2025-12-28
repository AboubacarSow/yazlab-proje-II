import { Injectable } from '@angular/core';
import { GraphLink, GraphNode } from '../../models/graph.model';
import * as d3 from 'd3';

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

  //Algorithm Visualization & Animation
  private traversalTimer: any;
  private traversalSpeed = 600;
  private selectedNodes = new Set<string>();
  private selectionCallback?: (ids: string[]) => void;
  private traversalActive = false;
  selectionEnabled: boolean=false;
  private selectionMax = 0;
  // Ends


  constructor() { }

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
      .join('line')
      .attr('stroke', '#384f52ff')
      .attr('stroke-width', 2);

    // --- NODES ---
    this.nodes = this.containerG.selectAll<SVGCircleElement, GraphNode>('circle')
      .data(nodes, d => d.id)
      .join('circle')
      .attr('r', 20)
      .attr('fill', d => d.color ?? '#2cc9daff')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .call(this.createDrag())
      .on('mouseenter', (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 28)
          .attr('fill', '#1f2e5bff');

        this.highlightLinks(d.id);
        this.tooltip
          .style('opacity', 1)
          .html(`
          <div class="tooltip-title">${d.label}</div>
          <div class="tooltip-row">
            <span class="tooltip-key">Activity</span>
            <span class="tooltip-value text-primary">${(d as GraphNode).domain.activity ?? '-'}</span>
          </div>
          <div class="tooltip-row">
            <span class="tooltip-key">Interaction</span>
            <span class="tooltip-value text-primary">${(d as GraphNode).domain.interaction ?? '-'}</span>
          </div>`);
      })
      .on('mousemove', (event) => {
        this.tooltip
          .style('left', event.offsetX + 15 + 'px')
          .style('top', event.offsetY + 15 + 'px');
      })
      .on('mouseleave', (event, d) => {
        if (this.traversalActive) return;
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 20)
          .attr('fill', d.color ?? '#2cc9daff');

          this.tooltip.style('opacity', 0);
          this.resetStyles();
        })
        .on('click', (_, d) => {
          if (!this.selectionEnabled) return;
          if (this.selectedNodes.has(d.id)) return;
          if (this.selectedNodes.size >= this.selectionMax) return;

          this.selectedNodes.add(d.id);
          this.highlightNode(d.id);

          this.selectionCallback?.([...this.selectedNodes]);
        });

    // --- LABELS ---
    this.labels = this.containerG.selectAll<SVGTextElement, GraphNode>('text')
      .data(nodes, d => d.id)
      .join('text')
      .text(d => d.label)
      .attr('font-size', 12)
      .attr('dx', 22)
      .attr('dy', 5);

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
      .attr('fill', '#69b3a2')
      .attr('r', 20);
  }

  private enableZoom(): void {
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4]) // min / max zoom
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
      .attr('fill', '#291ce7ff')
      .attr('r', 28);
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



}
