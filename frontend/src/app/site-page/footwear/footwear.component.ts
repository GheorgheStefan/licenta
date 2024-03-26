import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-footwear',
  templateUrl: './footwear.component.html',
  styleUrl: './footwear.component.scss'
})
export class FootwearComponent implements OnInit{
  products: any = [];
  constructor( private productService: ProductService,
               private router: Router) {

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  openProduct(productId: any) {
    this.productService.getProduct(productId).subscribe((data: any) => {
      console.log(data.id); // Accessing the id property
      console.log(data.name);
      this.router.navigate([`/footwear/product/${data.id}`], { state: { productId: data.id } });
    });
  }
}
