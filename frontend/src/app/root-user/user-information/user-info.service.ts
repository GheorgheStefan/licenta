import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHandler} from "../../service/JwtHandler";


@Injectable({
  providedIn: 'root'
})

export class UserInfoService{
  constructor(private http: HttpClient,
              private jwtHandler: JwtHandler) {
  }
  getUserBillingAddress() {
    return this.http.get('http://localhost:8080/user-address/billing/' + this.jwtHandler.getEmail());
  }
  getUserShippingAddress() {
    return this.http.get('http://localhost:8080/user-address/shipping/' + this.jwtHandler.getEmail());
  }
  getUserLastOrder(userId:any) {
    return this.http.get('http://localhost:8080/order/last/' + userId);
  }
}
