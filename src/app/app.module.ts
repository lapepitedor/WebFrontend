import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


import { Routes ,RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component';

import { UserService } from './shared/user.service';

import { RouteguardGuard } from './shared/routeguard.guard';
import { AuthentificationService } from './shared/authentification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileManagementUiModule } from './profil-management-ui/profile-management-ui/profile-management-ui.module';
import { NewProfilComponent } from './profil-management-ui/new-profil/new-profil.component';






const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  
  
 
  
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,

    RegisterComponent,
     NewProfilComponent,
  

    
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ProfileManagementUiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [UserService,RouteguardGuard, AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
