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
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardUsersComponent} from "./dashboard/dashboard-users/dashboard-users.component";
import {DashboardOrdersComponent} from "./dashboard/dashboard-orders/dashboard-orders.component";
import {AccountActivationComponent} from "./user-actions/account-activation/account-activation.component";
import {ResetPasswordComponent} from "./user-actions/reset-password/reset-password.component";
import {DashboardUserComponent} from "./dashboard/dashboard-user/dashboard-user.component";
import {UserInformationComponent} from "./root-user/user-information/user-information.component";
import {UserOrdersComponent} from "./root-user/user-orders/user-orders.component";
import {RootDeliveryComponent} from "./root-delivery/root-delivery.component";
import {AdministrationPageComponent} from "./root-delivery/administration-page/administration-page.component";

export const routes: Routes = [

  { path: 'sign-in', component: UserSignInComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'activate/:token', component: AccountActivationComponent},
  { path: 'reset-password/:id', component: ResetPasswordComponent},

  {path:"", component: RootUserComponent,children: [
      { path: 'home', component: HomePageComponent},
      { path: 'footwear', component: FootwearComponent },
      { path: 'footwear/product/:id', component: ProductComponent },
      { path: 'user/address/:id', component: AddressComponent },
      { path: 'user/info/:id', component: UserInformationComponent },
      { path: 'user/orders/:id', component: UserOrdersComponent },
    ]},
  {path:"delivery", component: RootDeliveryComponent, children:[
      {path: 'home', component: AdministrationPageComponent},
    ]},
  {path: "dashboard", component: DashboardComponent, children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'product', component: DashboardProductsComponent },
      { path: 'users', component:DashboardUsersComponent},
      { path: 'orders', component:DashboardOrdersComponent},
      { path: 'user', component:DashboardUserComponent},

    ]}
];
