import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { Observable, Subject, map } from 'rxjs';
import { CartProducts, Order } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = new Subject<Product[]>();
  productfound = new Subject<number>();
  cartProducts: CartProducts[];
  productOrdered: any;

  api = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  //Getting products based on category id

  getProductsBasedOnSubcategory(subCategory: string): Observable<Product[]> {
    return this.http.get<any>(`${this.api}?category_id=${subCategory}`);
  }

  //get Product by id
  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.api}/${id}`);
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

  //Cart section

  //Get cart products
  getCartProducts(): Observable<CartProducts[]> {
    return this.http
      .get<CartProducts[]>('http://localhost:3000/cartProducts')
      .pipe(
        map((res) => {
          this.cartProducts = res;
          return res;
        })
      );
  }

  //Update cart
  updateCart(product: CartProducts): Observable<CartProducts> {
    //patch method use to update specific value
    return this.http.patch<CartProducts>(
      `http://localhost:3000/cartProducts/${product.id}`,
      product
    );
  }

  // Adding to cart
  addToCart(product: CartProducts): Observable<CartProducts> {
    return this.http.post<CartProducts>(
      'http://localhost:3000/cartProducts',
      product
    );
  }

  // delete product
  deleteCartProduct(product_id: string): Observable<CartProducts> {
    return this.http.delete<CartProducts>(
      `http://localhost:3000/cartProducts/${product_id}`
    );
  }

  // Order products
  orderProducts(products: any): Observable<any> {
    return this.http.post('http://localhost:3000/orders', products);
  }


  getAllOrders(user_id:string):Observable<Order[]>
  {
    return this.http.get<Order[]>(`http://localhost:3000/orders?user_id=${user_id}`);
  }
}
