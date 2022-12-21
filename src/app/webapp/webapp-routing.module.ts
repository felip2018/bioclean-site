import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { HomeComponent } from "./pages/home/home.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { ProductsComponent } from "./pages/products/products.component";
import { SalesComponent } from "./pages/sales/sales.component";
import { UsersComponent } from "./pages/users/users.component";

const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'configuration',
      component: ConfigurationComponent
    },
    {
      path: 'sales',
      component: SalesComponent
    },
    {
      path: 'orders',
      component: OrdersComponent
    },
    {
      path: '',
      component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebappRoutingModule { }
