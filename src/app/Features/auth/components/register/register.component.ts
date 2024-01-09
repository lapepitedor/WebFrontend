import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { ProfilService} from 'src/app/shared/profil.service';
import {Profil } from 'src/app/Features/model/Profil';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { UserRole } from 'src/app/Features/model/UserRole';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = true;
  
  constructor(
    private router: Router,
    private service: ProfilService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }
  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }
  get role(): AbstractControl | null {
    return this.registerForm.get('role');
  }
  get tel(): AbstractControl | null {
    return this.registerForm.get('tel');
  }
  get gender(): AbstractControl | null {
    return this.registerForm.get('gender');
  }

  get country(): AbstractControl | null {
    return this.registerForm.get('country');
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    
    if (!this.registerForm.valid){
      console.log('Error');
      return;
    } else {
      console.log(this.registerForm.value);
      this.service.saveProfil(this.registerForm.value);
      this.registerForm.reset();
      this.router.navigate(['/login']);
      this.snackBar.open('Profil successful registred !', 'Close',
        {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
