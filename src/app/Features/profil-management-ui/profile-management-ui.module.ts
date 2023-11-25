import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementUiRoutingModule } from './profile-management-ui-routing.module';
import { ProfileManagementUiComponent } from './profile-management-ui.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListProfilComponent } from './list-profil/list-profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';


import { UserService } from 'src/app/shared/user.service';
import { CreateProfilComponent } from './profil/create-profil/create-profil.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';



console.log('HelloProfil');
@NgModule({
  declarations: [
    ProfileManagementUiComponent,
    DashboardComponent,
    NavbarComponent,
    ListProfilComponent,
    ProfilEditComponent,
    CreateProfilComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProfileManagementUiRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [UserService],
})
export class ProfileManagementUiModule {}
