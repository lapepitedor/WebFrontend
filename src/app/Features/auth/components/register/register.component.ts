import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserService } from 'src/app/shared/user.service';

import { User } from 'src/app/Features/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { UserRole } from 'src/app/Features/model/UserRole';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title = 'Create your account';

  dateToday = new Date();
  // registerForm: FormGroup;
  userInfo: User = {
    id: '0',
    name: '',
    email: '',
    password: '',
    role: UserRole.Admin,
    birthDate: new Date(),
    gender: 'male',
    address: '',
  };
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthentificationService,
    private service: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    role: new FormControl(null),
    password: new FormControl(null, [Validators.required]),
    genderOptions: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    if (!this.registerForm.valid) {
      console.log('Error');
      return;
    } else {
      console.log(this.registerForm.value);
    }
    this.userInfo.name = this.registerForm.value.name;
    this.userInfo.email = this.registerForm.value.email;
    this.userInfo.password = this.registerForm.value.password;
    this.userInfo.birthDate = this.registerForm.value.birthDate;
    this.userInfo.role = this.registerForm.value.role;
    this.userInfo.gender = this.registerForm.value.genderOptions;
    this.userInfo.address = this.registerForm.value.address;
    console.log(this.userInfo);
    this.authservice.register(this.userInfo);

    this.router.navigate(['/login']);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
