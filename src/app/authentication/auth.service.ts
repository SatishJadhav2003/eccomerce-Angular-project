import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: Boolean = false;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }
  api = 'http://localhost:3001/';


  // Login Function
  login(email: String, password: String): Observable<any> {
    const body = { email, password };
    return this.http.post(this.api + 'user/login', body);
  }

  // Sign Up function
  signUp(user: any):Observable<any> {
    return this.http.post<any>(this.api + 'user/signup', user);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
