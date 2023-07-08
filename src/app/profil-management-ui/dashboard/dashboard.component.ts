import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/shared/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  description = 'Dashboard';
  isEditDialogVisible = false;
  dateToday = new Date();
  user: User = new User(0, '', '', '', 'user', new Date(), '', '');

  constructor(public authService: AuthentificationService) {}
  ngOnInit(): void {
    if (this.authService.active_user !== null) {
      this.description = `Welcome ${this.authService.active_user.name}`;
    } else return;
  }

  dateChanged(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.user.birthDate = new Date(val);
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

  showDialogToEdit() {
    this.user = { ...this.authService.active_user };
    this.isEditDialogVisible = true;
  }

  editUser() {
    this.authService.active_user = { ...this.user };
    this.isEditDialogVisible = false;
    // Ajoutez ici la logique pour afficher un message de succès
  }
}
