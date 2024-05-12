import {Component, OnInit} from '@angular/core';
import {MapComponent} from "../map/map.component";
import {AdministrationService} from "./administration.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-administration-page',
  standalone: true,
  imports: [
    MapComponent,
    NgForOf
  ],
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.scss'
})
export class AdministrationPageComponent implements OnInit{
  ownOrders: any = [];
  unassignedOrders: any = [];
  latitude: number = 51.678418;
  longitude: number = 7.809007;

  constructor(private administrationService: AdministrationService
              ) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.administrationService.getAllUnsignedOrders().subscribe((data: any) => {
      this.unassignedOrders = data;
      console.log(this.unassignedOrders);
    });
  }

  assignOrder(id:any) {

  }
}
