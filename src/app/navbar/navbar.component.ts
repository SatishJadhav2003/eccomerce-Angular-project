import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../user/user.model';
import { ProductService } from '../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchText:string='';
  searchResults: any[] = [];
  user:User;
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
