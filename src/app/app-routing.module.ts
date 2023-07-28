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
    ],
  },
  { path: 'cart', component: ShoppingCartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'order-confirmed', component: OrderConfirmedComponent },
  { path: '**', redirectTo: '/order-confirmed', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
