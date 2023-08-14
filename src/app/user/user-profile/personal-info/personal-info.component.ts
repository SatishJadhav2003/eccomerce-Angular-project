import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent {
  user: User;

  userInfoForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: SnackBarService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((res) => {
      this.user = res;
      this.userInfoForm.patchValue(res);
    });

    this.userInfoForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }, Validators.required],
      mobile: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.userInfoForm.enable();
    } else {
      this.userInfoForm.disable();
    }
  }

  onSubmit(): void {
    if (this.userInfoForm.valid) {
      console.log(this.userInfoForm.value);
      this.isEditing = false;
      this.userInfoForm.disable();
      this.userService
        .updateUserInfo( this.userInfoForm.value)
        .subscribe(
          (res) => {
            console.log('updated success', res);
            this.snackbar.greenSnackBar('Profile Updated', 'ok', 'done');
            localStorage.setItem('userData', JSON.stringify(res));
            this.authService.user.next(res);
          },
          (err) => {
            console.error(err);
            this.snackbar.redSnackBar('Something went wrong', 'ok', 'cancel');
          }
        );
    }
  }

  onCancle() {
    this.isEditing = false;
    this.userInfoForm.disable();
  }
}
