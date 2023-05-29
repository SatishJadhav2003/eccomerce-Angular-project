import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { SideNavComponent } from './navbar/side-nav/side-nav.component';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { MobileViewNavbarComponent } from './navbar/mobile-view-navbar/mobile-view-navbar.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';
import { SubcategoriesComponent } from './main-categories/subcategories/subcategories.component';
import { HttpClientModule } from '@angular/common/http';
import { SampleProductsComponent } from './home/sample-products/sample-products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { BrandsComponent } from './products/brands/brands.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SideNavComponent,
    HomeBannerComponent,
    MobileViewNavbarComponent,
    MainCategoriesComponent,
    SubcategoriesComponent,
    SampleProductsComponent,
    ProductsListComponent,
    BrandsComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
