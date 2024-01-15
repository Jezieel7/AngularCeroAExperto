import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';

const routes: Routes = [
    {
        path: '',
        component: PorPaisComponent,
        pathMatch: 'full'
    },
    {
        path: 'region',
        component: PorRegionComponent
    },
    {
        path: 'capital',
        component: PorCapitalComponent
    },
    {
        path: 'pais/:id',
        component: PorPaisComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }