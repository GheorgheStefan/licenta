import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'

})

export class ShoppingCartService {

  constructor( private http: HttpClient) {
  }

  addToCart( data: any) {
    return this.http.post('http://localhost:8080/shopping-cart', data);
  }
}
