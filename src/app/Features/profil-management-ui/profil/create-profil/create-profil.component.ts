import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profil } from 'src/app/Features/model/Profil';
import { UserRole } from 'src/app/Features/model/UserRole';
import { ProfilService } from 'src/app/shared/profil.service';


@Component({
  selector: 'app-create-profil',
  templateUrl: './create-profil.component.html',
  styleUrls: ['./create-profil.component.css'],
})
export class CreateProfilComponent {
  hide = true;
  dateToday = new Date();
 // userInfo = new Profil();
   
 
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private service: ProfilService) {}

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
    // if (!this.profilForm.valid) {
    //   console.log(this.profilForm);
    //   return;
    // } else {
    //   console.log(this.profilForm.value);
    // }
    // this.userInfo.Name = this.profilForm.value.name;
    // this.userInfo.Email = this.profilForm.value.email;
    // this.userInfo.Password = this.profilForm.value.password;
    // this.userInfo.Tel = this.profilForm.value.tel;
    // this.userInfo.Role = this.profilForm.value.role;
    // this.userInfo.Gender = this.profilForm.value.genderOptions;
    // this.userInfo.Country = this.profilForm.value.country;
    // console.log(this.userInfo);
    // this.service.saveProfil(this.userInfo);

    this.router.navigate(['/profile']);
  }
  onCancel() {
    this.router.navigate(['/profile']);
  }
}
