import {Routes} from "@angular/router";
import {DashboardHomeComponent} from "./dashboard/dashboard-home/dashboard-home.component";
import {DashboardProductsComponent} from "./dashboard/dashboard-products/dashboard-products.component";
import {UserSignInComponent} from "./user-actions/user-sign-in/user-sign-in.component";
import {UserRegisterComponent} from "./user-actions/user-register/user-register.component";
import {RootUserComponent} from "./root-user/root-user.component";
import {HomePageComponent} from "./root-user/home-page/home-page.component";
import {FootwearComponent} from "./root-user/footwear/footwear.component";
import {ProductComponent} from "./root-user/product/product.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {AddressComponent} from "./root-user/address/address.component";

export const routes: Routes = [

  { path: 'dashboard/home', component: DashboardHomeComponent},
  { path: 'dashboard/product', component: DashboardProductsComponent },
  { path: 'sign-in', component: UserSignInComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'checkout', component: CheckoutComponent },



  {path:"", component: RootUserComponent, children: [
      { path: 'home', component: HomePageComponent},
      { path: 'footwear', component: FootwearComponent },
      { path: 'footwear/product/:id', component: ProductComponent },
      { path: 'user/address', component: AddressComponent },
    ]}




];
