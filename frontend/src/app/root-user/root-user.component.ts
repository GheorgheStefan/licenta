import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {GeneralNavBarComponent} from "../nav-bars/general-nav-bar/general-nav-bar.component";

@Component({
  selector: 'app-root-user',
  standalone: true,
  imports: [
    RouterOutlet,
    GeneralNavBarComponent
  ],
  templateUrl: './root-user.component.html',
  styleUrl: './root-user.component.scss'
})
export class RootUserComponent {

}
