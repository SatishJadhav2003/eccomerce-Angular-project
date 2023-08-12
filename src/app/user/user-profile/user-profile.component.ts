import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user:User;
  constructor(private userService: UserService) {
    this.userService.getUserInfo().subscribe((res) => {
      this.user = res;
      console.log('value fetched', res);
    });
  }
}
