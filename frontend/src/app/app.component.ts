import {Component, OnInit} from '@angular/core';
import {User} from "./entities/user";
import {UserService} from "./service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  public users : User[]= [];

  ngOnInit() {
    this.getUsers();
  }
  constructor(private userService: UserService) {
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      (response : User[]) => {
        this.users = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
