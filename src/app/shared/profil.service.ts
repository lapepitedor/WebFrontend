import { EventEmitter, Injectable, Output } from '@angular/core';
import { Profil } from '../Features/model/Profil';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserRole } from '../Features/model/UserRole';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  @Output() changed = new EventEmitter();

  profils: Profil[] = [];

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

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

  async getById(id: string): Promise<Profil | null> {
    try {
      const docRef = this.db.collection('users').doc(id);
      const doc = await docRef.get().toPromise();

      if (doc.exists) {
        const data = doc.data();
        const obj = new Profil(
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

  // getById(id: string) {
  //   return new Promise<Profil>((resolve) => {
  //     this.db
  //       .collection('profils')
  //       .doc(id)
  //       .get()
  //       .subscribe(function (doc) {
  //         let data = doc.data();
  //         let obj = new Profil(
  //           doc.id,
  //           data['Name'],
  //           data['Email'],
  //           data['Password'],
  //           data['Role'],
  //           data['Gender'] as 'female' | 'male',
  //           data['Tel'],
  //           data['Country']
  //         );
  //         resolve(obj);
  //         console.log(id);
  //       });
  //   })

  // }

  updateProfil(id: string, profil: Profil) {
    // return this.db.doc(id).update(profil);
    let data = {
      Name: profil.Name,
      Email: profil.Email,
      Password: profil.Password,
      Tel: profil.Tel,
      Country: profil.Country,
      Gender: profil.Gender,
      Role: profil.Role,
    };
    this.db
      .collection('profils')
      .doc(id)
      .set(data)
      .then(() => {
        this.snackBar.open('Save with Success !', 'Close', {
          duration: 3000, // Durée en millisecondes
          verticalPosition: 'top', // Position verticale du snack bar
          horizontalPosition: 'end', // Position horizontale du snack bar);
        });
      });
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

  // getById(id: string): Promise<Profil> {
  //   return new Promise<Profil>((resolve) => {
  //     this.db
  //       .collection('profils')
  //       .doc(id)
  //       .get()
  //       .subscribe((doc) => {
  //         let data = doc.data();
  //         let obj = new Profil(
  //           doc.id,
  //           data['Name'],
  //           data['Email'],
  //           data['Password'],
  //           data['Tel'],
  //           data['Country'],
  //           data['Gender'],
  //           data['Role']
  //         );
  //         resolve(obj);
  //         console.log(obj);
  //       });
  //   });
  // }

  retrieve(id: string) {
    debugger;

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
            data['Gender'],
            data['Tel'],
            data['Country']
          );
          // obj.id = doc.id;
          // obj.Name = data["Name"];
          // obj.Email = data['Email'];
          // obj.Password = data['Password'];
          // obj.Tel = data['Tel'];
          // obj.Country = data['Country'];
          // obj.Gender = data['Gender'];
          // obj.Role = data['Role'];
          resolve(obj);
        });
    });
  }

  getUserById(userId: string): Observable<Profil> {
    return this.db
      .collection('profils')
      .doc(userId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          const data = doc.payload.data() as Profil; // Annahme: Firestore-Daten entsprechen Profil-Typ
          const id = doc.payload.id;
          // return { id, ...data };
          return new Profil(
            id,
            data.Name, // Assurez-vous que le champ 'Name' correspond à la propriété 'Name' de Profil
            data.Email,
            data.Password,
            data.Role,
            data.Gender,
            data.Tel,
            data.Country
          );
        })
      );
  }
  // getData() {
  //   const collectionInstance = collection(this.db, 'profils');
  // }
}
