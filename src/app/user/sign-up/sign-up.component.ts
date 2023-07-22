import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmedValidator } from '../confirm-password.validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup= new FormGroup({});

  constructor(public fb: FormBuilder,private userService:UserService,private router:Router) {
    this.signUpForm = fb.group(
      {
        name: ['satish', Validators.required],
        email: ['satish@gmail.com', [Validators.required,Validators.email]],
        mobile: ['8390613529', [Validators.required]],
        address: ['nashik', Validators.required],
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
      id:null,
      name:form.value.name,
      email:form.value.email,
      mobile:form.value.mobile,
      address:form.value.address,
      password:form.value.password,
    }
    this.userService.signUp(userData);
    this.signUpForm.reset();
    this.router.navigate(['/user/login']);
  }
}
