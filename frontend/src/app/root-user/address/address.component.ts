import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddressService} from "./address.service";
import {NgForOf, NgIf} from "@angular/common";
import {AddAddressPopupComponent} from "./add-address-popup/add-address-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {JwtHandler} from "../../service/JwtHandler";
import {UpdateAddressPopupComponent} from "./update-address-popup/update-address-popup.component";
import {forkJoin, Subscription} from "rxjs";

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
    this.addressService.getUserAddresses(this.jwtHandler.getEmail()).subscribe(
      (res: any) => {
        this.userAddresses = res;
        this.addressesExist = this.userAddresses.length > 0;
        console.log(this.userAddresses);

        this.userShippingAddress = this.userAddresses.find((address: any) => address.isShippingAddress === 'true');
        this.isShippingAddressSet = this.userShippingAddress !== undefined;
        this.userBillingAddress = this.userAddresses.find((address: any) => address.isBillingAddress === 'true');
        this.isBillingAddressSet = this.userBillingAddress !== undefined;
      }
    );
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddAddressPopupComponent, {
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
      window.location.reload()

    });
    this.fetchAddresses();
  }

  editAddressPopup(id: any) {
    const dialogRef = this.dialog.open(UpdateAddressPopupComponent, {
      data: {id},
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.fetchAddresses();
      window.location.reload()
    });
    this.fetchAddresses();
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
