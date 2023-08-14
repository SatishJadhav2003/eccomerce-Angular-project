import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { MobileViewNavbarComponent } from './navbar/mobile-view-navbar/mobile-view-navbar.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';
import { SubcategoriesComponent } from './main-categories/subcategories/subcategories.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SampleProductsComponent } from './home/sample-products/sample-products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { BrandsComponent } from './products/brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ShoppingCartComponent } from './order/shopping-cart/shopping-cart.component';
import { GreenSnackbarComponent } from './shared/snackbar/green-snackbar.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { OrderConfirmedComponent } from './order/order-confirmed/order-confirmed.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MyOrdersComponent } from './user/user-profile/my-orders/my-orders.component';
import { PersonalInfoComponent } from './user/user-profile/personal-info/personal-info.component';
import { LoginSecurityComponent } from './user/user-profile/login-security/login-security.component';
import { AddressComponent } from './user/user-profile/address/address.component';
import { WishlistComponent } from './user/user-profile/wishlist/wishlist.component';
import { RatingReviewsComponent } from './user/user-profile/rating-reviews/rating-reviews.component';
import { SubNavbarComponent } from './navbar/sub-navbar/sub-navbar.component';
import { AuthInterceptor } from './authentication/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HomeBannerComponent,
    MobileViewNavbarComponent,
    MainCategoriesComponent,
    SubcategoriesComponent,
    SampleProductsComponent,
    ProductsListComponent,
    BrandsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    GreenSnackbarComponent,
    SignUpComponent,
    LoginComponent,
    CheckoutComponent,
    DialogComponent,
    OrderConfirmedComponent,
    UserProfileComponent,
    MyOrdersComponent,
    PersonalInfoComponent,
    LoginSecurityComponent,
    AddressComponent,
    WishlistComponent,
    RatingReviewsComponent,
    SubNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
