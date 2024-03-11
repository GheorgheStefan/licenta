import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";
import {HttpClient} from "@angular/common/http";
import {DeleteProductDialogComponent} from "../../popups/delete-product-dialog/delete-product-dialog.component";

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent implements OnInit{

  products:any = [];
  constructor(private dialog: MatDialog,
              private http: HttpClient) {
  }
  getProducts() {
      this.http.get('http://localhost:8080/products/all').subscribe((response) => {
      this.products = response;
      console.log(this.products);
    });
  }
  AddProductPopUp() {
    const dialogRef = this.dialog.open(AddProductPopupComponent, {
    });
  }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
  }

  deleteProductPopUp(productId: string) {
    console.log(productId);
      const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
          data: { productId }
      });
  }

}
