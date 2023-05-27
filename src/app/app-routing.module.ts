import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-categories/1', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'main-categories/:id', component: MainCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
