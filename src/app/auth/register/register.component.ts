import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { passwordvalidator } from '../password-validator';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title = 'Create your account';
  userInfo: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'agent',
    birthDate: new Date(),
    city: '',
    country: '',
  };
  dateToday = new Date();
  registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  firebaseConfig = {
    apiKey: 'AIzaSyDdhMKX4heggWO60XZD5uxfm6Mj8CZcXJY',
    authDomain: 'profilemanagementapp.firebaseapp.com',
    projectId: 'profilemanagementapp',
    storageBucket: 'profilemanagementapp.appspot.com',
    messagingSenderId: '208753980826',
    appId: '1:208753980826:web:95cde68a41a30117c8b623',
  };
 /* */
  onSubmit(registerForm: NgForm) {
    if (!this.registerForm.valid) {
      console.log('register');
    }
    this.userInfo.name = this.registerForm.controls['name'].value;
    this.userInfo.email = this.registerForm.controls['email'].value;
    this.userInfo.password = this.registerForm.controls['password'].value;
    this.userInfo.birthDate = this.registerForm.controls['birthDate'].value;
    this.userInfo.role = this.registerForm.controls['role'].value;
    this.userInfo.city = this.registerForm.controls['city'].value;
    this.userInfo.country = this.registerForm.controls['country'].value;
    this.userservice.save(this.userInfo);
    console.log(registerForm.value);
    this.router.navigate(['/login']);
  }
  onCancel() {
    this.router.navigate(['/login']);
  }
}
