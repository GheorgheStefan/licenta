import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    console.log(formData);
    return formData;
  }
  constructor(private http: HttpClient,
              private router: Router) {
  }

  getSearchedItems(search: any) {
    console.log(search);
    // return this.http.get('http://localhost:8080/products/all');
    return this.http.get('http://localhost:8080/products/all/' + search);
    // return this.http.get('http://localhost:8080/products/search/' + search);
  }


}
