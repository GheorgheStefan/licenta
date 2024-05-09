import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'

})

export class HomePageService {

  constructor(private http: HttpClient) {
  }

  getPresentationProducts() {
    return this.http.get('http://localhost:8080/products/presentation-products');
  }

  getRecommendedProducts() {
    return this.http.get('http://localhost:8080/products/recommended-products');
  }
}
