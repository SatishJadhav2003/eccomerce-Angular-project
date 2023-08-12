import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { Observable, Subject, map } from 'rxjs';
import { User } from './user.model';
import { CartProducts, Order } from '../shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApi: string = 'http://localhost:3001/';
  cartProducts: CartProducts[] = [];
  productOrdered: any;
  user:User;

  constructor(public http: HttpClient) {}

  // get User Information
  getUserInfo(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.userApi + 'user', { headers });
  }

  // Updating user values
  updateUserInfo(data: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.patch<User>(this.userApi + 'user', data, { headers });
  }
  //Cart section

  //Get cart products
  getCartProducts(): Observable<CartProducts[]> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get<CartProducts[]>(this.userApi + 'getCartProducts', {
      headers,
    });
  }

  //Update cart
  updateCart(product: any): Observable<any> {
    const headers = this.getHeaders();
    //patch method use to update specific value
    return this.http.post<any>(this.userApi + 'updateCartProducts', product, {
      headers,
    });
  }

  // Adding to cart
  addToCart(product: CartProducts): Observable<CartProducts> {
    const headers = this.getHeaders();
    return this.http.post<CartProducts>(
      this.userApi + 'updateCartProducts',
      product,
      { headers }
    );
  }

  // search product present in cart or not
  searchCartProduct(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.userApi + 'searchCartProduct/' + id, { headers });
  }

  // delete product
  deleteCartProduct(product_id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(this.userApi + 'cartProducts/' + product_id, {
      headers,
    });
  }

  // Order products
  orderProducts(products: any): Observable<any> {
    return this.http.post(this.userApi + 'orders', products);
  }

  getAllOrders(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.userApi + 'orders', { headers });
  }

  // addToWishList(id: string, product_id: string): Observable<User> {
  //   return this.http.patch<User>(this.userApi + '/' + id, product_id);
  // }

  // Logic to create header with jwt token which we will send with api request to verify user
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `${token}`,
    });
  }
}
