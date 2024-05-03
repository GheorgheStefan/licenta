import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";
import {DashboardNavBarComponent} from "../dashboard-components/dashboard-nav-bar/dashboard-nav-bar.component";

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './dashboard-home.component.html',
  imports: [
    DashboardNavBarComponent
  ],
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  items: any;


  fileSelectionEvent($event: Event, i: number) {

  }

  removeItem(i: number) {

  }

  addItem() {

  }
}
