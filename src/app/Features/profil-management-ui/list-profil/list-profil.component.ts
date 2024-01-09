import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {Profil  } from 'src/app/Features/model/Profil';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { ProfilService } from 'src/app/shared/profil.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserRole } from '../../model/UserRole';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfilComponent } from '../profil/delete-profil/delete-profil.component';
import { UpdateComponent } from '../profil/update-profil/update.component';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css'],
})
export class ListProfilComponent implements OnInit {
  obj: Profil | null = null;
  filteredList:Profil[] = [];
  
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
    public authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    
    this.loadData();
  }

  loadData() {
   
    this.service.getProfiles().subscribe((data: any[]) => {
      this.profilList = data;
      
      this.dataSource = new MatTableDataSource(this.profilList);
    });
  }

  addProfil() {
    this.router.navigate(['/newProfil']);
  }


  OpenEditDialog(profil: Profil): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: profil,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       
        this.service.updateProfil(result).then(() => {
          this.loadData();
          
        });
      }
    });
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteProfilComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteProfil(result).then(() => {
          this.loadData(); 
        });
      }
    });
  }

}
