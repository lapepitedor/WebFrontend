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
    
        this.service
          .deleteProfil(id)
          .then(() => {
            // Action à effectuer après la suppression réussie
            console.log('Utilisateur supprimé avec succès');
          })
          .catch((error) => {
            // Gérer l'erreur ici si nécessaire
            console.error(
              "Erreur lors de la suppression de l'utilisateur :",
              error
            );
          });
      } else { console.error('Profile or profile ID is undefined/null');}
      
  
    }
   
  }

  onEditUser(user: Profil) {
    this.router.navigate(['profile']);
    // console.log(user.id);
  }
}
