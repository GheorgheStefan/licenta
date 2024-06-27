import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'

})

export class ProductService {
  private data: any;
  private products: any;

  constructor( private http: HttpClient) {
  }

  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    console.log(formData);
    return formData;
  }
  saveProduct(product: any) {
    return this.http.post('http://localhost:8080/products/add', this.getFormData(product));
  }

  deleteProduct(productId: string) {
    return this.http.delete('http://localhost:8080/products/delete/' + productId);
  }

  getProducts() {
    return this.http.get('http://localhost:8080/products/all');
  }
  getProduct(productId: string) {
    return this.http.get('http://localhost:8080/products/' + productId);
  }
  getProductDetails(productId: string) {
    return this.http.get('http://localhost:8080/products/' + productId + '/details');

  }
  getProductSizes(productId: string) {
    return this.http.get('http://localhost:8080/products/sizes/' + productId);

  }
  updateProduct(productId: string, product: any) {
    return this.http.put('http://localhost:8080/products/update/' + productId, this.getFormData(product));
  }

  getAccessories() {
    return this.http.get('http://localhost:8080/products/accessories');
  }
  getClothing() {
    return this.http.get('http://localhost:8080/products/clothing');
  }
  getFootwear() {
    return this.http.get('http://localhost:8080/products/footwear');
  }

}
