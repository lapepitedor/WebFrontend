import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/authentification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    private service: AuthentificationService,
    private router: Router
  ) {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
