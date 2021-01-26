import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isCollapsed = false;

  constructor(public authService: AuthService,
    private router: Router) {}

  ngOnInit() {

  }
  onNewCat() {
    this.router.navigate(['/cats', 'new']);
  }
  onNewDog() {
    this.router.navigate(['/dogs', 'new']);
  }
}
