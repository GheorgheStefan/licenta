import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-footwear',
  templateUrl: './footwear.component.html',
  styleUrl: './footwear.component.scss'
})
export class FootwearComponent implements OnInit{
  products: any = [];
  constructor( private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  openProduct(productId:any) {
    this.productService.getProductDetails(productId).subscribe(product => {
      console.log(product);
    });
  }
}
