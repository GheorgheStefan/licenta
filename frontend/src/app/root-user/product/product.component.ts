import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormsModule,
    NgClass
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  productId: any;
  product: any;
  selectedSize: any;
  selectedQuantity: any;
  images: any = [];
  i: any;
  selectedIndex: any = 0;
  indicators: any = true;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params:any) => {
        this.productService.getProductDetails(params.id).subscribe((product: any) => {
          this.product = product;
          console.log(this.product);
          this.images.push(this.product.product.presentationImage);
          for (let image of this.product.images) {
            this.images.push(image.imageUrl);
          }
        }, error => {
          console.log(error);
        });
      }
    })

  }


  addToCart() {

  }
}
