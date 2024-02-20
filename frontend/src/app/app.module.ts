import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../UserActions/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from '../UserActions/register/register.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bars/general-nav-bar/nav-bar.component';
import { DashboardNavBarComponent } from './nav-bars/dashboard-nav-bar/dashboard-nav-bar.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from './dashboard/dashboard-products/dashboard-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    NavBarComponent,
    DashboardNavBarComponent,
    DashboardHomeComponent,
    DashboardProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButton
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
