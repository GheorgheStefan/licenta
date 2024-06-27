import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHandler} from "../../service/JwtHandler";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DashboardOrdersService {
  constructor(private http: HttpClient,
              private jwtHandler: JwtHandler) {
  }

  getOrders() {
    return this.http.get('http://localhost:8080/order');
  }

  getOrdersById(id: any) {
    const token = this.jwtHandler.getToken();
    if (!token) {
      return throwError(() => new Error('Token is missing'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8080/order/' + id, { headers });
  }

  getOrderProducts(orderId: any) {
    return this.http.get('http://localhost:8080/order-product/order/' + orderId);
  }
}
