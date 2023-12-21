import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root',
})
export class RouteguardGuard implements CanActivate {
  constructor(
    private authservice: AuthentificationService,
    private route: Router
  ) {}
  canActivate(): boolean {
    if (this.authservice.isLoggedIn) {
      this.route.navigate(['/login']);
      return true;
    } else {
      console.log('not logged in');
      return false;
    }

    
  }
}
