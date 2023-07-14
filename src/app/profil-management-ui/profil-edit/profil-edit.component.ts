import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css'],
})
export class ProfilEditComponent implements OnInit {
  dateToday = new Date();
  dateValue = new Date();
  obj: User | null = null;
  formEdit: FormGroup = new FormGroup({});
  
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'user',
    birthDate: new Date(),
    city: '',
    country: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    let id = this.route.snapshot.params['id'];

    if (id == 0) {
      this.obj = new User(0, '', '', '', 'agent', new Date(), '', '');
    } else {
      this.obj = this.userService.getById(id);
    }

    if (this.obj) {
      this.formEdit = new FormGroup({
        name: new FormControl(this.obj.name, [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl(this.obj.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(this.obj.password, [Validators.required]),
        role: new FormControl(this.obj.role, [Validators.required]),
        birthDate: new FormControl(this.obj.birthDate, [Validators.required]),
        city: new FormControl(this.obj.city, [Validators.required]),
        country: new FormControl(this.obj.country, [Validators.required]),
      });
    } else {
      this.formEdit = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(''),
        birthDate: new FormControl(new Date()),
        city: new FormControl(''),
        country: new FormControl(''),
      });
    }

    /* if (this.obj) {
      this.formEdit.setValue({
        name: this.obj.name,
        email: this.obj.email,
        password: this.obj.password,
        role: this.obj.role,
        birthDate: this.obj.birthDate,
        city: this.obj.city,
        country: this.obj.country,
      });
    }*/
  }
  ngOnInit(): void {}

  onCancel() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    if (this.obj) {
      this.obj.name = this.formEdit.controls['name'].value;
      this.obj.email = this.formEdit.controls['email'].value;
      this.obj.password = this.formEdit.controls['password'].value;
      this.obj.birthDate = this.formEdit.controls['birthDate'].value;
      this.obj.role = this.formEdit.controls['role'].value;
      this.obj.city = this.formEdit.controls['city'].value;
      this.obj.country = this.formEdit.controls['country'].value;
      this.userService.save(this.obj);
      this.router.navigate(['/profile']);
    }
  }
}
