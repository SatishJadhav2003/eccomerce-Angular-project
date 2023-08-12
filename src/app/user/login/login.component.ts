import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  returnUrl:string;

  spinner: boolean = false;
  constructor(
    private snackbar: SnackBarService,
    private authService:AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) {
    // get url from where user redirected to login page
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators['required'], Validators['email']]),
      password: new FormControl('', [Validators['required'],Validators.minLength(4)]),
    });
  }
  onLogin() {
    this.spinner = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res) => {
          console.log(res);
          // Storing user token and information to local storage
          localStorage.setItem('token', res.token);
          localStorage.setItem('userData', JSON.stringify(res.user));

          console.log(localStorage.getItem('token'));
          console.log(localStorage.getItem('userData'));

          this.snackbar.greenSnackBar('Login successfull', 'ok', 'done');
          this.loginForm.reset();
          this.spinner = false;
          this.authService.isLoggedIn = true;
          // redirecticting from where user comes in login page
          this.router.navigateByUrl(this.returnUrl);
        },
        (error: any) => {
          this.snackbar.redSnackBar(error.error, 'ok', 'error');
          console.error('Login error:', error);
          this.spinner = false;
        }
      );
  }
}
