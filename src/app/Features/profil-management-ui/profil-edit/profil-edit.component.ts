import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Features/model/user';
import { UserService } from 'src/app/shared/user.service';
import { UserRole } from '../../model/UserRole';



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
    id: '0',
    name: '',
    email: '',
    password: '',
    role: UserRole.Admin,
    birthDate: new Date(),
    gender: 'male',
    address: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    let id = this.route.snapshot.params['id'];

    if (id == 0) {
      this.obj = new User('0', '', '', '', UserRole.Admin, new Date(), 'male', '');
    }
    else {
      this.obj = this.userService.getById(id);
    }
  
      this.formEdit = new FormGroup({
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
        ]),
        
        role: new FormControl("", [Validators.required]),
        birthDate: new FormControl("", [Validators.required]),
        gender: new FormControl("", [Validators.required]),
        address: new FormControl("", [Validators.required]),
      });
        
  }
  ngOnInit(): void {}

  onCancel() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    if (this.user) {
      this.user.name = this.formEdit.controls['name'].value;
      this.user.email = this.formEdit.controls['email'].value;
     this.user.password = this.formEdit.controls['password'].value;
      this.user.birthDate = this.formEdit.controls['birthDate'].value;
      this.user.role = this.formEdit.controls['role'].value;
      this.user.gender = this.formEdit.controls['gender'].value;
      this.user.address = this.formEdit.controls['address'].value;
      this.userService.save(this.obj);
      this.router.navigate(['/profile']);
    }
  }
}
