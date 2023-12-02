import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/Features/model/Profil';
import { ProfilService } from 'src/app/shared/profil.service';
import { UserRole } from '../../model/UserRole';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css'],
})
export class ProfilEditComponent implements OnInit {
  hide = true;
  id: string = '';
  formEdit: FormGroup;
  obj: Profil = null;

  //profil: Profil = new Profil();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfilService
  ) {
    this.formEdit = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }
  get name(): AbstractControl | null {
    return this.formEdit.get('name');
  }
  get email(): AbstractControl | null {
    return this.formEdit.get('email');
  }
  get password(): AbstractControl | null {
    return this.formEdit.get('password');
  }
  get role(): AbstractControl | null {
    return this.formEdit.get('role');
  }
  get tel(): AbstractControl | null {
    return this.formEdit.get('tel');
  }
  get gender(): AbstractControl | null {
    return this.formEdit.get('gender');
  }

  get country(): AbstractControl | null {
    return this.formEdit.get('country');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id == '0') {
      this.obj = new Profil('0', '', '', '', UserRole.Admin, 'female', '', '');
    } else {
      this.service.getById(this.id).then((obj) => {
        this.obj = obj;
        this.formEdit.setValue({
          Name: this.formEdit.value.name,
          Email: this.formEdit.value.email,
          Password: this.formEdit.value.password,
          Tel: this.formEdit.value.tel,
          Role: this.formEdit.value.role,
          Gender: this.formEdit.value.gender,
          Country: this.formEdit.value.country,
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    if (!this.formEdit.valid) {
      console.log('Formulaire invalide:', this.formEdit);
      return;
    }
    this.obj.Name = this.formEdit.controls['name'].value;
    this.obj.Email = this.formEdit.controls['email'].value;
    this.obj.Password = this.formEdit.controls['password'].value;
    this.obj.Tel = this.formEdit.controls['tel'].value;
    this.obj.Role = this.formEdit.controls['role'].value;
    this.obj.Gender = this.formEdit.controls['gender'].value;
    this.obj.Country = this.formEdit.controls['country'].value;
    this.service.saveProfil(this.obj);
    this.router.navigate(['/profile']);
  }
}
