import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {JwtHandler} from "../../service/JwtHandler";

@Injectable({
  providedIn: 'root'
})

export class DashboardUserService {
  constructor(private http: HttpClient,
              private jwtHandler: JwtHandler) {
  }
  getFormData(data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  getUser() {
    return this.http.get('http://localhost:8080/users/' + this.jwtHandler.getEmail());
  }

  updateUser(user: any) {
    return this.http.put('http://localhost:8080/users', this.getFormData(user));
  }

  redirectToLogin() {
    window.location.href = 'http://localhost:4200/sign-in';
  }
}
