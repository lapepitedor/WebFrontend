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
      name: [profil.name, [Validators.required, Validators.minLength(4)]],
      email: [profil.email, [Validators.required, Validators.email]],
      password: [profil.password, [Validators.required]],
      role: [profil.role, [Validators.required]],
      tel: [profil.tel, [Validators.required]],
      gender: [profil.gender, [Validators.required]],
      country: [profil.country, [Validators.required]],
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
    const data = this.updateForm.getRawValue();
     this.dialogRef.close({data:data, id: this.profil.id});
  }

  

  onCancel(): void {
    this.dialogRef.close();
  }

  
}
