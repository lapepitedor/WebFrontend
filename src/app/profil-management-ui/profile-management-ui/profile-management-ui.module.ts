import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementUiRoutingModule } from './profile-management-ui-routing.module';
import { ProfileManagementUiComponent } from './profile-management-ui.component';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ListProfilComponent } from '../list-profil/list-profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilEditComponent } from '../profil-edit/profil-edit.component';


@NgModule({
  declarations: [
    ProfileManagementUiComponent,
    DashboardComponent,
    NavbarComponent,
    ListProfilComponent,
    ProfilEditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProfileManagementUiRoutingModule
  ]
})
export class ProfileManagementUiModule { }
