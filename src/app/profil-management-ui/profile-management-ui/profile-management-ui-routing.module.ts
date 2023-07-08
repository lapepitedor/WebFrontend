import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


import { RouteguardGuard } from 'src/app/shared/routeguard.guard';
import { ListProfilComponent } from '../list-profil/list-profil.component';
import { ProfileManagementUiComponent } from './profile-management-ui.component';
import { ProfilEditComponent } from '../profil-edit/profil-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementUiComponent,

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RouteguardGuard],
      },
      { path: 'edit', component: ProfilEditComponent },
      {
        path: 'profile',
        component: ListProfilComponent,
        canActivate: [RouteguardGuard],
      },

      {
        path: 'profile/:id',
        component: ProfilEditComponent,
        canActivate: [RouteguardGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementUiRoutingModule { }
