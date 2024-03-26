import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormsModule,
    NgClass
  ],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent implements OnInit{
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
    const navigation = window.history.state;
    if (!navigation || navigation.productId === undefined) {
      return;
    }

    this.productService.getProductDetails(navigation.productId).subscribe((product: any) => {
      this.product = product;
      this.images.push(this.product.product.presentationImage);
      for (let image of this.product.images) {
        this.images.push(image.imageUrl);
      }

    });

  }


  addToCart() {

  }
}
