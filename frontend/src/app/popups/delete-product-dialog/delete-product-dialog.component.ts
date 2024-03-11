import {Component, Inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent, MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-delete-product-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCheckbox,
    FormsModule,
    MatDialogClose,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.scss'
})
export class DeleteProductDialogComponent {
  skipConfirmation: boolean =  false;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {}

    deleteProduct(): void {
        console.log('Deleting product...');
        console.log(this.data.productId);
        if (this.data.productId) {
            this.productService.deleteProduct(this.data.productId).subscribe({
                next: () => {
                    console.log('Product deleted successfully');
                    this.dialogRef.close(true);
                },
                error: (error) => {
                    console.error('Error deleting product:', error);
                }
            });
        } else {
            console.error('No productId found in data.');
        }
    }


}
