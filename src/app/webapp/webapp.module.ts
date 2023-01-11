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
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductTypesComponent } from './pages/product-types/product-types.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { UsersRegisterComponent } from './pages/users-register/users-register.component';
import { ProductsRegisterComponent } from './pages/products-register/products-register.component';



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
    ConfigurationComponent,
    HeaderComponent,
    FooterComponent,
    ProductTypesComponent,
    CategoriesComponent,
    LoaderComponent,
    UsersRegisterComponent,
    ProductsRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WebappRoutingModule,
    ReactiveFormsModule
  ]
})
export class WebappModule { }
