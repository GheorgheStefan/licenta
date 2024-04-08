import {Component, OnInit} from '@angular/core';
import {GeneralNavBarComponent} from "../../nav-bars/general-nav-bar/general-nav-bar.component";


@Component({
  selector: 'app-home-page',
  standalone: true,

  templateUrl: './home-page.component.html',
  imports: [
    GeneralNavBarComponent
  ],
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    console.log("localStorage",localStorage);
    console.log("sessionStorage",sessionStorage);
  }

}
