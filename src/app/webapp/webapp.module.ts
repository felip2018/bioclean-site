import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { UnitsComponent } from './pages/units/units.component';
import { FragancesComponent } from './pages/fragances/fragances.component';
import { WebappRoutingModule } from './webapp-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';



@NgModule({
  declarations: [
    TemplateComponent,
    HomeComponent,
    ProductsComponent,
    UsersComponent,
    UnitsComponent,
    FragancesComponent,
    OrdersComponent,
    SalesComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WebappRoutingModule
  ]
})
export class WebappModule { }
