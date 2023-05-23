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
import { FruitsComponent } from './sample-products/fruits/fruits.component';
import { FashionComponent } from './sample-products/fashion/fashion.component';
import { MobileViewNavbarComponent } from './navbar/mobile-view-navbar/mobile-view-navbar.component';
import { ElectronicsComponent } from './sample-products/electronics/electronics.component';
import { BooksComponent } from './sample-products/books/books.component';
import { SportsComponent } from './sample-products/sports/sports.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SideNavComponent,
    HomeBannerComponent,
    FruitsComponent,
    FashionComponent,
    MobileViewNavbarComponent,
    ElectronicsComponent,
    BooksComponent,
    SportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
