import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Observable, ReplaySubject} from "rxjs";
import { NgxDropzoneModule} from 'ngx-dropzone';
import {NgForOf, NgIf} from "@angular/common";
import {coerceStringArray} from "@angular/cdk/coercion";

interface ImageData {
  imageUrl: any;
  imageType: any;
}
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
    ReactiveFormsModule,
    NgxDropzoneModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-product-popup.component.html',
  styleUrl: './add-product-popup.component.scss'
})

export class AddProductPopupComponent implements OnInit{
  private presentationFilesData: File[] = [];

  constructor(private dialog: MatDialogRef<AddProductPopupComponent>,
              private formBuilder: FormBuilder,
              private productService: ProductService) {
  }
  imagesEncoded: ImageData[] = [];
  srcResult: any;
  presentationImage: any;
  files: File[] = [];
  prezentationFiles: File[] = [];
  images : ImageData[] = [];
  myform = this.formBuilder.group({
    name: this.formBuilder.control(''),
    price: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    presentationImage: this.formBuilder.control(''),
    selectedImages: this.formBuilder.control(''),
    sizes: this.formBuilder.array([])
  });
  iamgesConverted: ImageData[] = [];
  get sizesData() {
    return this.myform.get('sizes') as FormArray;
  }


  async addProduct() {
    // this.populateImages();
    this.convertFileToBase64();
    console.log("Images:!!!!!!!!!!!!!!!!!!!!!!")
    console.log(this.iamgesConverted);
    console.log(this.iamgesConverted.length);
    this.onFileSelected(this.prezentationFiles[0])

    //sol provizorie merge
    await new Promise(f => setTimeout(f, 5000));
    console.log("Images:!!!!!!!!!!!!!!!!!!!!!!")
    console.log(this.iamgesConverted);
    console.log(this.iamgesConverted.length);

    let product = {
      ...this.myform.value,
      presentationImage: this.presentationImage,
      selectedImages: JSON.stringify(this.iamgesConverted),
      sizes: JSON.stringify(this.sizesData.value)
    };
    console.log("Product:!!!!!!!!!!!!!!!!!!!!!!")
    console.log(product);
    this.productService.saveProduct(product).subscribe(httpResponse => {
      this.closePopup();
    });
  }
  closePopup() {
    this.dialog.close();
  }
  onFileSelected( file: any) {
    this.presentationImage = file;
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
    }
  }
  ngOnInit() {
    this.myform = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      presentationImage: [''],
      selectedImages: [''],
      sizes: this.formBuilder.array([])
    });

  }
  // convertFileToBase64(file: File): string {
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(file);
  //   reader.onload = (event) => {
  //     const base64 = btoa((event.target?.result) as string);
  //     return base64;
  //   }
  //   return '';
  // }
  // populateImages() {
  //   this.files.forEach(file => {
  //     const base64 = this.convertFileToBase64(file);
  //     const image: any = {}; // Create a new image object for each file
  //     image.imageUrl = base64;
  //     image.imageType = file.type;
  //     this.images.push(image);
  //   });
  // }

  onSelect(event : any) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event : any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelectSingleImage(event: any) {
    if (this.prezentationFiles.length < 1){
      this.prezentationFiles.push(...event.addedFiles);
    }
    this.presentationFilesData = this.prezentationFiles;
  }

  onRemovePresentationImage(event : any) {
    this.prezentationFiles.splice(this.prezentationFiles.indexOf(event), 1);
  }


  addSize() {
    const sizes = this.myform.get('sizes') as FormArray; // Get the sizes form array
    sizes.push(this.formBuilder.group({
      size: ['', Validators.required],
      quantity: ['', Validators.required]
    }));
  }



  ////////////////

  convertFileToBase64() {
    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      reader.readAsBinaryString(this.files[i]);
      reader.onload = (event) => {
        const base64 = btoa((event.target?.result) as string);
        this.iamgesConverted.push({imageUrl: base64, imageType: this.files[i].type});
      }
    }
  }




}
