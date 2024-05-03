import {Component, Input} from '@angular/core';
import {DashboardNavBarComponent} from "./dashboard-components/dashboard-nav-bar/dashboard-nav-bar.component";
import {RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {DashboardBodyComponent} from "./dashboard-components/dashboard-body/dashboard-body.component";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardNavBarComponent,
    RouterOutlet,
    NgClass,
    DashboardBodyComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSideNavCollapsed = false;
  screenWidth: number = 0;

  // @Input() collapsed: boolean = false;
  // @Input() screenWidth1: number = 0;

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass() {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }else if (this.isSideNavCollapsed && this.screenWidth <= 768) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
