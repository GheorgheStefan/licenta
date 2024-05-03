import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss'
})
export class AccountActivationComponent implements OnInit{
  token: any;
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      console.log(this.token); // Output the token to console (optional)
      this.userService.activateAccount(this.token).subscribe((data: any) => {
        console.log(data);
        this.userService.redirectToLogin();
      });
    });

  }

}
