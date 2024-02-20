import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'

})

export class ProductService {
  private data: any;

  constructor( private http: HttpClient) {
  }

  saveProduct(product: any) {
    return this.http.post('http://localhost:8080/products/add', this.getFormData(product));
  }
  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

}
