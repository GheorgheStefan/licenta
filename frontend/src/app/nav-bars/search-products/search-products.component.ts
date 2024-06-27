import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchService} from "./search-service";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.scss'
})
export class SearchProductsComponent {
  inputText: string = '';
  products: any = [];

  constructor(private searchService: SearchService,
              public dialogRef: MatDialogRef<SearchProductsComponent>,
              private router: Router
  ) {

  }


  displayText(): void {
    this.searchService.getSearchedItems(this.inputText).subscribe((products: any) => {
      this.products = products;
      console.log(this.products);
    });
  }
  selectProduct(product: any): void {
    this.dialogRef.close();
    setTimeout(() => {
      window.location.href = `/product/${product.id}`;
    }, 0);
  }
}
