import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./site-page/home-page/home-page.component";
import {DashboardHomeComponent} from "./dashboard/dashboard-home/dashboard-home.component";
import {DashboardProductsComponent} from "./dashboard/dashboard-products/dashboard-products.component";
import {FootwearComponent} from "./site-page/footwear/footwear.component";
import {ProductDisplayComponent} from "./site-page/product-display/product-display.component";
import {UserSignInComponent} from "./user-actions/user-sign-in/user-sign-in.component";
import {UserRegisterComponent} from "./user-actions/user-register/user-register.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'footwear', component: FootwearComponent},
  { path: 'dashboard/home', component: DashboardHomeComponent},
  { path: 'dashboard/product', component: DashboardProductsComponent },
  { path: 'footwear/product/:id', component: ProductDisplayComponent },
  { path: 'sign-in', component: UserSignInComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
