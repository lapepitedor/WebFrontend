import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() changed = new EventEmitter();
  users: User[] = [
    new User(
      1,
      'John Doe',
      'johndoe@gmail.com',
      'johndoe@gmail.com',
      'user',
      new Date('12.06.1995'),
      'Dormund',
      'Germany'
    ),
    new User(
      2,
      'Jane Doe',
      'janedoe@gmail.com',
      'janedoe@gmail.com',
      'user',
      new Date('12.06.1995'),
      'Achen',
      'Germany'
    ),
    new User(
      3,
      'John Smith',
      'johnsmith@gmail.com',
      'johnsmith@gmail.com',
      'agent',
      new Date('01.01.1999'),
      'Gießen',
      'Germany'
    ),
    new User(
      4,
      'Jane Smith',
      'janesmith@gmail.com',
      'janesmith@gmail.com',
      'agent',
      new Date('05.02.2002'),
      'Frankfurt',
      'Germany'
    ),
    new User(
      5,
      'Messu Brinda',
      'admin@gmail.com',
      'admin@gmail.com',
      'admin',
      new Date('05.02.2003'),
      'Paris',
      'France'
    ),
  ];
  getAll() {
    return this.users.slice();
  }

  private index(id: number) {
    // fech the index of a id of a user
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  deleteUser(user: User) {
    this.users = this.users.filter((u) => u.email !== user.email);
  }

  getById(id: number) {
    let index = this.index(id);
    if (index != -1) {
      return this.users[index];
    } else {
      return null;
    }
  }

  byEmailAndPassword(email: string, password: string) {
    for (let index = 0; index < this.users.length; index++) {
      let user = this.users[index];
      if (user.email === email && user.password === password) return user;
    }
    return null;
  }

  save(obj: User) {
    let index = this.users.findIndex((x) => x.id == obj.id);

    if (index >= 0) {
      this.users[index] = obj;
    } else {
      let new_id =
        Math.max.apply(
          Math,
          this.users.map(function (o) {
            return o.id;
          })
        ) + 1;
      obj.id = new_id;
      this.users.push(obj);
    }

    this.changed.emit(this.getAll());
  }
  addUser(user: User) {
    this.users = [user, ...this.users];
  }
}
