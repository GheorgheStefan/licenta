import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {DataService} from "../service/data.service";

@Injectable({
  providedIn: 'root'

})


export class UserService {
  private data: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }
  signIn(data: any) {
    return this.http.post('http://localhost:8080/users/signin',data);
  }

  register(data: any) {
    return this.http.post('http://localhost:8080/users/register', data);
  }

  redirectUser(data: any) {
    let decodedToken: any;
    decodedToken = jwt_decode.jwtDecode(data.token);

    if (decodedToken && decodedToken.role === 'BUYER') {
      this.data = data;
      this.router.navigate(['/home']);
    } else {
      this.data = data;
      this.router.navigate(['/dashboard/home']);
    }
  }

  redirectToLogin() {
    this.router.navigate(['/sign-in']);
  }

}
