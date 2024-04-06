import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-sign-in.component.html',
  styleUrl: './user-sign-in.component.scss'
})
export class UserSignInComponent implements OnInit{
  loginForm: any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''), // Add form controls as needed
      password: new FormControl('')
    });
  }
}
