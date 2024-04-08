import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  ngOnInit() {

  }
  constructor() {
  }

}
