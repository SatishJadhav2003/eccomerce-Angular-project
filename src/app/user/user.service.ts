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
  user: User;

  constructor(public http: HttpClient) {}

  // get User Information
  getUserInfo(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.userApi + 'user', { headers });
  }

  // Updating user values
  updateUserInfo(data: any): Observable<User> {
    const headers = this.getHeaders();
    return this.http.patch<User>(this.userApi + 'user', data, { headers });
  }

  // Deliting user account
  deleteUser():Observable<any>
  {
    const headers = this.getHeaders();
    return this.http.delete(this.userApi +'user/delete',{headers});
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

  // get all orders of user
  getAllOrders(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.userApi + 'orders', { headers });
  }

  // add product to wishlist
  addToWishList(product_id: string): Observable<{ product_id: string }> {
    const headers = this.getHeaders();
    const data = {
      product_id: product_id,
    };
    return this.http.post<{ product_id: string }>(
      this.userApi + 'wishlist',
      data,
      { headers }
    );
  }

  // Get wishlist products of user
  getWishlist(): Observable<[{ product_id: string }]> {
    const headers = this.getHeaders();
    return this.http.get<[{ product_id: string }]>(this.userApi + 'wishlist', {
      headers,
    });
  }

  // Search product in wishlist
  searchWishlistProduct(id: string): Observable<{ product_id: string }> {
    const headers = this.getHeaders();
    return this.http.get<{ product_id: string }>(
      this.userApi + 'wishlist/' + id,
      { headers }
    );
  }

  // delete product from wishlist
  deleteWishlistProduct(id: string):Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.userApi + 'wishlist/'+ id, { headers });
  }

  // Logic to create header with jwt token which we will send with api request to verify user
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `${token}`,
    });
  }
}
