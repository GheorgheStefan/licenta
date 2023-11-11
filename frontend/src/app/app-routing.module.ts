import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../UserActions/login/login.component";
import {RegisterComponent} from "../UserActions/register/register.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'login/register', component: RegisterComponent},
  {path: 'home', component: HomePageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
