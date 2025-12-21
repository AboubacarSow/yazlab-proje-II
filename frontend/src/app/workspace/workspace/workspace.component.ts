import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GraphViewComponent } from '../graph-view/graph-view.component';
import { DataViewComponent } from '../data-view/data-view.component';

@Component({
  selector: 'app-workspace',
  imports: [CommonModule, HeaderComponent, SidebarComponent, GraphViewComponent, DataViewComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  activeTab: 'graph' | 'data' = 'graph';

  onTabChange(tab: 'graph' | 'data') {
    this.activeTab = tab;
  }
}
