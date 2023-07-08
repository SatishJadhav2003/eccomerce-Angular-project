import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = new Subject<Product[]>();
  productfound = new Subject<number>();

  api = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  //Getting products based on category id


  getProductsBasedOnSubcategory(subCategory: string): Observable<Product[]> {
    return this.http
      .get<any>(`${this.api}?category_id=${subCategory}`);
  }

  //get Product by id
  getProductById(id: string):Observable<Product> {
  return  this.http.get<any>(`${this.api}/${id}`);
  }

  // to get random 5 products from server
  getRelatedProducts(subCategory_id: string): Observable<any[]> {
    return this.http.get<any>(`${this.api}?category_id=${subCategory_id}`).pipe(
      map((products) => {
        // Shuffle the array randomly
        const shuffled = products.sort(() => 0.5 - Math.random());
        // Return the first 'count' products
        return shuffled.slice(0, 5);
      })
    );
  }
}
