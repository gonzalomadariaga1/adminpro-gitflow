import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mantenedores/users/users.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [authGuard],
        children: [
          { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'} },
          { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'} },
          { path: 'profile', component: ProfileComponent, data: {titulo: 'Mi perfil'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
          { path: 'promises', component: PromisesComponent, data: {titulo: 'Promises'} },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'} },

          //mantenedores
          { path: 'users', component: UsersComponent, data: {titulo: 'Usuarios de la app'} },


        ]
    },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  