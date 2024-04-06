import {Component, HostListener} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-general-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  cartDropdownVisible: boolean = false;
  userDropdownVisible: boolean = false;

  constructor() { }
  toggleDropdownUser(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the <a> tag
    event.stopPropagation(); // Oprim propagarea evenimentului în sus
    this.userDropdownVisible = !this.userDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onPageClick(event: MouseEvent): void {
    const isCartDropdownVisible = this.cartDropdownVisible && !this.isClickedInside(event, 'cartDropdown');
    const isUserDropdownVisible = this.userDropdownVisible && !this.isClickedInside(event, 'userDropdown');

    if (isCartDropdownVisible || isUserDropdownVisible) {
      if (isCartDropdownVisible) {
        console.log('tot apar');
        this.cartDropdownVisible = false;
      }
      if (isUserDropdownVisible) {
        this.userDropdownVisible = false;
      }
    }
  }
  private isClickedInside(event: MouseEvent, dropdownId: string): boolean {
    const targetElement = event.target as HTMLElement;
    return !!targetElement.closest(`#${dropdownId}`);
  }

  toggleDropdownCart(event: Event) {
    console.log('toggleDropdownCart');
    event.preventDefault(); // Prevent the default behavior of the <a> tag
    event.stopPropagation(); // Oprim propagarea evenimentului în sus

    this.cartDropdownVisible = !this.cartDropdownVisible;
    console.log('cartDropdownVisible: ', this.cartDropdownVisible);
  }
}
