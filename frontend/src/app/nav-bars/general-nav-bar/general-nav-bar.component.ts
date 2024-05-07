import {Component , OnInit} from '@angular/core';
import {JwtHandler} from "../../service/JwtHandler";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgIf} from "@angular/common";
import {TruncateNamePipe} from "../truncate-name.pipe";
import {UserService} from "../../service/user.service";
import {switchMap} from "rxjs";


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
  user: any;


  constructor(private jwtHandler: JwtHandler,
              private http: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/users/' + this.jwtHandler.getEmail()).subscribe((user: any) => {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
    }, error => {
      console.log(error);
    });

    this.user = this.userService.getUserIdByEmail(this.jwtHandler.getEmail()).subscribe((user: any) => {
        this.user = user;
      }
    );
    // console.log(this.user);

    // this.userService.getUserIdByEmail(this.jwtHandler.getEmail()).pipe(
    //   switchMap((user: any) => {
    //     // this.userId = user.id;
    //     return this.http.get('http://localhost:8080/shopping-cart/' + user.id);
    //   })
    // ).subscribe(
    //   (cart: any) => {
    //     console.log(cart);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }


  isLoggedIn() {
    return this.jwtHandler.isLoggedIn();
  }

  signOut() {
    this.jwtHandler.removeToken();
  }
}
