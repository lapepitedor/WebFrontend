import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/shared/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {


  constructor(private service: AuthentificationService) {
   
  }
  logout() {
    this.service.logout();
  }
}
