import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomePageComponent } from './site-page/home-page/home-page.component';
import { NavBarComponent } from './nav-bars/general-nav-bar/nav-bar.component';
import { DashboardNavBarComponent } from './nav-bars/dashboard-nav-bar/dashboard-nav-bar.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from './dashboard/dashboard-products/dashboard-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgxPaginationModule} from "ngx-pagination";
import {FootwearComponent} from "./site-page/footwear/footwear.component";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TruncateNamePipe} from "./nav-bars/truncate-name.pipe";



@NgModule({
  declarations: [
    AppComponent,
    TruncateNamePipe,
    HomePageComponent,
    NavBarComponent,
    DashboardNavBarComponent,
    DashboardHomeComponent,
    DashboardProductsComponent,
    FootwearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    FormsModule,
    NgxPaginationModule,
    MdbDropdownModule,
    AlertModule.forRoot(),
    BsDropdownModule
  ],
  providers: [],
  exports: [
    NavBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
