import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'

})

export class AdministrationService{
  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAllUnsignedOrders(){
    return this.http.get('http://localhost:8080/order/unsigned');
  }
  assignOrderToDeliveryGuy( orderId:any, deliveryGuyEmail:any,){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { orderId: orderId, deliveryGuyEmail: deliveryGuyEmail };
    return this.http.put('http://localhost:8080/order/assign', body, {headers: headers});
  }
  getOrdersByDeliveryGuy(deliveryGuyEmail:any){
    return this.http.get('http://localhost:8080/order/all/delivery/' + deliveryGuyEmail);
  }

  getCoordinates(street: any, city: any, county: any, zipCode: any) {
    let params = new HttpParams();
    if (street) params = params.set('street', street);
    if (city) params = params.set('city', city);
    if (county) params = params.set('county', county);
    if (zipCode) params = params.set('postalcode', zipCode);

    return this.http.get('http://localhost:8080/location/geocode' , { params: params });
  }

  redirectToGoogleMaps(latitude: any, longitude: any) {
    this.http.get('https://ipapi.co/json/').subscribe((data: any) => {
      const url = `https://www.google.com/maps/dir/${data.latitude},${data.longitude}/${latitude},${longitude}`;
      window.open(url);
    });

  }

  getAllCoordinatesFromDeliveryGuy(deliveryGuyEmail: any, latitude: any, longitude: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { latitude: latitude, longitude: longitude, displayName:"Curierul" };
    return this.http.post('http://localhost:8080/order/map/orders/' + deliveryGuyEmail, body);
  }

  redirectToGoogleMapsBigRoute(data: any) {
    let url = 'https://www.google.com/maps/dir/';
    for(const coordinate of data){
      url += coordinate.latitude + ',' + coordinate.longitude + '/';
    }
    window.open(url);
  }
}
