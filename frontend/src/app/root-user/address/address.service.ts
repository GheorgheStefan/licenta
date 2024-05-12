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

  addAddress(address: any) {
    return this.http.post('http://localhost:8080/user-address', this.getFormData(address));
  }
  updateAddress(address: any) {
    return this.http.put('http://localhost:8080/user-address', this.getFormData(address));
  }

  deleteAddress(addressId: number) {
    return this.http.delete('http://localhost:8080/user-address/' + addressId);
  }

  getAddressById(addressId: number) {
    return this.http.get('http://localhost:8080/user-address/address/' + addressId);
  }
  getUserShippingAddress(userMail: string) {
    return this.http.get('http://localhost:8080/user-address/shipping/' + userMail);
  }

  getUserAddresses(userMail: string): Observable<any> {
    return this.http.get('http://localhost:8080/user-address/' + userMail);
  }

  getUserBillingAddress(userMail: string): Observable<any> {
    return this.http.get('http://localhost:8080/user-address/billing/' + userMail);
  }




  // countries = ["Franța", "România"];
  //
  // cities = {
  //   "Franța": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
  //   "România": ["Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brăila", "Brașov", "București", "Buzău", "Călărași", "Caraș-Severin", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea"]
  // };
}
