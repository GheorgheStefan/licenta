import {Component, OnInit} from '@angular/core';
import {DashboardUserService} from "../../dashboard/dashboard-user/dashboard-user.service";
import {UserOrderService} from "./user-order.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {
  DetailsOrderPopupComponent
} from "../../dashboard/dashboard-orders/details-order-popup/details-order-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {

  constructor(private dashboardUserService: DashboardUserService,
              private userOrderService: UserOrderService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }
  userId: any;
  userOrders: any[] = [];

  fetchUser() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userOrderService.getUserOrders(this.userId).subscribe((data: any) => {
        this.userOrders = data;
        console.log(this.userOrders);
      });
    });


  }
  ngOnInit(): void {
    this.fetchUser();
  }


  cancelOrder(orderId: any) {
    let formData = {
      "status": "CANCELLED"
    }

    this.userOrderService.updateOrderStatus(orderId, formData).subscribe((data: any) => {
      console.log(data);
      this.fetchUser();
    });

  }

  seeInfo(orderId: any) {
    const dialogRef = this.dialog.open(DetailsOrderPopupComponent, {
      width: '1000px',
      height: '520px',
      data: orderId,
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
