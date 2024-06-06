import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtHandler} from "../../service/JwtHandler";
import {UserService} from "../../service/user.service";
import {ShoppingCartService} from "./shoppingCart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormsModule,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  cartRegistrationForm: FormGroup = new FormGroup({});
  product: any;
  selectedSize: any;
  images: any = [];
  i: any;
  selectedIndex: any = 0;
  indicators: any = true;
  selectedQuantity: number = 1;
  sizeRows: any[] = [];
  sizeSelected: any = false;
  userId: any;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private jwtHandler: JwtHandler,
              private userService: UserService,
              private shoppingCartService: ShoppingCartService,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: any) => {
        this.productService.getProductDetails(params.id).subscribe((product: any) => {
          this.product = product;
          console.log(this.product);
          this.images.push(this.product.product.presentationImage);
          for (let image of this.product.images) {
            this.images.push(image.imageUrl);
          }
          this.chunkSizes();

        }, error => {
          console.log(error);
        });
      }
    })

    this.userService.getUserIdByEmail(this.jwtHandler.getEmail()).subscribe((user: any) => {
      this.userId = user.id;
    });

    this.cartRegistrationForm = this.formBuilder.group({
      productId: [''],
      userId: [''],
      size: [''],
      amount: ['']
    });

  }

  nextImage() {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }

  previousImage() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }else {
      this.selectedIndex = this.images.length - 1;
    }
  }

  chunkSizes() {
    const chunkSize = 4;
    let currentIndex = 0;
    while (currentIndex < this.product.sizes.length) {
      const currentRow = this.product.sizes.slice(currentIndex, currentIndex + chunkSize);
      this.sizeRows.push(currentRow);
      currentIndex += currentRow.length;
    }
  }

  selectSize(size: any) {
    if (this.selectedSize === size) {
      this.selectedSize = null;
      this.sizeSelected = false;
      this.selectedQuantity = 1;
    } else {
      this.selectedSize = size;
      this.sizeSelected = true;
      this.selectedQuantity = 1;
    }
    console.log('Selected size:', this.selectedSize);
  }

  increment() {
    if (this.selectedSize.quantity > this.selectedQuantity)
      this.selectedQuantity++;
  }

  decrement() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  addToCart() {
    // console.log('Am Intrat in addToCart', this.jwtHandler.getEmail());
    if (this.jwtHandler.getEmail() === '') {
      this.snackBar.open('Please sign in to add products to cart', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      // console.log('Am Intrat in addToCart fara mail');
      return;
      }
    // console.log('nam mai iesit');

    this.cartRegistrationForm.patchValue({
      productId: this.product.product.id,
      userId: this.userId,
      size: this.selectedSize.size,
      amount: this.selectedQuantity
    });

    // console.log('Product added to cart:', this.cartRegistrationForm.value);

    this.shoppingCartService.addToCart(this.cartRegistrationForm.value).subscribe((response: any) => {
      // console.log(response);
      this.snackBar.open('Product added to cart!', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }
}
