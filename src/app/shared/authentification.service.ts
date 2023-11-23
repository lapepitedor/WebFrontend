import { EventEmitter, Injectable, Output } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Features/model/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserRole } from '../Features/model/UserRole';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  @Output() changed = new EventEmitter();

  private is_logged_in: boolean = false;
  private current_user = null;

  active_user: User = new User(
    '0',
    '',
    '',
    '',
    UserRole.Admin,
    new Date(),
    'male',
    ''
  );

  constructor(private service: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      let result = await this.service.signInWithEmailAndPassword(
        email,
        password
      );
      this.current_user = result.user;
      this.changed.emit();
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  }

  register(user: User) {
    this.service
      .createUserWithEmailAndPassword(user.email, user.password)
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

  isAdmin(): boolean {
    return this.active_user !== null && this.active_user.role === 'admin';
  }

  isAgent(): boolean {
    return this.active_user !== null && this.active_user.role === 'agent';
  }

  isLogged_in() {
    return (this.is_logged_in = true);
  }
}
