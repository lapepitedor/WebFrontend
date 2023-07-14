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


const routes: Routes = [
  
];
@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    PageNotFoundComponent,
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    ProfileManagementUiModule,
    AppRoutingModule,
    
  ],
  exports: [RouterModule],
  providers: [UserService,RouteguardGuard, AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
