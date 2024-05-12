import {Component, OnInit} from '@angular/core';
import {UserEditPopupComponent} from "../../dashboard/dashboard-user/user-edit-popup/user-edit-popup.component";
import {JwtHandler} from "../../service/JwtHandler";
import {DashboardUserService} from "../../dashboard/dashboard-user/dashboard-user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../user-actions/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RouterLink} from "@angular/router";
import {UserInfoService} from "./user-info.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent implements OnInit {
  user: any;
  shippingAddress: any;
  billingAddress: any;
  lastOrder: any = {};

  constructor(private jwtHandler: JwtHandler,
              private dashboardUserService: DashboardUserService,
              private dialog: MatDialog,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private userInfoService:UserInfoService) { }

  fetchUser() {
    this.dashboardUserService.getUser().subscribe((user: any) => {
      this.user = user;
      this.userInfoService.getUserLastOrder(this.user.id).subscribe((data: any) => {
        this.lastOrder = data;
        console.log(this.lastOrder);
      })
      }, error => {
      console.log(error);
    });

    this.userInfoService.getUserShippingAddress().subscribe((data: any) => {
      this.shippingAddress = data;
    });
    this.userInfoService.getUserBillingAddress().subscribe((data: any) => {
      this.billingAddress = data;
    });

  }

  ngOnInit(): void {
    this.fetchUser();
  }

  editInfo(userId: any) {
    const dialogRef = this.dialog.open(UserEditPopupComponent, {
      width: '800px',
      height: '200px',
      data: userId,
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchUser();
    });
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


  isLastOrderModified(): boolean {
    return JSON.stringify(this.lastOrder) !== JSON.stringify({});
  }
}
