import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = new Subject<Product[]>();
  productfound = new Subject<number>();

  api = 'https://backend-for-ecommerce-uywp.onrender.com/products';
  constructor(private http: HttpClient) {}

  //Getting products based on category id
  getProductsBasedOnSubcategory(subCategory: string): Observable<Product[]> {
    return this.http.get<any>(this.api + '/' + subCategory);
  }

  //get Product by id
  getProductById(id: string): Observable<Product> {
    return this.http.get<any>('https://backend-for-ecommerce-uywp.onrender.com/product/' + id);
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

  // Searching products
  searchProducts(query: string): Observable<any[]> {
    const url = 'https://backend-for-ecommerce-uywp.onrender.com/product/search/';
    return this.http.get<any[]>(url + query);
  }

  // rating products
  rateProduct(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post('https://backend-for-ecommerce-uywp.onrender.com/product/review',data,{headers});
  }

  // search user with review of product
  searchReview(id:string):Observable<any>
  {
    const headers = this.getHeaders();
    return this.http.get('https://backend-for-ecommerce-uywp.onrender.com/product/review/'+id,{headers});
  }

  // Creating headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `${token}`,
    });
  }
}
