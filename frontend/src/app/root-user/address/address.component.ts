import {Component, OnInit} from '@angular/core';
import {AddressService} from "./address.service";
import {NgForOf, NgIf} from "@angular/common";
import {AddProductPopupComponent} from "../../popups/add-product-popup/add-product-popup.component";
import {AddAddressPopupComponent} from "./add-address-popup/add-address-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {JwtHandler} from "../../service/JwtHandler";
import {UpdateAddressPopupComponent} from "./update-address-popup/update-address-popup.component";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})

export class AddressComponent implements OnInit {
  isShippingAddressSet: any = true;
  isBillingAddressSet: any = true;
  addressesExist: any = true;

  userBillingAddress: any;
  userShippingAddress: any;
  userAddresses: any[] = [];

  constructor(private addressService: AddressService,
              private dialog: MatDialog,
              private jwtHandler: JwtHandler) {
  }

  ngOnInit(): void {
    this.fetchAddresses();
  }

  fetchAddresses(): void {
    this.userBillingAddress = this.addressService.getUserBillingAddress(this.jwtHandler.getEmail()).subscribe(
      (res: any) => {
        this.userBillingAddress = res;
      },
      error => {
        this.isBillingAddressSet = false;
      }
    );
    this.userShippingAddress = this.addressService.getUserShippingAddress(this.jwtHandler.getEmail()).subscribe(
      (res: any) => {
        this.userShippingAddress = res;
      },
      error => {
        this.isShippingAddressSet = false;
      }
    );

    this.addressService.getUserAddresses(this.jwtHandler.getEmail()).subscribe(
      (res: any) => {
        this.userAddresses = res;
        console.log(this.userAddresses);
      },
      error => {
        this.addressesExist = false;
      }
    );
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddAddressPopupComponent, {
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAddresses();
    });
  }

  editAddressPopup(id: any) {
    const dialogRef = this.dialog.open(UpdateAddressPopupComponent, {
      data: {id},
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAddresses();
    });
  }


  deleteAddress(id: any) {
    this.addressService.deleteAddress(id).subscribe(
      (res: any) => {
        console.log(res);
        this.fetchAddresses();
      }
    );
  }
}
