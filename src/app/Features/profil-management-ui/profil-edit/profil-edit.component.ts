import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Features/model/user';
import { UserService } from 'src/app/shared/user.service';
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

  user: User = {
    id: '0',
    name: '',
    email: '',
    password: '',
    role: UserRole.Admin,
    tel: '',
    gender: 'male',
    country: '',
  };

  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.formEdit = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id == 0) {
      this.user = new User('', '', '', '', UserRole.Admin, '', 'male', '');
    } else {
    
      this.userService.getById(id).then((user) => {
        this.user = user;      
        this.formEdit.setValue({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          country: this.user.country,
          tel: this.user.tel,

          role: this.user.role,
          gender: this.user.gender,
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    if (this.user) {
      this.user.name = this.formEdit.controls['name'].value;
      this.user.email = this.formEdit.controls['email'].value;
      this.user.password = this.formEdit.controls['password'].value;
      this.user.tel = this.formEdit.controls['tel'].value;
      this.user.role = this.formEdit.controls['role'].value;
      this.user.gender = this.formEdit.controls['gender'].value;
      this.user.country = this.formEdit.controls['country'].value;

     

      this.userService.save(this.user);
      this.router.navigate(['/profile']);
    }
    // if (this.formEdit.valid) {
    //   console.warn(this.formEdit.value);
    // }
    //  this.router.navigate(['/profile']);
  }
}
