import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";
import {DeleteProductDialogComponent} from "../../popups/delete-product-dialog/delete-product-dialog.component";
import {ProductService} from "../../service/product.service";
import {UpdateProductPopupComponent} from "../../popups/update-product-popup/update-product-popup.component";



interface Product {
  id: string;
  name: string;
}
enum SearchAttribute {
  Name = 'name',
  Id = 'id'
  // Add more attributes here
}
@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent implements OnInit{

  products:any = [];
  name: any = "";
  selectedAttribute: keyof Product = 'name';
  readonly searchAttributes: string[] = Object.values(SearchAttribute);
  p: number = 1;

  constructor(private dialog: MatDialog,
              private productService: ProductService) {
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  AddProductPopUp() {
    const dialogRef = this.dialog.open(AddProductPopupComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchProducts();
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  deleteProductPopUp(productId: string) {
    const skipConfirmation = localStorage.getItem('skipDeleteConfirmation') === 'true';

    if (skipConfirmation) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.products = this.products.filter((product: Product) => product.id !== productId);
        },
        error: (error) => {
          console.error({error: 'Error deleting product:'}, error);
        }
      });
      this.products = this.products.filter((product: Product) => product.id !== productId);
      return;
    }

    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      data: {productId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.skipConfirmation) {
        localStorage.setItem('skipDeleteConfirmation', 'true');
        this.products = this.products.filter((product: Product) => product.id !== productId);
      } else if (result) {
        this.products = this.products.filter((product: Product) => product.id !== productId);
      }
    });
  }

  updateProductPopUp(productId: string) {
    const dialogRef = this.dialog.open(UpdateProductPopupComponent, {
      data: {productId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchProducts();
    });
  }


  search() {
    if (this.name === "") {
      this.ngOnInit();
    } else {
      this.products = this.products.filter((prod: Product) => {
        const attributeValue = prod[this.selectedAttribute];
        return attributeValue && attributeValue.toString().toLocaleLowerCase().includes(this.name.toLocaleLowerCase());
      });
    }
  }

}
