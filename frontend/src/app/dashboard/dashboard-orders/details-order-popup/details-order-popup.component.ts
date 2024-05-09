import {Component, Inject, OnInit} from '@angular/core';
import {DashboardOrdersService} from "../dashboard-orders.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-details-order-popup',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './details-order-popup.component.html',
  styleUrl: './details-order-popup.component.scss'
})
export class DetailsOrderPopupComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public data: any;
  order: any ;
  productsArr: any[] = [];
  productArrTest: any[] = [];

  constructor(private dashboardOrdersService: DashboardOrdersService,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }

  fetchOrders(): void {
    this.dashboardOrdersService.getOrdersById(this.data).subscribe(orders => {
      this.order = orders;
      this.dashboardOrdersService.getOrderProducts(this.data).subscribe((products:any) => {
        this.productsArr = products;
        for (let i = 0; i < this.productsArr.length; i++) {
          this.productArrTest.push(this.productsArr[i]);
          this.productArrTest.push(this.productsArr[i]);
          this.productArrTest.push(this.productsArr[i]);

        }
        console.log(this.productsArr);
      });
    });
  }

  ngOnInit(): void {
    this.fetchOrders();

  }

}
