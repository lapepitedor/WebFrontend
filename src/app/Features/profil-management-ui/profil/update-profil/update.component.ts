import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/shared/profil.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profil } from 'src/app/Features/model/Profil';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  updateForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private service: ProfilService,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public profil: Profil
  ) {
    this.updateForm = this.fb.group({
      name: [profil.Name, [Validators.required, Validators.minLength(4)]],
      email: [profil.Email, [Validators.required, Validators.email]],
      password: [profil.Password, [Validators.required]],
      role: [profil.Role, [Validators.required]],
      tel: [profil.Tel, [Validators.required]],
      gender: [profil.Gender, [Validators.required]],
      country: [profil.Country, [Validators.required]],
    });
  }

  get name(): AbstractControl | null {
    return this.updateForm.get('name');
  }
  get email(): AbstractControl | null {
    return this.updateForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.updateForm.get('password');
  }
  get role(): AbstractControl | null {
    return this.updateForm.get('role');
  }
  get tel(): AbstractControl | null {
    return this.updateForm.get('tel');
  }
  get gender(): AbstractControl | null {
    return this.updateForm.get('gender');
  }

  get country(): AbstractControl | null {
    return this.updateForm.get('country');
  }

  onSubmit() {
     this.dialogRef.close(this.profil);
  }

  

  onCancel(): void {
    this.dialogRef.close();
  }

  
}
