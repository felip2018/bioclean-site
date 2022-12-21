import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './webapp/template/template.component';
import { WebsiteComponent } from './website/template/website.component';

const routes: Routes = [
  {
    path: 'website',
    component: WebsiteComponent,
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
  },
  {
    path: 'webapp',
    component: TemplateComponent,
    loadChildren: () => import('./webapp/webapp.module').then(m => m.WebappModule),
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
