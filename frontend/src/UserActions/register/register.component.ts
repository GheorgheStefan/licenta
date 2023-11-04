import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }
    onSubmit() {
        let requestData = {};

        if (this.registerForm.valid) {
            requestData = {
                "email": this.registerForm.value.email,
                "password": this.registerForm.value.password,
                "firstname": this.registerForm.value.firstname,
                "lastname": this.registerForm.value.lastname
            }
        }
        console.log(requestData);


        this.http.post('http://localhost:8080/users/register', requestData).subscribe((data) => {
            console.log('POST Request Response:', data);
        });

    }

}
