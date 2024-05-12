import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'

})

export class AdministrationService{
  constructor(private http: HttpClient) {
  }

  getAllUnsignedOrders(){
    return this.http.get('http://localhost:8080/order/unsigned');
  }
}
