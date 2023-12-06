import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {Profil  } from 'src/app/Features/model/Profil';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { ProfilService } from 'src/app/shared/profil.service';
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
  obj: Profil | null = null;
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
  profilListe: Profil[];
  dataSource: any;

  user = new Profil('0', '', '', '', UserRole.Admin, 'female', '', '');

  profil: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProfilService,
    public authservice: AuthentificationService
  ) {}

  openAddEditProfil() {
    this.dialog.open(ProfilEditComponent);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe((data: any[]) => {
      console.log('Données récupérées depuis le service :', data);
      console.log('Données récupérées depuis le service :', data["id"]);

      data.forEach((item) => {
        console.log('ID du document :', item.id); // Accès à l'ID du document
        console.log('Données du document :', item.data); // Accès aux données du document
      });
      
      this.profilListe = data.map((item) => item.data); // Assurez-vous que la structure des données correspond à votre modèle Profil
      this.dataSource = new MatTableDataSource<Profil>(this.profilListe);
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

  delete(id) {
    let message = confirm('Are you sure you want to delete');
    if (message == true) {
      if (id) {
         console.log('ID à supprimer : ', id);
        this.service
          .getById(id)
          .then((profil) => {
            // Action à effectuer après la suppression réussie
            console.log('User details:', profil);
             this.confirmDelete(profil);
          })
          .catch((error) => {
            // Gérer l'erreur ici si nécessaire
            console.error(
              "Erreur lors de la suppression de l'utilisateur :",
              error
            );
          });
      } else {
        console.error('Profile or profile ID is undefined/null');
      }
    }
  }

  confirmDelete(profil: Profil) {
    let message = confirm(`Are you sure you want to delete ${profil.Name}?`);
    if (message === true) {
      this.service.deleteProfil(profil.id)
        .then(() => {
          console.log('User deleted successfully');
          // Actions après suppression réussie
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          // Gérer l'erreur si nécessaire
        });
    }
  }

  
}
