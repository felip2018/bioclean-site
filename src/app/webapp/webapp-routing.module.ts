import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { HomeComponent } from "./pages/home/home.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { ProductsRegisterComponent } from "./pages/products-register/products-register.component";
import { ProductsComponent } from "./pages/products/products.component";
import { SalesComponent } from "./pages/sales/sales.component";
import { UsersRegisterComponent } from "./pages/users-register/users-register.component";
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
      path: 'register-product',
      component: ProductsRegisterComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'register-user',
      component: UsersRegisterComponent
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
