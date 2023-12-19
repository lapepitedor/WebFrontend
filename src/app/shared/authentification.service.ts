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

  is_logged_in: boolean = false;
  current_profil = null;

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
      alert(error.message);
      return false;
    }
  }

  register(user: Profil) {
    this.service
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        const additionalUserData = {
          displayName: user.name,
          role: user.role,
          email: user.email, // Enregistrement de l'email
          // Autres champs personnalisés
        };
        return this.db
          .collection('profil')
          .doc(result.user.uid)
          .set(additionalUserData);
      })
      .then(() => {
        alert('Successfully Registered');
        this.router.navigate(['/login']);
      })

      .catch((err) => {
        // Gérer les erreurs ici, si nécessaire
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }

  logout() {
    this.service
      .signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      })
      .catch((err) => {
        // Gérer les erreurs ici, si nécessaire
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }

  // isAdmin(): boolean {
  //   return this.current_profil !== null && this.current_profil.role === 'admin';
  // }

  // isAgent(): boolean {
  //   return this.current_profil !== null && this.current_profil.role === 'agent';
  // }

  isLogged_in() {
    return (this.is_logged_in = true);
  }
}
