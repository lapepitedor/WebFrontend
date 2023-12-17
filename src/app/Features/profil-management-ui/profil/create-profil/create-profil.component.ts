import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  addForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private service: ProfilService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
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
    return this.addForm.get('name');
  }
  get email(): AbstractControl | null {
    return this.addForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.addForm.get('password');
  }
  get role(): AbstractControl | null {
    return this.addForm.get('role');
  }
  get tel(): AbstractControl | null {
    return this.addForm.get('tel');
  }
  get gender(): AbstractControl | null {
    return this.addForm.get('gender');
  }

  get country(): AbstractControl | null {
    return this.addForm.get('country');
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
     console.log(
       'Valeurs du formulaire avant réinitialisation:',
       this.addForm.value
     );
     if (this.addForm.valid) {
       this.service.saveProfil(this.addForm.value);
         console.log(this.addForm.value);
         this.addForm.reset();
         // Handle successful creation here
         
         this.router.navigate(['/list-profil']);
       
     }
  
  }
  onCancel() {
    this.router.navigate(['/list-profil']);
  }
}
