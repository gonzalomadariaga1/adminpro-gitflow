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
import { DoctorsComponent } from './mantenedores/doctors/doctors.component';
import { HospitalsComponent } from './mantenedores/hospitals/hospitals.component';
import { DoctorComponent } from './mantenedores/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { adminGuard } from '../guards/admin.guard';

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
          { path: 'search/:term', component: SearchComponent, data: {titulo: 'Búsqueda'} },

          //mantenedores
          { path: 'doctors', component: DoctorsComponent, data: {titulo: 'Doctores de la app'} },
          { path: 'doctors/:id', component: DoctorComponent, data: {titulo: 'Doctor de la app'} },
          { path: 'hospitals', component: HospitalsComponent, data: {titulo: 'Hospitales de la app'} },
          { path: 'users', canActivate: [adminGuard] ,component: UsersComponent, data: {titulo: 'Usuarios de la app'} },


        ]
    },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
  