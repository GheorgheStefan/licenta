import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {NgxDropzoneModule} from 'ngx-dropzone';
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

interface ImageData {
  imageUrl: any;
  imageType: any;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  presentationImage: string;
  selectedImages: string[];
  productSizes: Size[];
}

interface Size {
  id: number;
  size: string;
  quantity: number;
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
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './add-product-popup.component.html',
  styleUrl: './add-product-popup.component.scss'
})

export class AddProductPopupComponent implements OnInit {
  private presentationFilesData: File[] = [];

  constructor(private dialog: MatDialogRef<AddProductPopupComponent>,
              private formBuilder: FormBuilder,
              private productService: ProductService) {}

  srcResult: any;
  presentationImage: any;
  files: File[] = [];
  prezentationFiles: File[] = [];
  myform = this.formBuilder.group({
    name: this.formBuilder.control(''),
    price: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    presentationImage: this.formBuilder.control(''),
    selectedImages: this.formBuilder.control(''),
    sizes: this.formBuilder.array([]),
    category: this.formBuilder.control(''),
    subcategory: this.formBuilder.control(''),
    brand: this.formBuilder.control('')
  });
  iamgesConverted: ImageData[] = [];

  get sizesData() {
    return this.myform.get('sizes') as FormArray;
  }


  async addProduct() {
    this.convertFileToBase64();
    this.onFileSelected(this.prezentationFiles[0])

    //sol provizorie merge
    await new Promise(f => setTimeout(f, 100));

    let product = {
      ...this.myform.value,
      presentationImage: this.presentationImage,
      selectedImages: JSON.stringify(this.iamgesConverted),
      sizes: JSON.stringify(this.sizesData.value)
    };
    this.productService.saveProduct(product).subscribe(httpResponse => {
      console.log(httpResponse);
      this.closePopup();
    });
  }

  closePopup() {
    this.dialog.close();
  }

  onFileSelected(file: any) {
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
      presentationImage: ['', Validators.required],
      selectedImages: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      brand: ['', Validators.required],
      sizes: this.formBuilder.array([])
    });

  }

  onSelect(event: any) {
    if (this.files.length < 3)
      this.files.push(...event.addedFiles);
    else {
      for (let i = 3; i < this.files.length; i++) {
        this.files.splice(i, 1);
      }
    }
    if (this.files.length >= 4)
      this.onSelect(event);

  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelectSingleImage(event: any) {
    if (this.prezentationFiles.length < 1) {
      this.prezentationFiles.push(...event.addedFiles);
    } else {
      for (let i = 1; i < this.prezentationFiles.length; i++) {
        this.prezentationFiles.splice(i, 1);
      }
    }
    if (this.prezentationFiles.length >= 2)
      this.onSelectSingleImage(event);

    this.presentationFilesData = this.prezentationFiles;
  }

  onRemovePresentationImage(event: any) {
    this.prezentationFiles.splice(this.prezentationFiles.indexOf(event), 1);
  }


  addSize() {
    const sizes = this.myform.get('sizes') as FormArray; // Get the sizes form array
    sizes.push(this.formBuilder.group({
      size: ['', Validators.required],
      quantity: ['', Validators.required]
    }));
  }

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

  removeSize(index: number) {
    this.sizesData.removeAt(index);
  }
}
