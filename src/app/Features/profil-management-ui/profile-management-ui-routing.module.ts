import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListProfilComponent } from './list-profil/list-profil.component';
import { ProfileManagementUiComponent } from './profile-management-ui.component';
import { PageNotFoundComponent } from 'src/app/Features/profil-management-ui/page-not-found/page-not-found.component';
import { CreateProfilComponent } from './profil/create-profil/create-profil.component';
import { RouteguardGuard } from 'src/app/shared/routeguard.guard';

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
        path: 'list-profil',
        component: ListProfilComponent,
       
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
