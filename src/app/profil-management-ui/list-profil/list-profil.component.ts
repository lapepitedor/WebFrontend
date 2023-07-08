import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css'],
  // styleUrls: ['../list-profil/list-profil.css']
})
export class ListProfilComponent {
  dateToday = new Date();
  dateValue = new Date();
  isEditDialogVisible = false;
  user: User = {
    id:0,
    name: '',
    email: '',
    password: '',
    role: 'user',
    birthDate: new Date(),
    city: '',
    country: '',
  };

  users: User[] = [];
  constructor(
    private route: Router,
    private service: UserService,
    public authservice: AuthentificationService
  ) {
    this.users = this.service.getAll();
    this.service.changed.subscribe(() => {
      this.users = this.service.getAll();
    });
  }

  isFormValid() {
    return (
      this.user.name &&
      this.user.email &&
      this.user.birthDate &&
      this.user.city &&
      this.user.country
    );
  }

  ShowDialogToAdd() {
    this.route.navigate(['profile', 0]);
  }

  editUser() {}

  DeleteUser(id: number) {
    const index = this.users.findIndex((person) => person.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
