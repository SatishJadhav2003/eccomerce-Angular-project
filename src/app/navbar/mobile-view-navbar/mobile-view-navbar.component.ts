import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-mobile-view-navbar',
  templateUrl: './mobile-view-navbar.component.html',
  styleUrls: ['./mobile-view-navbar.component.css']
})
export class MobileViewNavbarComponent {
  user:User;
  searchText:string='';
  top()
  {
    window.scrollTo(0,0);
  }
  constructor(private authService:AuthService,private router:Router){
    if (this.authService.isLoggedIn) {
      this.user = JSON.parse(localStorage.getItem('userData'));
    }
    this.authService.user.subscribe((res)=>{
      this.user = res;
      console.log(res);
    })
  }
  searchProducts()
  {
    this.router.navigateByUrl('/search/'+this.searchText);
    this.searchText = '';

  }

  logOut()
  {
    this.authService.logOut();
  }
}
