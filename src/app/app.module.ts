import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes ,RouterModule} from '@angular/router';
import { RouteguardGuard } from './shared/routeguard.guard';
import { AuthentificationService } from './shared/authentification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileManagementUiModule } from './Features/profil-management-ui/profile-management-ui.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './Features/auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


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
  declarations: [AppComponent, ],
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
