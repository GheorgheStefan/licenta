import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
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
