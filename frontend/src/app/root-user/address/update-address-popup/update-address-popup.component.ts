import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AddressService} from "../address.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {JwtHandler} from "../../../service/JwtHandler";

@Component({
  selector: 'app-update-address-popup',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './update-address-popup.component.html',
  styleUrl: './update-address-popup.component.scss'
})
export class UpdateAddressPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private addressService: AddressService,
              private formBuilder: FormBuilder,
              private dialog: MatDialogRef<UpdateAddressPopupComponent>,
              private jwtHandler: JwtHandler) {
  }
  myform = this.formBuilder.group({
    id: [''],
    country: [''],
    city: [''],
    region: [''],
    address: [''],
    postalCode: [''],
    phoneNumber: [''],
    isBillingAddress: [false],
    isShippingAddress: [false]
  });


  ngOnInit(): void {
    this.addressService.getAddressById(this.data.id).subscribe((res: any) => {
      // console.log(res);
      this.myform.patchValue({
        country: res.country,
        city: res.city,
        region: res.region,
        address: res.address,
        postalCode: res.postalCode,
        phoneNumber: res.phoneNumber,
        isBillingAddress: this.convertStringToBoolean(res.isBillingAddress),
        isShippingAddress: this.convertStringToBoolean(res.isShippingAddress)
      });

      this.myform.patchValue({id: this.data.id});
      // console.log(this.myform.value);
    });

  }

  convertStringToBoolean(value: string) {
    return value === 'true';
  }

  updateAddress() {
    console.log(this.myform.value);
    this.addressService.updateAddress(this.myform.value).subscribe((res: any) => {
      console.log(res);
    });

    this.dialog.close(this.myform.value);
  }

  //
  // addAddress() { //de dat email ul si iau eu din baza de date user id ul. sa schimb si in frontend
  //   this.myform.patchValue({userMail: this.jwtHandler.getEmail()});
  //   console.log(this.myform.value);
  //   this.addressService.addAddress(this.myform.value).subscribe((res: any) => {
  //     console.log(res);
  //   });
  //
  //   this.dialog.close(this.myform.value);
  // }

}
