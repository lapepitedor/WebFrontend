import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Features/model/user';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserService } from 'src/app/shared/user.service';
import { MatTableDataSource } from '@angular/material/table';

import { UserRole } from '../../model/UserRole';
import { MatDialog } from '@angular/material/dialog';
import { ProfilEditComponent } from '../profil-edit/profil-edit.component';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css'],
})
export class ListProfilComponent implements OnInit {
  obj: User | null = null;
  displayedColumns: string[] = [
    'index',
    'name',
    'email',
    'password',
    'tel',
    'country',
    'role',
    'gender',
    'actions',
  ];
  profilListe: User[];
  dataSource: any;

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

  users: User[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: UserService,
    public authservice: AuthentificationService
  ) {
    //this.loadProfilList();
  }
  
  openAddEditProfil() {
    this.dialog.open(ProfilEditComponent);
}

  async loadProfilList() {
    try {
      const res = await this.service.getAll();
      if (res && res.length > 0) {
        // Vérifiez s'il y a des utilisateurs récupérés
        if (!this.profilListe) {
          // Si profilListe est vide, initialisez-le avec les données récupérées
          this.profilListe = res;
        } else {
          // Sinon, ajoutez les utilisateurs récupérés à la liste existante
          res.forEach((user) => {
            // Vérifiez si l'utilisateur existe déjà dans la liste avant de l'ajouter
            const existingUser = this.profilListe.find((u) => u.id === user.id);
            if (!existingUser) {
              this.profilListe.push(user);
            }
          });
        }
        this.dataSource = new MatTableDataSource<User>(this.profilListe);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des profils :', error);
    }
  }

  ngOnInit(): void {
    //   this.loadData();
    this.loadProfilList();
    this.service.changed.subscribe(() => {
      console.log('Changements détectés !');
      this.loadProfilList();
   //   this.loadData();
    });
  }

  // loadData() {
  //   this.service
  //     .getAll()
  //     .then((users) => {
  //       console.log('Données des utilisateurs récupérées :', users);
  //       this.users = users;
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors du chargement des données :', error); // Vérifiez s'il y a des erreurs lors du chargement des données
  //     });
  // }

  onNewProfil(): void {
    this.router.navigate(['/newProfil']);
  }
  //

  deleteUser(id: string) {
    //this.service.deleteUser()
  }

  onEditUser(user: User) {
    this.router.navigate(['profile', user.id]);
    console.log(user.id);
  }
}
