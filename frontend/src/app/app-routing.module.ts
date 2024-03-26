import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../UserActions/login/login.component";
import {RegisterComponent} from "../UserActions/register/register.component";
import {HomePageComponent} from "./site-page/home-page/home-page.component";
import {DashboardHomeComponent} from "./dashboard/dashboard-home/dashboard-home.component";
import {DashboardProductsComponent} from "./dashboard/dashboard-products/dashboard-products.component";
import {FootwearComponent} from "./site-page/footwear/footwear.component";
import {ProductDisplayComponent} from "./site-page/product-display/product-display.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'login/register', component: RegisterComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'footwear', component: FootwearComponent},
  { path: 'dashboard/home', component: DashboardHomeComponent},
  { path: 'dashboard/product', component: DashboardProductsComponent },
  { path: 'footwear/product/:id', component: ProductDisplayComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
