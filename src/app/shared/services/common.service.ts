import { Injectable } from '@angular/core';
import { Category, Subcategory } from '../models/models';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  mobile: boolean = false;
  currCateChanged = new Subject<Category>();
  categories = new Subject<Category[]>();
  category: Category[];
  temp: Category;
  api: string = 'http://localhost:3001/categories';

  // new backend
  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // getting all categories and their component from server
  getCategoriesFromServer() {
    return this.http.get<Category[]>(this.api).subscribe((res: any) => {
      console.log('From service', res);
      this.categories.next(res);
      this.category = res;
      return res;
    });
  }

  

  // Getting categories by id
  getCategoriesByIndex(id: string) {
    this.http.get<Category[]>(this.api + '/' + id).subscribe((res: any) => {
      this.currCateChanged.next(res);
      console.log('From service', res);
      return this.temp;
    });
  }

  //getting Subcategories by category name
  getSubcategories(cateName: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.api + '/name/' + cateName);
  }
}
