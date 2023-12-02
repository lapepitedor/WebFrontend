import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ListProfilComponent } from './list-profil/list-profil.component';
import { ProfileManagementUiComponent } from './profile-management-ui.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
import { PageNotFoundComponent } from 'src/app/Features/profil-management-ui/page-not-found/page-not-found.component';
import { CreateProfilComponent } from './profil/create-profil/create-profil.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementUiComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'newProfil',
        component: CreateProfilComponent,
      },

      {
        path: 'profile',
        component: ListProfilComponent,
      },

      {
        path: 'profile/:id',
        component: ProfilEditComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class ProfileManagementUiRoutingModule { }
