import { EventEmitter, Injectable, Output } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  @Output() changed = new EventEmitter();
  
  active_user: User = new User(0, '', '', '', 'user', new Date(), '', '');

  constructor(
    private service: AngularFireAuth,
    private userservice: UserService
  ) {}

  login(email: string, password: string) {
    const user = this.userservice.byEmailAndPassword(email, password);
    if (user !== null) {
      this.active_user = user;
    }
    return this.isLogginIn();
  }

  logout() {
    // this.active_user = null;
    // this.changed.emit();
  }

  register() {}

  isLogginIn() {
    return this.active_user != null;
  }

  isAdmin(): boolean {
    return this.active_user !== null && this.active_user.role === 'admin';
  }

  isAgent(): boolean {
    return this.active_user !== null && this.active_user.role === 'agent';
  }
}
