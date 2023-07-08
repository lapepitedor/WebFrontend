import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/shared/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  is_logged_in: boolean;

  constructor(private service: AuthentificationService) {
    this.is_logged_in = this.service.isLogginIn;
    this.service.changed.subscribe(() => {
      this.is_logged_in = this.service.isLogginIn;
    });
  }
}
