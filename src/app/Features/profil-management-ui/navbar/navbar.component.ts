import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private service: AuthentificationService, private router:Router) {}
  logout() {
    this.service.logout();
  }
  onDashboardClick() {
    this.router.navigate(['/dashboard']);
  }
  onPeopleListClick() {
    this.router.navigate(['/list-profil']);
  }
}
