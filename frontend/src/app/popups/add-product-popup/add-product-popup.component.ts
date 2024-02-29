import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Observable, ReplaySubject} from "rxjs";
import { NgxDropzoneModule} from 'ngx-dropzone';
import {NgForOf, NgIf} from "@angular/common";

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
  srcResult: any;
  presentationImage: any;
  files: File[] = [];
  filesData: File[] = [];
  prezentationFiles: File[] = [];
  images : ImageData[] = [];
  myform = this.formBuilder.group({
    name: this.formBuilder.control(''),
    price: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    presentationImage: this.formBuilder.control(''),
    selectedImages: this.formBuilder.control(''),
  });

  async addProduct() {
    await this.populateImages(this.files);
    this.onFileSelected(this.prezentationFiles[0])

    //sol provizorie
    // await new Promise(f => setTimeout(f, 5000));

    let product = {
      ...this.myform.value,
      presentationImage: this.presentationImage,
      selectedImages: JSON.stringify(this.images)
    };
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
  }

  convertFileToBase64(file: File) : Observable<string>{
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      result.next(btoa((event.target?.result) as string));
      result.complete();
    }
    return result.asObservable();
  }
  populateImages( files: File[]){
    let image : any = {};
    for(let i = 0; i <files.length; i++){
      image = this.convertFileToBase64(files[i]);
      image.subscribe({
        next: (buffer: string[]) => {
          this.images.push({imageUrl: buffer, imageType: files[i].type});
          this.update();
        }

      });
      this.update();
    }
    return this.images;
  }
  update(){
    console.log(this.images);
  }


  onSelect(event : any) {
    this.files.push(...event.addedFiles);
    this.filesData = this.files;
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
}
