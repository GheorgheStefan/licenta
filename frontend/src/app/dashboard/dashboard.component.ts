import { Component } from '@angular/core';
import {DashboardNavBarComponent} from "./dashboard-nav-bar/dashboard-nav-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardNavBarComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
