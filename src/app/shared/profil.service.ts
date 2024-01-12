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
 // pathCollRef: string = 'profils'; // nom de la collection
  pathCollRef: string = 'users';

  profils: Profil[] = [];

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}



  getProfiles() {
    return this.db
      .collection(this.pathCollRef)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            data['id'] = id;
            return data;
          });
        })
      );
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
    return this.db
      .collection(this.pathCollRef)
      .doc(profil.id)
      .set({ ...profil });
  }

 

  updateProfil(profil: Profil) {
    return this.db
      .collection(this.pathCollRef)
      .doc(profil.id)
      .update(profil['data']);
  }

  deleteProfil(id: string) {
    return this.db.collection(this.pathCollRef).doc(id).delete();
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

  getProfileCount() {
    return this.db
      .collection(this.pathCollRef)
      .valueChanges()
      .pipe(map((profiles) => profiles.length));
  }

  getFemaleProfileCount() {
    return this.db
      .collection(this.pathCollRef, (ref) =>
        ref.where('gender', '==', 'female')
      )
      .valueChanges()
      .pipe(map((profiles) => profiles.length));
  }

  getMaleProfileCount() {
    return this.db
      .collection(this.pathCollRef, (ref) => ref.where('gender', '==', 'male'))
      .valueChanges()
      .pipe(map((profiles) => profiles.length));
  }

  getProfilDetail(profilId: string): Observable<Profil> {
     return this.db.collection('profils').doc<Profil>(profilId).valueChanges();
  }
}
