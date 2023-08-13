import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-security',
  templateUrl: './login-security.component.html',
  styleUrls: ['./login-security.component.css'],
})
export class LoginSecurityComponent {
  password: string = '';
  email: string = '';
  isEditingEmail: boolean = false;
  isEditingPassword: boolean = false;

  constructor(private dialog: MatDialog,private router:Router,private snackbar:SnackBarService,private authService:AuthService,private userService:UserService) {
    const user = JSON.parse(localStorage.getItem('userData'));
    this.email = user.email;
  }
  editEmail() {
    this.isEditingEmail = true;
  }
  editPassword() {
    this.isEditingPassword = true;
  }

  onCancle() {
    this.isEditingEmail = false;
    this.isEditingPassword = false;
  }

  deleteAccount() {
    this.dialog
      .open(DialogComponent, {
        width: '600px',
        data: {
          heading: 'Delete Account !',
          msg: 'Are you sure ? You want to delete your account',
          action: 'Delete',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.userService.deleteUser().subscribe((user)=>{
            console.log(user);
            localStorage.removeItem('token') ;
            localStorage.removeItem('userData') ;
            this.snackbar.redSnackBar("Account Deleted !!",'ok','delete_forever');
            this.authService.isLoggedIn = false;
            this.router.navigateByUrl('/home');
          });
        }
      });
  }

  updateEmail()
  {
    const data={
      email:this.email
    }
    this.userService.updateUserInfo(data).subscribe((res)=>{
      console.log(res)
      this.snackbar.greenSnackBar('Email updated','ok','done');
    },err=>{
      console.log(err);
    });
    this.isEditingEmail = false;
  }
}
