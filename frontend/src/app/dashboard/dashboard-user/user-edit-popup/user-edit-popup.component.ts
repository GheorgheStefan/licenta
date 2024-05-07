import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {JwtHandler} from "../../../service/JwtHandler";
import {DashboardUserService} from "../dashboard-user.service";

@Component({
  selector: 'app-user-edit-popup',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './user-edit-popup.component.html',
  styleUrl: './user-edit-popup.component.scss'
})
export class UserEditPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dashboardUserService: DashboardUserService,
              private formBuilder: FormBuilder,
              private dialog: MatDialogRef<UserEditPopupComponent>,
              private jwtHandler: JwtHandler) {
  }
  myform = this.formBuilder.group({
    id: [''],
    firstname: [''],
    lastname: [''],
    email: [''],
  });

  ngOnInit(): void {
    this.dashboardUserService.getUser().subscribe((res: any) => {
      this.myform.patchValue({
        firstname: res?.firstname,
        lastname: res?.lastname,
        email: res?.email,
      });

      this.myform.patchValue({id: res?.id});
    });
  }

  updateUser() {
    console.log(this.myform.value);
    this.dashboardUserService.updateUser(this.myform.value).subscribe((res: any) => {
      console.log(res);
    });

    this.dialog.close(this.myform.value);
  }
}
