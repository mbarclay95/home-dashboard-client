import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardLayoutComponent} from './dashboard/dashboard-layout/dashboard-layout.component';
import {DashboardResolver} from './resolvers/dashboard.resolver';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardLayoutComponent, resolve: {DashboardResolver},
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
