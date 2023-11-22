import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteguardGuard } from './shared/routeguard.guard';
import { AuthModule } from './Features/auth/auth.module'; 
import { PageNotFoundComponent } from './Features/profil-management-ui/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./Features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profil-manager',
    canActivate: [RouteguardGuard],
    loadChildren: () =>
      import(
        './Features/profil-management-ui/profile-management-ui.module'
      ).then((m) => m.ProfileManagementUiModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
