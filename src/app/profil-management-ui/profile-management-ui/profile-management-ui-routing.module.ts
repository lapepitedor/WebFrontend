import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteguardGuard } from 'src/app/shared/routeguard.guard';
import { ListProfilComponent } from '../list-profil/list-profil.component';
import { ProfileManagementUiComponent } from './profile-management-ui.component';
import { ProfilEditComponent } from '../profil-edit/profil-edit.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementUiComponent,
    //canActivate: [RouteguardGuard],

    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'profile',
        component: ListProfilComponent,
      },

      {
        path: 'profile/:id',
        component: ProfilEditComponent,
      },

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementUiRoutingModule { }
