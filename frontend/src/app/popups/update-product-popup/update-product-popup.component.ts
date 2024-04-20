import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {ProductService} from "../../service/product.service";
import {MatIcon} from "@angular/material/icon";

interface ImageData {
  imageUrl: any;
  imageType: any;
}
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
  selector: 'app-update-product-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    NgxDropzoneModule,
    MatButton,
    MatDialogActions,
    MatInput,
    NgForOf,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './update-product-popup.component.html',
  styleUrl: './update-product-popup.component.scss'
})

export class UpdateProductPopupComponent  implements OnInit{
  private presentationFilesData: File[] = [];
  private productId: any;

  constructor(
    private dialog: MatDialogRef<UpdateProductPopupComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }

  ) {
  }
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
    category: this.formBuilder.control(''),
    subcategory: this.formBuilder.control(''),
    brand: this.formBuilder.control(''),
    sizes: this.formBuilder.array([])
  });
  product:any;
  iamgesConverted: ImageData[] = [];


  get sizesData() {
    return this.myform.get('sizes') as FormArray;
  }

  onSelectSingleImage(event: any) {
    if (this.prezentationFiles.length < 1){
      this.prezentationFiles.push(...event.addedFiles);
    }else{
      for (let i = 1; i < this.prezentationFiles.length; i++) {
        this.prezentationFiles.splice(i, 1);
      }
    }
    if (this.prezentationFiles.length >= 2)
      this.onSelectSingleImage(event);

    this.presentationFilesData = this.prezentationFiles;
  }


  onRemovePresentationImage(event : any) {
    this.prezentationFiles.splice(this.prezentationFiles.indexOf(event), 1);
  }

  onSelect(event : any) {
    if (this.files.length < 3)
      this.files.push(...event.addedFiles);
    else{
      for (let i = 3; i < this.files.length; i++) {
        this.files.splice(i, 1);
      }
    }
    if (this.files.length >= 4)
      this.onSelect(event);

  }

  addSize() {
    const sizes = this.myform.get('sizes') as FormArray; // Get the sizes form array
    sizes.push(this.formBuilder.group({
      size: ['', Validators.required],
      quantity: ['', Validators.required]
    }));
  }

  onRemove(event : any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  closePopup() {
    this.dialog.close();
  }

  async updateProduct() {
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
    console.log(product);
    this.productService.updateProduct(this.productId, product).subscribe(httpResponse => {
      console.log(httpResponse);
      this.closePopup();
    });
  }

  ngOnInit(): void {
    this.productService.getProduct(this.data.productId).subscribe(Data => {
      this.product = Data;
      this.productId = this.product.id;
      this.myform.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        presentationImage: this.product.presentationImage,
        category: this.product.category,
        subcategory: this.product.subcategory,
        brand: this.product.brand
      });

    });
    this.productService.getProductSizes(this.data.productId).subscribe(Data => {
      this.product = Data;
      for (const data of this.product) {
        this.sizesData.push(this.formBuilder.group({
          size: data.size,
          quantity: data.quantity
        }));
      }
      this.myform.patchValue({
        sizes: this.product.productSizes
      })});
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

  removeSize(index: number) {
    this.sizesData.removeAt(index);
  }
}
