import {Component, OnInit} from '@angular/core';
import {JwtHandler} from "../../service/JwtHandler";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DetailsOrderPopupComponent} from "../dashboard-orders/details-order-popup/details-order-popup.component";
import {DashboardUserService} from "./dashboard-user.service";
import {UserEditPopupComponent} from "./user-edit-popup/user-edit-popup.component";
import {UserService} from "../../user-actions/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})
export class DashboardUserComponent implements OnInit{
  user: any;

  constructor(private jwtHandler: JwtHandler,
              private dashboardUserService: DashboardUserService,
              private dialog: MatDialog,
              private userService: UserService,
              private snackBar: MatSnackBar ) { }

  fetchUser() {
   this.dashboardUserService.getUser().subscribe((user: any) => {
      this.user = user;
    }, error => {
      console.log(error);
    });

  }

  ngOnInit(): void {
   this.fetchUser();
  }

  editInfo(userId: any) {
      const dialogRef = this.dialog.open(UserEditPopupComponent, {
        width: '800px',
        height: '320px',
        data: userId,
        // disableClose: true,
      });

      dialogRef.afterClosed().subscribe(() => {
        this.fetchUser();
      });
  }

  signOut() {
    this.jwtHandler.removeToken();

    this.dashboardUserService.redirectToLogin();

  }

  changePassword() {
    let requestData = {
      "email": this.jwtHandler.getEmail(),
    }

    this.userService.sendMailPassword(requestData)
      .subscribe((data: any) => {
        this.snackBar.open('Email to reset password was sent!', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      });
  }
}
