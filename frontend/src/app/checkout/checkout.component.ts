import {Component, OnInit} from '@angular/core';
import {JwtHandler} from "../service/JwtHandler";
import {UserService} from "../service/user.service";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {CartProductService} from "./services/cartProduct.service";
import {ShoppingCartService} from "./services/shoppingCart.service";
import {MatLine} from "@angular/material/core";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {NgScrollbar} from "ngx-scrollbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatListItem,
    MatList,
    NgForOf,
    MatLine,
    MatSidenavContainer,
    MatNavList,
    NgScrollbar,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  constructor(private userService: UserService,
              private cartProductService: CartProductService,
              private shoppingCartService: ShoppingCartService,
              private jwtHandler: JwtHandler
  ) {}
  userId: any;
  cartItems:any = [];
  totalPrice = 0;


  ngOnInit(): void {
    this.userService.getUserIdByEmail(this.jwtHandler.getEmail()).subscribe((user: any) => {
      this.userId = user.id;
      this.shoppingCartService.getCart(this.userId).subscribe((cartProducts: any) => {
        this.cartProductService.getCartProducts(cartProducts).subscribe((products: any) => {
          this.cartItems = products;
          console.log(this.cartItems);

          this.refreshTotalPrice();
        });
      });
    });

  }


  onItemClick(item: any) {
    console.log(item);
  }


  onDecreaseQuantity(item: any) {
    if (item.amount > 1) {
      item.amount--;
    }

    this.cartProductService.modifyCartAmount(item).subscribe((response: any) => {
      console.log(response);
      this.refreshTotalPrice();
    });
  }

  onIncreaseQuantity(item: any) {
    item.amount++;
    console.log(item);

    this.cartProductService.modifyCartAmount(item).subscribe((response: any) => {
      item.amount = response;
      console.log(response);
      this.refreshTotalPrice();
    });
  }


  onRemoveItem(item: any) {
    this.cartProductService.removeProductFromCart(item).subscribe((response: any) => {
      console.log(response);
      this.cartItems = this.cartItems.filter((cartItem: any) => cartItem.cartProductId !== item.cartProductId);
      this.refreshTotalPrice();
    });
  }

  onCheckout() {

  }

  refreshTotalPrice(): void {
    this.totalPrice = 0; // Reset total price
    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalPrice += this.cartItems[i].price * this.cartItems[i].amount;
    }
  }
}
