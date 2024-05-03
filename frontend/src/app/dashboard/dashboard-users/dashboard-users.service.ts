import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DashboardUsersService {
  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('http://localhost:8080/users');
  }

  changeRole(id: any, role: any) {
    return this.http.put('http://localhost:8080/users/changeRole/'+ id, {role: role});
  }



}
