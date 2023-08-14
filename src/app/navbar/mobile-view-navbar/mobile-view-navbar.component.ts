import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-mobile-view-navbar',
  templateUrl: './mobile-view-navbar.component.html',
  styleUrls: ['./mobile-view-navbar.component.css']
})
export class MobileViewNavbarComponent {
  user:User;

  top()
  {
    window.scrollTo(0,0);
  }
  constructor(private authService:AuthService){
    if (this.authService.isLoggedIn) {
      this.user = JSON.parse(localStorage.getItem('userData'));
    }
    this.authService.user.subscribe((res)=>{
      this.user = res;
      console.log(res);
    })
  }

  logOut()
  {
    this.authService.logOut();
  }
}
