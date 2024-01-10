import { EventEmitter, Injectable, Output } from '@angular/core';
import { ProfilService } from './profil.service';
import { Profil } from '../Features/model/Profil';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserRole } from '../Features/model/UserRole';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  @Output() changed = new EventEmitter();
 
  private current_profil = null;

  constructor(
    private service: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

  async login(email: string, password: string) {
   
    try {
      let result = await this.service.signInWithEmailAndPassword(
        email,
        password
      );
      
      this.current_profil = result.user;
      this.changed.emit();
      return true;
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
     // alert('Hello, No User found with this email and passwort');
      return false;
    }
  }
    
  logout() {
    this.service
      .signOut()
      .then(() => {       
        this.router.navigate(['/login']);
      })
      .catch((err) => {       
        alert(err.message);       
      });
  }

  isLoggedIn() {
    return this.current_profil != null;
  }
}
