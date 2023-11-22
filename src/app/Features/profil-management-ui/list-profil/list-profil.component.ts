import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Features/model/user';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource } from '@angular/material/table';

import { UserRole } from '../../model/UserRole';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css'],
})
export class ListProfilComponent implements OnInit {
  obj: User | null = null;
  displayedColumns: string[] = [
    'index',
    'Full Name',
    'Email',
    'Password',
    'Birth Date',
    'Address',
    'gender',
    'Role',
    ,
    /* Ajoutez les noms des colonnes supplémentaires ici */ 'actions',
  ];

  dataSource : MatTableDataSource<User> = new MatTableDataSource<User>();

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
    this.loadData();
    this.service.changed.subscribe(() => {
      console.log('Changements détectés !');
      this.loadData();
    });
  }

  loadData() {
    this.service
      .getAll()
      .then((users) => {
        console.log('Données des utilisateurs récupérées :', users);
        this.users = users;
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des données :', error); // Vérifiez s'il y a des erreurs lors du chargement des données
      });
  }

  onNewProfil(): void {
    this.router.navigate(['/newProfil']);
    //this.dialog.open(create-profil.component);
  }
  //

  deleteUser() {
    // if (this.authservice.isAdmin()) {
    //   const index = this.users.findIndex((person) => person.id === id);
    //   if (index !== -1) {
    //     this.users.splice(index, 1);
    //   }
    // }
  }

  onEditUser(user: User) {
    this.router.navigate(['profile', user.id]);
    console.log(user.id);
  }
}
