import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { ProfilService} from 'src/app/shared/profil.service';
import {Profil } from 'src/app/Features/model/Profil';
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

  
  // registerForm: FormGroup;
  userInfo = new Profil('0', '', '', '', UserRole.Admin, 'female', '', '');
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthentificationService,
    private service: ProfilService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    tel: new FormControl(null, [Validators.required]),
    country: new FormControl(null),
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
    this.userInfo.tel = this.registerForm.value.tel;
    this.userInfo.role = this.registerForm.value.role;
    this.userInfo.gender = this.registerForm.value.genderOptions;
    this.userInfo.country = this.registerForm.value.country;
    console.log(this.userInfo);
    this.authservice.register(this.userInfo);

    this.router.navigate(['/login']);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
