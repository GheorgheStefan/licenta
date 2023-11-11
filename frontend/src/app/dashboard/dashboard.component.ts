import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/dataService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  data:any;
  token:string;

  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
    this.token = "";
  }
  ngOnInit(): void {
    this.token = this.data.token;

  }
}
