import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/authentification.service';
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
  object: User | null = null;
  dateToday = new Date();
  registerForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router
  ) {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        birthDate: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required]),
        role: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        repeatPassword: new FormControl(null),
        registerCheck: new FormControl(null, [Validators.required]),
      },
      {
        validators: passwordvalidator,
      }
    );
  }

  onRegister() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.object) {
      this.object.name = this.registerForm.controls['name'].value;

      this.object.email = this.registerForm.controls['email'].value;
      this.object.password = this.registerForm.controls['password'].value;
      this.object.birthDate = this.registerForm.controls['birthDate'].value;
      this.object.role = this.registerForm.controls['role'].value;
      this.object.city = this.registerForm.controls['city'].value;
      this.object.country = this.registerForm.controls['country'].value;
      this.userservice.save(this.object);
      this.router.navigate(['/login']);
      console.log(this.registerForm);
      console.log('OK');
    }
  }
  onSubmit(registerForm: NgForm) {
  
    if (this.object) {
      this.object.name = registerForm.controls['name'].value;

      this.object.email = registerForm.controls['email'].value;
      this.object.password = registerForm.controls['password'].value;
      this.object.birthDate =registerForm.controls['birthDate'].value;
      this.object.role = registerForm.controls['role'].value;
      this.object.city = registerForm.controls['city'].value;
      this.object.country = registerForm.controls['country'].value;
      this.userservice.save(this.object);
      this.router.navigate(['/login']);
      console.log('OK');
      
    }
    
    
  }
  onCancel() {
    this.router.navigate(["/login"]);
  }
}
