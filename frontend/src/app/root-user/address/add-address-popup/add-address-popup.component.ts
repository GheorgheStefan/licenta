import {booleanAttribute, Component, NgIterable, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {AddressService} from "../address.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../service/user.service";
import {JwtHandler} from "../../../service/JwtHandler";

@Component({
  selector: 'app-add-address-popup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    NgForOf,
    NgIf,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './add-address-popup.component.html',
  styleUrl: './add-address-popup.component.scss'
})
export class AddAddressPopupComponent implements OnInit {
  protected countries: any = [];
  protected states: any = [];

  constructor(private addressService: AddressService,
              private formBuilder: FormBuilder,
              private dialog: MatDialogRef<AddAddressPopupComponent>,
              private jwtHandler: JwtHandler) {
  }
  myform = this.formBuilder.group({
    userMail: [''],
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

  }


  addAddress() {
      this.myform.patchValue({userMail: this.jwtHandler.getEmail()});
      console.log(this.myform.value);
      this.addressService.addAddress(this.myform.value).subscribe((res: any) => {
        // console.log(res);
      });
      this.dialog.close(this.myform.value);
  }
}
