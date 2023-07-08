import { Component } from '@angular/core';
import { AuthentificationService } from '../shared/authentification.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private service: AuthentificationService, private router: Router) {
  
     this.service.logout();
     this.router.navigate(['/login']);
  }
  
 
}
