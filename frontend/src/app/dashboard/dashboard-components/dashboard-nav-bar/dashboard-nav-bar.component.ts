import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-dashboard-nav-bar',
  standalone: true,
  templateUrl: './dashboard-nav-bar.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    RouterLinkActive
  ],
  styleUrls: ['./dashboard-nav-bar.component.scss']
})
export class DashboardNavBarComponent implements OnInit{

  @Output()onToggleSideNav = new EventEmitter();
  screenWidth: number = 0;
  collapsed = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
    } else {
      this.collapsed = false;
    }
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed});
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed});
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed});
  }
}
