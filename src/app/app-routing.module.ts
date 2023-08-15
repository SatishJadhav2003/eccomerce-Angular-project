import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ShoppingCartComponent } from './order/shopping-cart/shopping-cart.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { OrderConfirmedComponent } from './order/order-confirmed/order-confirmed.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MyOrdersComponent } from './user/user-profile/my-orders/my-orders.component';
import { PersonalInfoComponent } from './user/user-profile/personal-info/personal-info.component';
import { LoginSecurityComponent } from './user/user-profile/login-security/login-security.component';
import { AddressComponent } from './user/user-profile/address/address.component';
import { WishlistComponent } from './user/user-profile/wishlist/wishlist.component';
import { RatingReviewsComponent } from './user/user-profile/rating-reviews/rating-reviews.component';
import { AuthGuard } from './authentication/auth.guard';
import { SearchComponent } from './search/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main-categories/:id', component: MainCategoriesComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: ':category/:subcategory',
        component: ProductsComponent,
      },
    ],
  },
  {
    path: 'product',
    component: ProductDetailsComponent,
    children: [
      { path: ':id', component: ProductDetailsComponent },
      {
        path: ':category/:subcategory/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'signup', component: SignUpComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path:'profile', component:UserProfileComponent, canActivate: [AuthGuard],
        children:[
          {
            path:'my-orders',component:MyOrdersComponent
           },
           {
            path:'personal-info',component:PersonalInfoComponent
           },
           {
            path:'login-security',component:LoginSecurityComponent
           },
           {
            path:'my-address',component:AddressComponent
           },
           {
            path:"my-wishlist",component:WishlistComponent
           },
           {
            path:'rating-reviews',component:RatingReviewsComponent
           }
        ]
      },

    ],
  },
  { path: 'cart', component: ShoppingCartComponent,canActivate: [AuthGuard] },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  { path: 'checkout/:id', component: CheckoutComponent,canActivate: [AuthGuard], },
  { path: 'order-confirmed', component: OrderConfirmedComponent,canActivate: [AuthGuard], },
  {path:'search/:searchquery',component:SearchComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
