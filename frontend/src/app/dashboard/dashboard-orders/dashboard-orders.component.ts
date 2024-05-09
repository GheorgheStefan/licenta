import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardOrdersService} from "./dashboard-orders.service";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";
import {DetailsOrderPopupComponent} from "./details-order-popup/details-order-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard-orders',
  standalone: true,
  imports: [
    MatButton,
    MatMenu,
    MatMenuItem,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatMenuTrigger,
    FormsModule
  ],
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.scss'
})
export class DashboardOrdersComponent implements OnInit{
  orders: any = [];
  p: number = 1;

  pagedOrders: any[] = [];
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10]; // Options for items per page dropdown

  constructor(private dashboardOrdersService: DashboardOrdersService,
              private dialog: MatDialog) {
  }

  fetchOrders(): void {
    this.dashboardOrdersService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  changeItemsPerPage() {
    this.p = 1; // Reset page number when changing items per page
    this.paginateUsers(); // Call pagination function
  }

  paginateUsers() {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    this.pagedOrders = this.orders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  openDetailsPopup(orderId: any) {
    const dialogRef = this.dialog.open(DetailsOrderPopupComponent, {
      width: '1000px',
      height: '520px',
      data: orderId,
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchOrders();
    });
  }
}
