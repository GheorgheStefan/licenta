import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {NavigationExtras, Router, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-footwear',
  standalone: true,
  templateUrl: './footwear.component.html',
  imports: [
    NgForOf,
    RouterLink
  ],
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

}
