import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private userService:UserService){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators['required'],Validators['email']]),
      password: new FormControl('', Validators['required']),
    });
  }
  onLogin(user: any) {
    console.table(user.value);
    const crediantial ={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.userService.login(crediantial);
    this.loginForm.reset();
  }
}
