import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = new Subject<Product[]>();
  productfound = new Subject<number>();
  cuuProduct = new Subject<Product>();

  api = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  //Getting all products
  getProducts() {
    this.http.get<Product[]>(`${this.api}`).subscribe((res) => {
      this.products.next(res.sort((a, b) => b.rating - a.rating));
    });
  }


  //Getting products based on category id
  getProductsBasedOnSubcategory(subCategory: string) {
    this.http
      .get<any>(`${this.api}?category_id=${subCategory}`)
      .subscribe((res) => {
        this.products.next(res.sort((a, b) => b.rating - a.rating));
      });
  }

  //get Product by id
  getProductById(id:string)
  {
    this.http
      .get<any>(`${this.api}/${id}`)
      .subscribe((res) => {
        this.cuuProduct.next(res);
      });
  }
}
