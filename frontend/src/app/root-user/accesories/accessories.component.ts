import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductService} from "../../service/product.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-accesories',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.scss'
})
export class AccessoriesComponent implements OnInit{
  products: any = [];
  constructor( private productService: ProductService,
               private router: Router) {

  }

  ngOnInit(): void {
    this.productService.getAccessories().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }
}
