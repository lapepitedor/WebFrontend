import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../Features/model/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() changed = new EventEmitter();
  users: User[] = [];
 
  constructor(private db: AngularFirestore) {}

  async getAll() {
    //retourne un obj type promise check ob the loading of data is complete or not
    // return new Promise<User[]>((resolve) => {

    //   let collection = this.db.collection('user');

    //   collection.get().subscribe(function (snapshot) {
    //     let users: User[] = [];
    //     snapshot.forEach(function (doc) {
    //       let data = doc.data;
    //       let obj = new User(
    //         doc.id,
    //         data['name'],
    //         data['email'],
    //         data['role'],
    //         data['birthDate'],
    //         data['address'],
    //         data['gender'],
    //         data['password']
    //       );
    //       users.push(obj);
    //     });
    //     resolve(users);
    //   });
    // });
 try {
   const collection = this.db.collection('users');
   const querySnapshot = await collection.get().toPromise();

   const users: User[] = [];
   querySnapshot.forEach((doc) => {
     const data = doc.data();
     const user = new User(
       doc.id,
       data['name'],
       data['email'],
       data['password'],
       data['role'],
       data['birthDate'] , // Récupération de la date sans l'heure,
       data['gender'],
       data['password']
     );
     users.push(user);
   });

   console.log('Données récupérées dans le service :', users);
   return users;
 } catch (error) {
   console.error('Erreur lors de la récupération des données :', error);
   return []; // Retourne un tableau vide en cas d'erreur
 }
    
  }

  deleteUser(user: User) {
    this.users = this.users.filter((u) => u.email !== user.email);
  }

  getById(id: number) {
    return null;
  }

  save(user: User) {
    let collection = this.db.collection("users");
    let tmp = {
      "email": user.email,
      "name": user.name,
      "password": user.password,
      "gender": user.gender,
      "birthday": user.birthDate,
      "role": user.role,
      "address": user.address
      
    };
    if (user.id == "") {
      collection.add(tmp).then(doc => {
        user.id = doc.id;
        this.changed.emit();
      });
    }
      else {
      collection.doc(user.id).set(tmp).then(() => {
        this.changed.emit();
        })
      }
    }
  

  
}
