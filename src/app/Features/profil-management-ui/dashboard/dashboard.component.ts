import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Features/model/user';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserRole } from '../../model/UserRole';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  description = 'Dashboard';
 
  user: User = new User(
    '0',
    '',
    '',
    '',
    UserRole.Admin,
    null,
    'male',
    ''
  );

  constructor(public authService: AuthentificationService) {}
  ngOnInit(): void {
    if (this.authService.active_user !== null) {
      this.description = `Welcome ${this.authService.active_user.name}`;
    } else return;
  }


  isFormValid() {
    return (
      this.user.name &&
      this.user.email &&
      this.user.tel &&
      this.user.gender &&
      this.user.country
    );
  }

  showDialogToEdit() {
    this.user = { ...this.authService.active_user };
    
  }

  editUser() {
    this.authService.active_user = { ...this.user };
    
    // Ajoutez ici la logique pour afficher un message de succès
  }
}
