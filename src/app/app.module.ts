import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes ,RouterModule} from '@angular/router';
import { UserService } from './shared/user.service';
import { RouteguardGuard } from './shared/routeguard.guard';
import { AuthentificationService } from './shared/authentification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileManagementUiModule } from './profil-management-ui/profile-management-ui/profile-management-ui.module';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';




const routes: Routes = [
  
];

 const firebaseConfig = {
                 apiKey: 'AIzaSyDVRf0x6C0xJFlNL_EMoRO9sx9pmL5Y0fM',
                 authDomain: 'profilmanagerapp.firebaseapp.com',
                 projectId: 'profilmanagerapp',
                 storageBucket: 'profilmanagerapp.appspot.com',
                 messagingSenderId: '828991318293',
                 appId: '1:828991318293:web:0862acb562a9e745c6e11c',
}; 
               
@NgModule({
  declarations: [AppComponent, LogoutComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    ProfileManagementUiModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FirestoreModule,

   
  ],
  exports: [RouterModule],
  providers: [UserService, RouteguardGuard, AuthentificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
