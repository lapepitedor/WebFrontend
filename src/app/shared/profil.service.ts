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
  pathCollRef: string = 'profils';

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

  getProfiles() {
    // return new Promise<Profil[]>((resolve) => {
    //   let collection = this.db.collection(this.pathCollRef);
    //   collection.get().subscribe(function (snapshot) {
    //     let profils: Profil[] = [];
    //     snapshot.forEach(function (doc) {
    //       let data = doc.data();
    //       let obj = new Profil(
    //         doc.id,
    //         data['Name'],
    //         data['Email'],
    //         data['Password'],
    //         data['UserRole'],
    //         data['Gender'],
    //         data['Tel'],
    //         data['Country']
    //       );
    //       profils.push(obj);
    //     });
    //     resolve(profils);
    //     console.log(profils);
    //   });
    // });
    return this.db.collection(this.pathCollRef).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          data['id'] = id;
          return data;
        });
      })
    );;
  }

  saveProfil(profil: Profil) {
    // this.db
    //   .collection('Profils')
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((a) => {
    //         const data = a.payload.doc.data() as Profil;
    //         data.id = a.payload.doc.id;
    //         return data;
    //       })
    //     )
    // );
    return this.db.collection(this.pathCollRef).doc(profil.id).set({ ...profil });
  }

  // saveProfil(profil: Profil) {
  //   console.log
  //   let collection = this.db.collection("profils");
  //   let tmp = {
  //     "Name": profil.Name,
  //     "Email": profil.Email,
  //     "Password": profil.Password,
  //     "Tel": profil.Tel,
  //     "Role": profil.Role,
  //     "Gender": profil.Gender,
  //     "Country": profil.Country,
  //   };

  //   if (profil.id == "") {
  //     collection.add(tmp).then((doc) => {
  //       // let data: Profil = {
  //       //   id: doc.id,
  //       //   Name: tmp.name,
  //       //   Email: tmp.email,
  //       //   Password: tmp.password,
  //       //   Tel: tmp.tel,
  //       //   Role: tmp.role,
  //       //   Gender: tmp.gender,
  //       //   Country: tmp.country,
  //       // };
  //         profil.id = doc.id;
  //         this.changed.emit();

  //     });
  //   } else {
  //     collection
  //       .doc(profil.id)
  //       .set(tmp)
  //       .then(() => {
  //         this.changed.emit();
  //       });
  //   }
  // }

  addProfil(profil: Profil) {
  
      this.db.collection('profil').add(profil);
 
  }

  getProfils() {
    debugger
    return this.db.collection(this.pathCollRef).snapshotChanges();
  }

  updateProfil(profil: Profil) {
    debugger
    return this.db.collection(this.pathCollRef).doc(profil.id).update(profil['data']);
  }

  deleteProfil(id: string) {
    return this.db.collection('profils').doc(id).delete();
  }

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
            data['name'],
            data['Email'],
            data['Password'],
            data['Role'],
            data['Gender'],
            data['Tel'],
            data['Country']
          );
          resolve(obj);
          console.log(id);
        });
    });
  }

  // updateProfil(id: string, profil: Profil): Promise<Profil> {
  //   let data = {
  //     Name: profil.Name,
  //     Email: profil.Email,
  //     Password: profil.Password,
  //     Tel: profil.Tel,
  //     Country: profil.Country,
  //     Gender: profil.Gender,
  //     Role: profil.Role,
  //   };

  //   return this.db
  //     .collection('profils')
  //     .doc(id)
  //     .set(data)
  //     .then(() => {
  //       return profil; // Retourne le profil mis à jour
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la mise à jour du profil :', error);
  //       throw error;
  //     });
  // }

  // updateUser(id: string, profil: Profil): Promise<void> {
  //   return this.db.collection('profils').doc(id).update(profil);
  // }

  // deleteProfil(id: string): Promise<void> {
  //   return new Promise<void>((resolve) => {
  //     this.db
  //       .collection('profils')
  //       .doc(id)
  //       .delete()
  //       .then(() => {
  //         this.changed.emit();
  //         resolve();
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Erreur lors de la suppression de l'utilisateur :",
  //           error
  //         );
  //         // Gérer l'erreur ici si nécessaire
  //       });
  //   });
  // }

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

  // getUserById(userId: string): Observable<Profil> {
  //   return this.db
  //     .collection('profils')
  //     .doc(userId)
  //     .snapshotChanges()
  //     .pipe(
  //       map((doc) => {
  //         const data = doc.payload.data() as Profil; // Annahme: Firestore-Daten entsprechen Profil-Typ
  //         const id = doc.payload.id;
  //         // return { id, ...data };
  //         return new Profil(
  //           id,
  //           data.Name, // Assurez-vous que le champ 'Name' correspond à la propriété 'Name' de Profil
  //           data.Email,
  //           data.Password,
  //           data.Role,
  //           data.Gender,
  //           data.Tel,
  //           data.Country
  //         );
  //       })
  //     );
  // }
  // getData() {
  //   const collectionInstance = collection(this.db, 'profils');
  // }
}
