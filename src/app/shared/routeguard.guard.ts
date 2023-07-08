import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardGuard implements CanActivate {
  constructor(private authservice: AuthentificationService, private route :Router){}
  canActivate(): boolean{
    if (!this.authservice.isLogginIn) {
      this.route.navigate(['/login']);
      return false;
     
    }
   return true;
    
  }
    
  
  
}
