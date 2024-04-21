import {Component, OnInit} from '@angular/core';
import {JwtHandler} from "../service/JwtHandler";
import {UserService} from "../service/user.service";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {CartProductService} from "./services/cartProduct.service";
import {ShoppingCartService} from "./services/shoppingCart.service";
import {MatLine} from "@angular/material/core";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {NgScrollbar} from "ngx-scrollbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AddressService} from "./services/address.service";
import {UpdateAddressPopupComponent} from "../root-user/address/update-address-popup/update-address-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTooltip} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";

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
    MatButton,
    NgIf,
    MatCheckbox,
    MatTooltip,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  constructor(private userService: UserService,
              private cartProductService: CartProductService,
              private shoppingCartService: ShoppingCartService,
              private jwtHandler: JwtHandler,
              private addressService: AddressService,
              private dialog: MatDialog
  ) {
  }

  userId: any;
  cartItems: any = [];
  totalPrice = 0;
  shippingAddress: any;
  isShippingAddressSet: any = false;
  externalDelivery: any = false;
  inHouseDelivery: any = false;
  shippingPrice = 0;
  productsPrice = 0;

  fetchAddresses() {
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

    this.addressService.getUserShippingAddress(this.jwtHandler.getEmail()).subscribe((res: any) => {
      this.shippingAddress = res;
      this.isShippingAddressSet = true;
    });
  }


  ngOnInit(): void {
    this.fetchAddresses();
  }

  onItemClick(item: any) {
    console.log(item);
  }

  onDecreaseQuantity(item: any) {
    if (item.amount > 1) {
      item.amount--;
    }

    this.cartProductService.modifyCartAmount(item).subscribe((response: any) => {
      // console.log(response);
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
    if (this.inHouseDelivery) {
      this.totalPrice += 10;
      this.shippingPrice = 10;
    } else if (this.externalDelivery) {
      this.totalPrice += 20;
      this.shippingPrice = 20;
    }

    this.productsPrice = this.totalPrice - this.shippingPrice;
  }

  editAddressPopup(id: any) {
    const dialogRef = this.dialog.open(UpdateAddressPopupComponent, {
      data: {id},
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAddresses();
    });
  }
  toggleCheckbox(checkbox: string){
    if (checkbox === 'inHouse') {
      this.inHouseDelivery = true;
      this.externalDelivery = false;
      this.refreshTotalPrice();
    } else if (checkbox === 'external') {
      this.externalDelivery = true;
      this.inHouseDelivery = false;
      this.refreshTotalPrice();
    }
  }

}
