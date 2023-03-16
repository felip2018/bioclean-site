import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { UsersRegisterComponent } from './pages/users-register/users-register.component';
import { ProductsRegisterComponent } from './pages/products-register/products-register.component';
import { KitsComponent } from './pages/kits/kits.component';
import { KitsRegisterComponent } from './pages/kits-register/kits-register.component';
import { OrdersRegisterComponent } from './pages/orders-register/orders-register.component';
import { OrdersRegisterProductsComponent } from './pages/orders-register-products/order-register-products.component';
import { ContainersComponent } from './pages/containers/containers.component';
import { StatisticComponent } from './components/statistic/statistic.component';



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
    ProductsRegisterComponent,
    OrdersRegisterComponent,
    KitsComponent,
    KitsRegisterComponent,
    OrdersRegisterProductsComponent,
    ContainersComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WebappRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebappModule { }
