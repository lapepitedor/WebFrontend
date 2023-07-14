import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css'],
  // styleUrls: ['../list-profil/list-profil.css']
})
export class ListProfilComponent implements OnInit {
  obj: User | null = null;

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
  dateToday = new Date();
  dateValue = new Date();

  users: User[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UserService,
    public authservice: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.users = this.service.getAll();
    this.service.changed.subscribe(() => {
      this.users = this.service.getAll();
    });
  }

  onNewProfil(): void {
    this.router.navigate(['profile', this.user.id]);
  }

  deleteUser(id: number) {
    if (this.authservice.isAdmin()) {
      const index = this.users.findIndex((person) => person.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }
  }
 
  
  onEditUser(user: User) {
    this.router.navigate(['profile', user.id]);
    console.log(user.id);
  }
  
}
