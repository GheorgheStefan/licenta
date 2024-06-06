import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MapComponent} from "../map/map.component";
import {AdministrationService} from "./administration.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {JwtHandler} from "../../service/JwtHandler";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ValidationPopupComponent} from "../popups/validation-popup/validation-popup.component";

@Component({
  selector: 'app-administration-page',
  standalone: true,
  imports: [
    MapComponent,
    NgForOf,
    MatTooltip,
    NgIf
  ],
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.scss'
})
export class AdministrationPageComponent implements OnInit {
  ownOrders: any = [];
  unassignedOrders: any = [];
  location: string = "Your location";
  latitude: number = 50;
  longitude: number = 40;
  showMap: any = true;

  constructor(private jwtHandler: JwtHandler,
              private administrationService: AdministrationService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.fetchOrders();
    this.getCurrentLocation();
  }

  fetchOrders() {
    this.administrationService.getAllUnsignedOrders().subscribe((data: any) => {
      this.unassignedOrders = data;
    });

    this.administrationService.getOrdersByDeliveryGuy(this.jwtHandler.getEmail()).subscribe((data: any) => {
      this.ownOrders = data;
    });
  }

  assignOrder(id: any) {

    this.administrationService.assignOrderToDeliveryGuy(id, this.jwtHandler.getEmail()).subscribe((data: any) => {
      this.fetchOrders();
    });

  }

  travelToPoint(street: any, city: any, county: any, zipCode: any) {
    this.showMap = false;
    console.log(street + " " + city + " " + zipCode);
    this.administrationService.getCoordinates(street, city, county, zipCode).subscribe((data: any) => {
      console.log(data);
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.location = data.displayName;

      this.showMap = true;
    });

  }

  getCurrentLocation() {
    this.showMap = false;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.showMap = true;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  takeMeToSelectedOrder() {
    let lonVerify = parseFloat(String(this.longitude));
    let latVerify = parseFloat(String(this.latitude));

    // Check if lonVerify and latVerify are NaN (Not-a-Number)
    if (isNaN(lonVerify) || isNaN(latVerify)) {
      console.error('Longitude or Latitude is not a number');
      return;
    }

    // Convert to fixed decimals
    lonVerify = parseFloat(lonVerify.toFixed(2));
    latVerify = parseFloat(latVerify.toFixed(2));

    navigator.geolocation.getCurrentPosition((position) => {
      if (lonVerify == parseFloat(position.coords.longitude.toFixed(2)) && latVerify == parseFloat(position.coords.latitude.toFixed(2))) {
        this.snackBar.open('You are at the location already', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
        return;
      }else {
        this.administrationService.redirectToGoogleMaps(this.latitude, this.longitude);
      }
    });
  }

  routeForAllTheOrders() {

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.administrationService.getAllCoordinatesFromDeliveryGuy(this.jwtHandler.getEmail(), position.coords.latitude, position.coords.longitude).subscribe(
        (data: any) => {
          this.unassignedOrders = data;
          this.administrationService.redirectToGoogleMapsBigRoute(data);
          console.log(this.unassignedOrders);
        });
    });
  }

  redeemOrder() {
    const dialogRef = this.dialog.open(ValidationPopupComponent, {
      width: '800px',
      height: '200px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchOrders();
    });
    this.fetchOrders();
  }
}
