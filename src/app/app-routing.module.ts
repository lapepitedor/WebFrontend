
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteguardGuard } from './shared/routeguard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'profil-ui',
    canActivate: [RouteguardGuard],
    loadChildren: () =>
      import(
        './profil-management-ui/profile-management-ui/profile-management-ui.module'
      ).then((m) => m.ProfileManagementUiModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
