import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {

  constructor( private http: HttpClient) {
  }

  saveOrder(order: any ) {
    console.log('order', order);
    return this.http.post('http://localhost:8080/order', order);
  }
}
