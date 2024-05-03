import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {JwtHandler} from "../../service/JwtHandler";
import {RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-user-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './user-sign-in.component.html',
  styleUrl: './user-sign-in.component.scss'
})
export class UserSignInComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private jwtHandler: JwtHandler,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberForgetGroup: this.formBuilder.group({
        rememberMe: [false]
      })
    });
  }

  onSubmit() {
    let requestData = {};
    let rememberMe = this.loginForm.get('rememberForgetGroup.rememberMe')!.value;

    if (this.loginForm.valid) {
      requestData = {
        "email": this.loginForm.get('email')!.value,
        "password": this.loginForm.get('password')!.value
      }
    }

    this.userService.signIn(requestData)
      .subscribe((data: any) => {
        this.jwtHandler.setToken(data.token, rememberMe);
        this.userService.redirectUser(data);
      });
  }

  sendMailPassword() {
    if (this.loginForm.get('email')!.value === '') {
      this.snackBar.open('Please enter your email address', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
    }
    let requestData = {
      "email": this.loginForm.get('email')!.value,
    }

    this.userService.sendMailPassword(requestData)
      .subscribe((data: any) => {
        this.snackBar.open('Email sent successfully', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      });

  }

}

