import {Component, OnInit} from '@angular/core';
import {JwtHandler} from "../../service/JwtHandler";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})
export class DashboardUserComponent implements OnInit{

  constructor(private jwtHandler: JwtHandler) { }

  ngOnInit(): void {
  }

}
