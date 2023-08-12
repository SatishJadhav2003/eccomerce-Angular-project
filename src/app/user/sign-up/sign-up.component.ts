import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirm-password.validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup = new FormGroup({});

  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbar: SnackBarService,
    private authService:AuthService
  ) {
    this.signUpForm = fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        // it checks whether passwords are same or not
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );

    // this.signUpForm = new FormGroup({
    //   name: new FormControl('satish', Validators['required']),
    //   email: new FormControl('satish@gmail.com', Validators['required']),
    //   mobile: new FormControl('8390613529', Validators['required']),
    //   address: new FormControl('nashik', Validators['required']),
    //   password: new FormControl('', Validators['required']),
    //   confirmPassword: new FormControl('', Validators['required']),
    // });
  }

  ngOnInit() {}

  onSubmit(form: FormGroup) {
    const userData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.signUp(userData).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.greenSnackBar('Account created', 'ok', 'done');
        this.signUpForm.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.error(err);
        this.snackbar.redSnackBar(err.error, 'ok', 'error');
      }
    );
  }
}
