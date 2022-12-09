import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website/template/website.component';

const routes: Routes = [
  {
    path: 'website',
    component: WebsiteComponent,
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
  },
  {
    path: '',
    component: WebsiteComponent,
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
