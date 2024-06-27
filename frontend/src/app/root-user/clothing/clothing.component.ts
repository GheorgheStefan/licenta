import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductService} from "../../service/product.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent implements OnInit{
  products: any = [];
  constructor( private productService: ProductService,
               private router: Router) {

  }

  ngOnInit(): void {
    this.productService.getClothing().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }
}
