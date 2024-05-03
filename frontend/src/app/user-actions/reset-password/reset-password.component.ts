import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  loginForm!: FormGroup;
  id: any;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.loginForm.get('password')!.value !== this.loginForm.get('confirmPassword')!.value) {
      this.snackBar.open('Passwords do not match!', 'Close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
    }

    let requestData;
    if (this.loginForm.valid) {
      requestData = {
        "newPassword": this.loginForm.get('password')!.value
      }
    } else{
      this.snackBar.open('Invalid form submission', 'Close');
      return;
    }

    console.log(requestData);

    this.userService.resetPassword(this.id,requestData)
      .subscribe((data: any) => {
        console.log('Put Request Response:', data);
        this.userService.redirectToLogin();
      });
  }
}
