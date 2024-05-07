import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHandler} from "../../service/JwtHandler";


@Injectable({
  providedIn: 'root'
})

export class UserOrderService{
  constructor(private http: HttpClient,
              private jwtHandler: JwtHandler) {}

  getUserOrders(userId: any) {
    return this.http.get('http://localhost:8080/order/user/' + userId);
  }

  }
