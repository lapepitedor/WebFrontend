import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../Features/model/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() changed = new EventEmitter();
  users: User[] = [];

  constructor(private db: AngularFirestore ) {}

  async getAll() {
    //retourne un obj type promise check ob the loading of data is complete or not
    // return new Promise<User[]>((resolve) => {

    //   let collection = this.db.collection('users');

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
          data['tel'],
          data['country'],
          data['role'],
          data['gender']
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

  deleteUser(id: string) {
    this.db
      .collection('users')
      .doc(id)
      .delete()
      .then(() => {
        this.changed.emit();
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
        // Gérer l'erreur ici si nécessaire
      });
  }

  // getById(id: string) {
  //   return new Promise<User>((resolve) => {
  //     this.db
  //       .collection('users')
  //       .doc(id)
  //       .get()
  //       .subscribe(function (doc) {
  //         let data = doc.data();
  //         let obj = new User(
  //           doc.id,
  //           data['name'],
  //           data['email'],
  //           data['password'],
  //           data['tel'],
  //           data['country'],
  //           data['gender'],
  //           data['role']
  //         );
  //         resolve(obj);
  //       });
  //   });
  // }
  async getById(id: string): Promise<User | null> {
    try {
      const docRef = this.db.collection('users').doc(id);
      const doc = await docRef.get().toPromise();

      if (doc.exists) {
        const data = doc.data();
        const obj = new User(
          doc.id,
          data['name'],
          data['email'],
          data['password'],
          data['role'],
          data['tel'],
          data['gender'],
          data['country']
        );
        return obj;
      } else {
        return null; // Document non trouvé
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }
  }

  save(user: User) {


    this.db.collection("Users_").add(user);
    console.log("User erfolgreich hinzugefugt")
    // let collection = this.db.collection('users');
    // let tmp = {
    //   name: user.name,
    //   email: user.email,
    //   password: user.password,
    //   tel: user.tel,
    //   role: user.role,
    //   gender: user.gender,
    //   country: user.country,
    // };
    // if (user.id == '') {
    //   collection.add(tmp).then((doc) => {
    //     user.id = doc.id;
    //     this.changed.emit();
    //   });
    // } else {
    //   collection
    //     .doc(user.id)
    //     .set(tmp)
    //     .then(() => {
    //       this.changed.emit();
    //     });
    // }
  }
}
