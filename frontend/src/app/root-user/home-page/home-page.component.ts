import {Component, OnInit} from '@angular/core';
import {GeneralNavBarComponent} from "../../nav-bars/general-nav-bar/general-nav-bar.component";
import {NgForOf} from "@angular/common";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {HomePageService} from "./home-page.service";
import {NextDirective} from "./directives/next.directive";
import {PrevDirective} from "./directives/prev.directive";
import {RouterLink} from "@angular/router";



@Component({
  selector: 'app-home-page',
  standalone: true,

  templateUrl: './home-page.component.html',
  imports: [
    GeneralNavBarComponent,
    NgForOf,
    NgbCarousel,
    NgbSlide,
    NextDirective,
    PrevDirective,
    RouterLink
  ],
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  presentationImages = [
    {image:"https://storage.googleapis.com/licenta-gheorghe-stefan/img1.jpeg", title: "Express", description: "Made with love"},
    {image:"https://storage.googleapis.com/licenta-gheorghe-stefan/img2.jpeg", title: "Your", description: "Made to be used"},
    {image:"https://storage.googleapis.com/licenta-gheorghe-stefan/img3.jpeg", title: "Real", description: "Made to be loved"},
    {image:"https://storage.googleapis.com/licenta-gheorghe-stefan/img4.jpeg", title: "You", description: "Made for you"},];

  recommendedProducts: any = [];
  presentationProducts: any = [];

  constructor(private homePageService:HomePageService) {}

  fetchData() {
    this.homePageService.getRecommendedProducts().subscribe(
      (data) => {
        this.recommendedProducts = data;
        console.log("Astea boss");
        console.log(this.recommendedProducts);
      }
    );
    this.homePageService.getPresentationProducts().subscribe(
      (data) => {
        this.presentationProducts = data; //new arrivals
        console.log("Astea boss v2");
        console.log(this.presentationProducts);
      }
    );
  }
  ngOnInit(): void {
    this.fetchData();
  }


}
