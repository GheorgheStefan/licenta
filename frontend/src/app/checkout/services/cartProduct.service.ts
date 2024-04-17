import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  constructor( private http: HttpClient) {
  }

  getCartProducts(cartId: any ) {
    return this.http.get('http://localhost:8080/cart-product/' + cartId);
  }

  modifyCartAmount(item: any ) {
    return this.http.put('http://localhost:8080/cart-product/' + item.cartProductId + '/' + item.amount, null);
  }

  removeProductFromCart(item: any) {
    return this.http.delete('http://localhost:8080/cart-product/' + item.cartProductId);

  }
}
