import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../shared/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApi: string = 'http://localhost:3000/user';

  constructor(public http: HttpClient, private snackbar: SnackBarService) {}

  signUp(user: any) {
    this.http.post<any>(this.userApi, user).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.greenSnackBar('Account created', 'ok', 'done');
      },
      (err) => {
        console.log(err);
        this.snackbar.redSnackBar('Something went wrong', 'ok', 'cancel');
      }
    );
  }

  //Login functionality
  login(loginCredential: any) {
    this.http.get<any>(this.userApi).subscribe((res) => {
      const user = res.find((a: any) => {
        return (
          a.email === loginCredential.email &&
          a.password === loginCredential.password
        );
      });
      if (user) {
        this.snackbar.greenSnackBar('Login successfull', 'ok', 'done');
      } else {
        this.snackbar.redSnackBar('User not found', 'ok', 'cancel');
      }
    });
  }
}
