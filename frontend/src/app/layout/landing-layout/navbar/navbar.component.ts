import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { GraphStateService } from '../../../core/services/graph.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  workspace_root: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,private graphStateService: GraphStateService
  ) {

  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.graphStateService.currentGraph$.pipe(take(1)).subscribe(graph=>{
      if(!graph){

        this.workspace_root='/workspace/create-schema'
        console.log('current graph',graph)
        console.log('workspace root:',this.workspace_root)
      }
      else{
        this.workspace_root= '/workspace'
      }
    })
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
