import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard-nav-bar',
  standalone: true,
  templateUrl: './dashboard-nav-bar.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./dashboard-nav-bar.component.scss']
})
export class DashboardNavBarComponent {

}
