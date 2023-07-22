import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-green-snackbar',
  templateUrl: './green-snackbar.component.html',
  styleUrls: ['./green-snackbar.component.css'],
})
export class GreenSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  closeSnackbar() {
    this.data.snackbar.dismiss();
  }
}
