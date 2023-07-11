import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css'],
})
export class ProfilEditComponent {
  dateToday = new Date();
  dateValue = new Date();
  isEditDialogVisible = false;
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
  ) {}

  isFormValid() {
    return (
      this.user.name &&
      this.user.email &&
      this.user.birthDate &&
      this.user.city &&
      this.user.country
    );
  }

  editUser() {} 

  onCancel() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    this.router.navigate(['/profile']);
  }
}
