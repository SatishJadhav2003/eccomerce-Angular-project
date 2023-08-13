import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  isMobile:boolean = false;
  username:string;
  constructor() {
    if(window.innerWidth < 850)
    {
    this.isMobile = true;
    }
    const user = JSON.parse(localStorage.getItem('userData'));
    this.username = user.name;
  }
}
