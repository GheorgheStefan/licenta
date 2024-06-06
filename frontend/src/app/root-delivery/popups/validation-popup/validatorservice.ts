import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'

})

export class ValidatorService {

  constructor(private http: HttpClient) {
  }

  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  validateAddress(address: any) {
    return this.http.post('http://localhost:8080/order/validateOrder', this.getFormData(address));
  }

}
