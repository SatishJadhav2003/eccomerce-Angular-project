import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchTerm:String='';
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
