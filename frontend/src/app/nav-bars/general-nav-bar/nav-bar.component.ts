import {Component, HostListener, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {JwtHandler} from "../../service/JwtHandler";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-general-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  public firstname = "aaaaaaaaaaaaaaaaaaaaaaa";
  public lastname = "aaaaaaaaaaaaaaaaaaaaaaa";


  constructor(private jwtHandler: JwtHandler,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/users/'+this.jwtHandler.getEmail()).subscribe((data: any) => {
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      console.log(data);
    });

  }

  isLoggedIn() {
    return this.jwtHandler.isLoggedIn();
  }

  signOut() {
    this.jwtHandler.removeToken();
  }



}
