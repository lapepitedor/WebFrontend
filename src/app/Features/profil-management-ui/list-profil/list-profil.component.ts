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
import { DeleteProfilComponent } from '../profil/delete-profil/delete-profil.component';
import { UpdateComponent } from '../profil/update-profil/update.component';

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
  profilList: Profil[];
  dataSource: MatTableDataSource<Profil>;
  user = new Profil('0', '', '', '', UserRole.Admin, 'female', '', '');

  profil: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProfilService,
    public authservice: AuthentificationService
  ) {}


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // this.service.getAll().subscribe((data: any[]) => {
    //   console.log('Données récupérées depuis le service :', data);
    //   console.log('Données récupérées depuis le service :', data['id']);

    //   this.profilListe = data.map((item) => item.data); // Assurez-vous que la structure des données correspond à votre modèle Profil
    //   this.dataSource = new MatTableDataSource<Profil>(this.profilListe);
    // });
    // this.service.getProfiles().subscribe((data) => {
    //   console.log('Données récupérées depuis le service :', data);
    //      console.log('Données récupérées depuis le service :', data['id']);
    //   const profils = data.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...(e.payload.doc.data() as Profil),
    //     } as Profil;
    //   });
    this.service.getProfiles().then((data) => {
      
      this.profilList = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.profilList);
    });

  }

  addProfil() {
    this.router.navigate(['/newProfil']);
  }

  OpenEditDialog(profil:Profil):void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '250px',
     data: { data: profil },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Logique de mise à jour de l'utilisateur
         this.service.updateProfil(result).then(() => {
           this.loadData();
           // Recharger les utilisateurs après la suppression
         });
      }
    });
  }

  openDeleteDialog(id: string) { 
    const dialogRef = this.dialog.open(DeleteProfilComponent, {
      width: '250px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteProfil(result).then(() => {
          this.loadData(); // Recharger les utilisateurs après la suppression
        });
      }
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



  confirmDelete(id) {
    this.service.deleteProfil(id);
  }
}
