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

  register(user: Profil) {
    this.service
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        const additionalUserData = {
          name: user.name,
          role: user.role,
          country: user.country, 
          gender: user.gender,
          tel: user.tel,
          email: user.email,
          password:user.password
          
        };
        return this.db
          .collection('users')
          .doc(result.user.uid)
          .set(additionalUserData);
      })
      .then(() => {
        
        this.router.navigate(['/login']);
      })

      .catch((err) => {
        // Gérer les erreurs ici, si nécessaire
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }

  async logout() {
    await this.service
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  isLoggedIn() {
    console.log(this.current_profil); // Protokollierung vor der Rückgabe
    return this.current_profil != null;
  }
}
