import {Component, Inject, OnInit} from '@angular/core';
import {DashboardOrdersService} from "../dashboard-orders.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-details-order-popup',
  standalone: true,
  imports: [],
  templateUrl: './details-order-popup.component.html',
  styleUrl: './details-order-popup.component.scss'
})
export class DetailsOrderPopupComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public data: any;
  order: any ;

  constructor(private dashboardOrdersService: DashboardOrdersService,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }

  fetchOrders(): void {
    this.dashboardOrdersService.getOrdersById(this.data).subscribe(orders => {
      this.order = orders;
      console.log(this.order);
    });
  }

  ngOnInit(): void {
    this.fetchOrders();

  }

}
