import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

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
    private snackbar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo('2').subscribe((res) => {
      this.user = res;
      this.userInfoForm.patchValue(res);
      console.log('value fetched', res);
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
        .updateUserInfo(this.user.id, this.userInfoForm.value)
        .subscribe(
          (res) => {
            console.log('updated success', res);
            this.snackbar.greenSnackBar('Profile Updated', 'ok', 'done');
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
