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

 // is_logged_in: boolean = false;
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
      alert(error.message);
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
          email: user.email, 
          password: user.password,
          country: user.country,
          tel: user.tel,
          gender: user.gender,
        };
        return this.db
          .collection('profils')
          .doc(result.user.uid)
          .set(additionalUserData);
      })
      .then(() => {
        alert('Successfully Registered');
        this.router.navigate(['/login']);
      })

      .catch((err) => {      
        alert(err.message);
        this.router.navigate(['/register']);
      });
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


  // isLogginIn() {
  //   return this.is_logged_in;
  // }

  isLoggedIn() {
    return this.current_profil != null;
  }
}
