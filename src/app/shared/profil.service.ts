import { EventEmitter, Injectable, Output } from '@angular/core';
import { Profil } from '../Features/model/Profil';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  @Output() changed = new EventEmitter();

  profils: Profil[] = [];

  constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db
      .collection('profils')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  saveProfil(profil: Profil) {
    // this.db
    //   .collection('profils')
    //   .add(profil)
    //   .then(() => {
    //     console.log('Profil ajouté avec succès !');
    //   })
    //   .catch((error) => {
    //     console.error("Erreur lors de l'ajout du profil : ", error);
    //   });
    let collection = this.db.collection('profils');
    let tmp = {
      name: profil.Name,
      email: profil.Email,
      password: profil.Password,
      tel: profil.Tel,
      role: profil.Role,
      gender: profil.Gender,
      country: profil.Country,
    };
    if (profil.id == '') {
      collection.add(tmp).then((doc) => {
        profil.id = doc.id;
        this.changed.emit();
      });
    } else {
      collection
        .doc(profil.id)
        .set(tmp)
        .then(() => {
          this.changed.emit();
        });
    }
  }

  // async getById(id: string): Promise<Profil | null> {
  //   try {
  //     const docRef = this.db.collection('users').doc(id);
  //     const doc = await docRef.get().toPromise();

  //     if (doc.exists) {
  //       const data = doc.data();
  //       const obj = new Profil(
  //         doc.id,
  //         data['name'],
  //         data['email'],
  //         data['password'],
  //         data['role'],
  //         data['tel'],
  //         data['gender'],
  //         data['country']
  //       );
  //       return obj;
  //     } else {
  //       return null; // Document non trouvé
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération de l'utilisateur:", error);
  //     return null;
  //   }
  // }

  getById(id: string) {
    return new Promise<Profil>((resolve) => {
      this.db
        .collection('profils')
        .doc(id)
        .get()
        .subscribe(function (doc) {
          let data = doc.data();
          let obj = new Profil(
            doc.id,
            data['Name'],
            data['Email'],
            data['Password'],
            data['Role'],
            data['Gender'] as 'female' | 'male',
            data['Tel'],
            data['Country']
          );
          resolve(obj);
          console.log(id);
        });
    })
    
  }

  updateProfil(profil: Profil, id: string): Promise<void> {
    return this.db.doc(id).update(profil);
   }

  deleteProfil(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.db
        .collection('profils')
        .doc(id)
        .delete()
        .then(() => {
          this.changed.emit();
          resolve();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
          // Gérer l'erreur ici si nécessaire
        });
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
  
}
