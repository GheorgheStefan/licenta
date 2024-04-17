import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor( private http: HttpClient) {
  }

  getCart( userId: any) {
    return this.http.get('http://localhost:8080/shopping-cart/' + userId);
  }
}
