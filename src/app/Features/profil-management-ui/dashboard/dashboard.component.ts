import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/Features/model/Profil';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserRole } from '../../model/UserRole';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  description = 'Dashboard';

  profil: Profil;

  constructor(public authService: AuthentificationService) {}
  // ngOnInit(): void {
  //   if (this.authService.current_profil !== null) {
  //     this.description = `Welcome ${this.authService.current_profil.name}`;
  //   } else return;
  // }
  ngOnInit(): void {
    this.profil = this.authService.current_profil;
  }

  isFormValid() {
    return (
      this.profil.name &&
      this.profil.email &&
      this.profil.tel &&
      this.profil.gender &&
      this.profil.country
    );
  }

  // showDialogToEdit() {
  //   this.user = { ...this.authService.active_user };

  // }

  // editUser() {
  //   this.authService.active_user = { ...this.user };
  //   this.isEditDialogVisible = false;
  //   // Ajoutez ici la logique pour afficher un message de succès
  // }
}
