import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataService} from "../../app/service/data.service";
import {Router} from "@angular/router";
import * as jwt_decode from 'jwt-decode';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private dataService: DataService,
                private router: Router) {
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

        this.http.post('http://localhost:8080/users/signin', requestData)
            .subscribe((data: any) => {
            console.log('POST Request Response:', data);

            if (data && data.token) {

                let decodedToken: any;
                decodedToken = jwt_decode.jwtDecode(data.token);

                console.log(decodedToken);

                console.log(decodedToken.role);
                if (decodedToken && decodedToken.role === 'BUYER') {
                    this.dataService.setData(data);
                    this.router.navigate(['/home']);
                } else {
                    this.dataService.setData(data);
                    this.router.navigate(['/dashboard/home']);
                }
            }
        });


    }
}
