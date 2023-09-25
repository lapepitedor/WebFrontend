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
  isLogginIn = false;

  active_user: User = new User(0, '', '', '', 'user', new Date(), '', '');

  constructor(private service: AngularFireAuth) {}

  login(email: string, password: string): Boolean {
    const user = this.service.byEmailAndPassword(email, password);
    if (user) {
      this.active_user = user;
      this.isLogginIn = true;
      this.changed.emit();
      return true;
    }
    return false;
  }

  logout() {
    //this.active_user = null;
   // this.changed.emit();
    this.isLogginIn =false;
  }

  register() {}

 // isLogginIn() {
  //  return this.active_user != null;
 // }

  isAdmin(): boolean {
    return this.active_user !== null && this.active_user.role === 'admin';
  }

  isAgent(): boolean {
    return this.active_user !== null && this.active_user.role === 'agent';
  }
}
