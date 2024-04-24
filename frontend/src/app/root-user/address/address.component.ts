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

export class AddressComponent implements OnInit, OnDestroy {
  isShippingAddressSet: any = true;
  isBillingAddressSet: any = true;
  addressesExist: any = true;

  userBillingAddress: any;
  userShippingAddress: any;
  userAddresses: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(private addressService: AddressService,
              private dialog: MatDialog,
              private jwtHandler: JwtHandler) {
  }

  ngOnInit(): void {
    this.fetchAddresses();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  fetchAddresses(): void {
    const billingAddress$ = this.addressService.getUserBillingAddress(this.jwtHandler.getEmail());
    const shippingAddress$ = this.addressService.getUserShippingAddress(this.jwtHandler.getEmail());
    const userAddresses$ = this.addressService.getUserAddresses(this.jwtHandler.getEmail());

    const combinedSub = forkJoin([billingAddress$, shippingAddress$, userAddresses$]).subscribe(
      ([billingAddress, shippingAddress, userAddresses]) => {
        this.userBillingAddress = billingAddress;
        this.userShippingAddress = shippingAddress;
        this.userAddresses = userAddresses;
      },
      error => {
        this.isBillingAddressSet = false;
        this.isShippingAddressSet = false;
        this.addressesExist = false;
      }
    );
    this.subscriptions.push(combinedSub);
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddAddressPopupComponent, {
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
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
