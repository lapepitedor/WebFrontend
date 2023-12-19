import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css'],
})
export class ProfilEditComponent implements OnInit {
  hide = true;
  formEdit: FormGroup;
  obj: Profil = null;

  //profil: Profil = new Profil();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfilService,
    @Inject(MAT_DIALOG_DATA) public data: Profil
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
    let id = this.route.snapshot.params['id'];
    console.log(id);

    if (id == '0') {
      this.obj = new Profil('0', '', '', '', UserRole.Admin, 'female', '', '');
    } else {
     
      
      // this.service.getById(id).then((obj) => {
      //   this.obj = obj;
      //   this.formEdit.setValue({
      //     name: this.formEdit.value.name,
      //     email: this.formEdit.value.email,
      //     password: this.formEdit.value.password,
      //     tel: this.formEdit.value.tel,
      //     role: this.formEdit.value.role,
      //     gender: this.formEdit.value.gender,
      //     country: this.formEdit.value.country,

      //     //   "name": this.obj.Name,
      //     //   "email": this.obj.Email,
      //     //   "password": this.obj.Password,
      //     //   "tel": this.obj.Tel,
      //     //   "role": this.obj.Role,
      //     //  "gender": this.obj.Gender,
      //     //   "country": this.obj.Country,
      //   });
      // });
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

    // let data = {
    //   Name: this.formEdit.controls['name'].value,
    //   Email: this.formEdit.controls['email'].value,
    //   Gender: this.formEdit.controls['gender'].value,
    //   Country: this.formEdit.controls['country'].value,
    //   Password: this.formEdit.controls['password'].value,
    //   Tel: this.formEdit.controls['tel'].value,
    //   Role: this.formEdit.controls['role'].value,
    // };
    // this.service.saveProfil(data);
    // //  this.formEdit.reset();
    this.router.navigate(['/profile']);
  }
}
