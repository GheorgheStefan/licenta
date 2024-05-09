import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHandler} from "../../service/JwtHandler";


@Injectable({
  providedIn: 'root'
})

export class UserOrderService{
  constructor(private http: HttpClient,
              private jwtHandler: JwtHandler) {}

  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  getUserOrders(userId: any) {
    return this.http.get('http://localhost:8080/order/user/' + userId);
  }

  updateOrderStatus(orderId: any, formData: any) {
    return this.http.put('http://localhost:8080/order/status/' + orderId , this.getFormData(formData));
  }

}
