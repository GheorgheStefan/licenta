import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DashboardOrdersService {
  constructor(private http: HttpClient) {
  }

  getOrders() {
    return this.http.get('http://localhost:8080/order');
  }
  getOrdersById(id: any) {
    return this.http.get('http://localhost:8080/order/' + id);
  }
  getOrderProducts(orderId: any) {
    return this.http.get('http://localhost:8080/order-product/order/' + orderId);
  }
}
