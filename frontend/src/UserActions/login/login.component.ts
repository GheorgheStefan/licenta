import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let requestData = {};

    if (this.loginForm.valid) {
       requestData = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
    }
    console.log(requestData);


      this.http.post('http://localhost:8080/users/signin', requestData).subscribe((data) => {
        // Handle the response data
        console.log('POST Request Response:', data);
      });

  }
}
