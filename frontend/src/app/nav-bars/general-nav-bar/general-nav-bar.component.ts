import {Component, HostListener, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {JwtHandler} from "../../service/JwtHandler";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgIf} from "@angular/common";
import {TruncateNamePipe} from "../truncate-name.pipe";


@Component({
  selector: 'app-general-nav-bar',
  standalone: true,
  templateUrl: './general-nav-bar.component.html',
  imports: [
    RouterLink,
    BsDropdownModule,
    NgIf,
    TruncateNamePipe
  ],
  styleUrls: ['./general-nav-bar.component.scss']
})
export class GeneralNavBarComponent implements OnInit{
  public firstname = " ";
  public lastname = " ";


  constructor(private jwtHandler: JwtHandler,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/users/' + this.jwtHandler.getEmail()).subscribe((user: any) => {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
    }, error => {
      console.log(error);
    });
  }


  isLoggedIn() {
    return this.jwtHandler.isLoggedIn();
  }

  signOut() {
    this.jwtHandler.removeToken();
  }



}
