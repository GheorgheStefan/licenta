import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent {

  openAddProductForm() {

  }

  showAddProductModal: boolean = false;

  showAddProductForm() {
    this.showAddProductModal = true;
  }

  closeModal() {
    this.showAddProductModal = false;
  }

  addProduct() {
    // Implementează logica pentru adăugarea produsului aici
    // După adăugare, închide fereastra modală
    this.closeModal();
  }
}
