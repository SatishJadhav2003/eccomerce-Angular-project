import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GreenSnackbarComponent } from '../snackbar/green-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { }

  greenSnackBar(message: string,action:string,icon:string) {
    this.snackBar.openFromComponent(GreenSnackbarComponent, {
      data:{
        message:message,
        action:action,
        icon:icon,
        snackbar:this.snackBar
      },
      duration:2000,
      panelClass: 'success-snackbar',
    });
  }

  redSnackBar(message: string,action:string,icon:string) {
    this.snackBar.openFromComponent(GreenSnackbarComponent, {
      data:{
        message:message,
        action:action,
        icon:icon,
        snackbar:this.snackBar
      },
      duration:5000,
      panelClass: 'error-snackbar',
    });
  }
}
