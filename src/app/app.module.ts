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
  apiKey: 'AIzaSyCrpHS_46ARWxkoCladZYiLE8JPz3RJn6c',
  authDomain: 'profilmanagerweb.firebaseapp.com',
  projectId: 'profilmanagerweb',
  storageBucket: 'profilmanagerweb.appspot.com',
  messagingSenderId: '273109787170',
  appId: '1:273109787170:web:c3c5ce33811f64a8a4a07b',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyCrpHS_46ARWxkoCladZYiLE8JPz3RJn6c',
//   authDomain: 'profilmanagerweb.firebaseapp.com',
//   projectId: 'profilmanagerweb',
//   storageBucket: 'profilmanagerweb.appspot.com',
//   messagingSenderId: '273109787170',
//   appId: '1:273109787170:web:f662a8edbf0e4c2ea4a07b',
// };


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
