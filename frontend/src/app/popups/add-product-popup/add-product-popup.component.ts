import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-add-product-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product-popup.component.html',
  styleUrl: './add-product-popup.component.scss'
})
export class AddProductPopupComponent {
  srcResult: any;
  file: any;
  myform = this.builder.group({
      name: this.builder.control(''),
      price: this.builder.control(''),
      description: this.builder.control(''),
      file: this.builder.control('')
    });

  constructor(private dialog: MatDialogRef<AddProductPopupComponent>,
              private builder: FormBuilder,
              private productService: ProductService) {

  }

  addProduct() {
     let product = {... this.myform.value, file: this.file}; // suprascrie file-ul
      this.productService.saveProduct(product).subscribe(httpResponse => {
        console.log(httpResponse);
        this.closePopup();
      });
  }

  closePopup() {
    this.dialog.close();
  }

  onFileSelected( event: any) {
    this.file = event.target.files[0]
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

}
