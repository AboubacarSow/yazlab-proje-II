import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { GraphrenderService } from '../../core/services/graphrender.service';
import { GraphStateService } from '../../core/services/graph.service';

@Component({
  selector: 'app-graph-view',
  imports: [CommonModule],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent implements AfterViewInit, OnDestroy{


  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  private destroy$ = new Subject<void>();

  constructor(private graphStateService: GraphStateService,
            private renderGraph : GraphrenderService){}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.renderGraph.init(this.containerRef.nativeElement);

    combineLatest([
      this.graphStateService.graphNodes$,
      this.graphStateService.graphLinks$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([nodes, links]) => {
      console.log('NODES', nodes);
      console.log('LINKS', links);
      this.renderGraph.setData(nodes, links);
    });
  }

}
