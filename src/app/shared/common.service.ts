import { Injectable } from '@angular/core';
import { Category } from './models/models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  mobile: boolean = false;
  tempCategory: Category[];
  currCateChanged = new Subject<Category>();
  categories = new Subject<Category[]>();

  temp: Category;

  constructor(private http: HttpClient) {
  }

  // getting all categories and their component from server
  getCategoriesFromServer() {
    return this.http
      .get<Category[]>('http://localhost:3000/categories')
      .subscribe((res: any) => {
        console.log(res);
        this.tempCategory = res;
        this.categories.next(res);
        return res;
      });
  }
  // Getting category
  getCategory() {
    return this.categories;
  }

  // Getting categories by id
  getCategoriesByIndex(id: string) {
    this.http
      .get<Category[]>('http://localhost:3000/categories/'+id)
      .subscribe((res: any) => {
        this.currCateChanged.next(res);
        console.log(res);
        return this.temp;
      });

  }
}
