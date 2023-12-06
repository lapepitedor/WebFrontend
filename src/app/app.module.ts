import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importez BrowserAnimationsModule


import { AppComponent } from './app.component';

import { LogoutComponent } from './Features/auth/components/logout/logout.component';
import { PageNotFoundComponent } from './Features/profil-management-ui/page-not-found/page-not-found.component';
import { Routes ,RouterModule} from '@angular/router';
import { ProfilService } from './shared/profil.service';
import { RouteguardGuard } from './shared/routeguard.guard';
import { AuthentificationService } from './shared/authentification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileManagementUiModule } from './Features/profil-management-ui/profile-management-ui.module';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './Features/auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatTableModule } from '@angular/material/table';



const routes: Routes = [
  
];
const firebaseConfig = {
  apiKey: 'AIzaSyCDfdposhMdBBKtpqXCme6IRM_X666fHuw',
  authDomain: 'profilmanager-2db1c.firebaseapp.com',
  projectId: 'profilmanager-2db1c',
  storageBucket: 'profilmanager-2db1c.appspot.com',
  messagingSenderId: '508105089163',
  appId: '1:508105089163:web:c74494c1d5b2f94e00348e',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileManagementUiModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
   
  ],
  exports: [RouterModule],
  providers: [RouteguardGuard, AuthentificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
