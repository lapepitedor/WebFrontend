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
  apiKey: 'AIzaSyDdhMKX4heggWO60XZD5uxfm6Mj8CZcXJY',
  authDomain: 'profilemanagementapp.firebaseapp.com',
  projectId: 'profilemanagementapp',
  storageBucket: 'profilemanagementapp.appspot.com',
  messagingSenderId: '208753980826',
  appId: '1:208753980826:web:95cde68a41a30117c8b623',
};
              
@NgModule({
  declarations: [AppComponent, LogoutComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
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
