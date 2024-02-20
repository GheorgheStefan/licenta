import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor() {}
  openDialog() {
    // Implementează logica pentru deschiderea ferestrei modale aici
  }

}
