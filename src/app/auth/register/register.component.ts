import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserService } from 'src/app/shared/user.service';
import { passwordvalidator } from '../password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title = 'Create your account';
  dateToday = new Date();
  registerForm: FormGroup;
  constructor(
    private authservice: AuthentificationService,
    private userservice: UserService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthdate: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      repeatPassword: new FormControl(null, ),
      registerCheck: new FormControl(null, [Validators.required]),
    },
    {
      validators: passwordvalidator
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Perform registration logic here
      console.log('Registration form submitted');
      console.log(this.registerForm.value);
    } else {
      // Handle invalid form submission
      console.log('Invalid form submission');
    }
  }
}
