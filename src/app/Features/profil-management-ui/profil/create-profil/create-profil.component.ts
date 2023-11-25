import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Features/model/user';
import { UserRole } from 'src/app/Features/model/UserRole';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-create-profil',
  templateUrl: './create-profil.component.html',
  styleUrls: ['./create-profil.component.css'],
})
export class CreateProfilComponent {
  hide = true;
  dateToday = new Date();
  userInfo: User = {
    id: '0',
    name: '',
    email: '',
    password: '',
    role: UserRole.Admin,
    tel: '',
    gender: 'male',
    country: '',
  };
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private service: UserService) {}

  profilForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    genderOptions: new FormControl(null, [Validators.required]),
  });

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if (!this.profilForm.valid) {
      console.log(this.profilForm);
      return;
    } else {
      console.log(this.profilForm.value);
    }
    this.userInfo.name = this.profilForm.value.name;
    this.userInfo.email = this.profilForm.value.email;
    this.userInfo.password = this.profilForm.value.password;
    this.userInfo.tel = this.profilForm.value.tel;
    this.userInfo.role = this.profilForm.value.role;
    this.userInfo.gender = this.profilForm.value.genderOptions;
    this.userInfo.country = this.profilForm.value.country;
    console.log(this.userInfo);
    this.service.save(this.userInfo);

    this.router.navigate(['/profile']);
  }
  onCancel() {
    this.router.navigate(['/profile']);
  }
}
