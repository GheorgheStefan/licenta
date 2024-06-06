import { Component } from '@angular/core';
import {AddressService} from "../../../root-user/address/address.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {JwtHandler} from "../../../service/JwtHandler";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ValidatorService} from "./validatorservice";

@Component({
  selector: 'app-validation-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './validation-popup.component.html',
  styleUrl: './validation-popup.component.scss'
})
export class ValidationPopupComponent {
  constructor(private validatorService: ValidatorService,
              private formBuilder: FormBuilder,
              private dialog: MatDialogRef<ValidationPopupComponent>,
              private jwtHandler: JwtHandler) {
  }

  myform = this.formBuilder.group({
    courierMail: [''],
    deliveryCode: ['']
  });

  onSubmit() {
    this.myform.patchValue({courierMail: this.jwtHandler.getEmail()});
    console.log(this.myform.value);
    this.validatorService.validateAddress(this.myform.value).subscribe((res: any) => {
      // console.log(res);
    });
    this.dialog.close(this.myform.value);
  }
}
