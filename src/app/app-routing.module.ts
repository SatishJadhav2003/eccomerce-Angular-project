import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

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
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
