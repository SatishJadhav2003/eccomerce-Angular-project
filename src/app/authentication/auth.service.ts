import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { SnackBarService } from '../shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: Boolean = false;
  user = new Subject<User>
  constructor(private http: HttpClient,private router:Router,private snackbar:SnackBarService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }
  api = 'https://backend-for-ecommerce-uywp.onrender.com/';


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

  logOut()
  {
    this.isLoggedIn = false;
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.snackbar.redSnackBar("Logged  Out",'ok','exit_to_app');
    this.user.next(null);
    this.router.navigateByUrl('/home')
  }
}
