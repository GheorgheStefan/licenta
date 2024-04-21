import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'

})

export class AddressService {

  constructor(private http: HttpClient) {
  }

  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  getUserShippingAddress(userMail: string): Observable<any> {
    return this.http.get('http://localhost:8080/user-address/shipping/' + userMail);
  }
}
