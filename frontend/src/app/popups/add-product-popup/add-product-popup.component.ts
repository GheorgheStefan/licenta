import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Observable, ReplaySubject} from "rxjs";

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

export class AddProductPopupComponent implements OnInit{
    constructor(private dialog: MatDialogRef<AddProductPopupComponent>,
                private formBuilder: FormBuilder,
                private productService: ProductService) {

    }
    type: any;
    srcResult: any;
    presentationImage: any;
    arrayOf64Images: any = [];
    myform = this.formBuilder.group({
        name: this.formBuilder.control(''),
        price: this.formBuilder.control(''),
        description: this.formBuilder.control(''),
        presentationImage: this.formBuilder.control(''),
        selectedImages: this.formBuilder.control(''),
    });

    addProduct() {
        console.log(this.arrayOf64Images);
        let product = {...  this.myform.value,
                                                        presentationImage: this.presentationImage,
                                                        selectedImages: JSON.stringify(this.arrayOf64Images)
        };
        console.log(product);
        this.productService.saveProduct(product).subscribe(httpResponse => {
            console.log(httpResponse);
            this.closePopup();
        });
    }
    closePopup() {
        this.dialog.close();
    }
    onFileSelected( event: any) {
        this.presentationImage = event.target.files[0]
        const inputNode: any = document.querySelector('#file');
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.srcResult = e.target.result;
            };
            reader.readAsArrayBuffer(inputNode.files[0]);
        }
    }
    ngOnInit() {
    }

    convertFileToBase64(file: File) : Observable<string>{
      const result = new ReplaySubject<string>(1);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => {
        result.next(btoa((event.target?.result) as string));
        result.complete();
      }
      return result;
    }
    onImagesSelected(event: any){
      for(let i = 0; i < event.target.files.length; i++){
        this.convertFileToBase64(event.target.files[i]).subscribe(base64 => {
          this.arrayOf64Images.push(base64);
        });
      }
    }
}
