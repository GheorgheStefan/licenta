import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit{
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    let requestData = {};

    if(this.registerForm.valid) {
      requestData = {
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password,
        "phone":this.registerForm.value.phone,
        "firstname": this.registerForm.value.firstname,
        "lastname": this.registerForm.value.lastname
      }
    }

    this.userService.register(requestData).subscribe((data: any) => {
        console.log('POST Request Response:', data);
        this.userService.redirectToLogin();
      });
  }
}
