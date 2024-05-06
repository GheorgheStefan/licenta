import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {JwtHandler} from "../../../service/JwtHandler";
import {MatTooltip} from "@angular/material/tooltip";
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
    RouterLinkActive,
    MatTooltip
  ],
  styleUrls: ['./dashboard-nav-bar.component.scss']
})
export class DashboardNavBarComponent implements OnInit{
  email: string = '';

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

  constructor(private jwtHandler: JwtHandler) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.email = this.jwtHandler.getEmail();
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
