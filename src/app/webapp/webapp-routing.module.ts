import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { HomeComponent } from "./pages/home/home.component";
import { KitsRegisterComponent } from "./pages/kits-register/kits-register.component";
import { KitsComponent } from "./pages/kits/kits.component";
import { OrdersRegisterProductsComponent } from "./pages/orders-register-products/order-register-products.component";
import { OrdersRegisterComponent } from "./pages/orders-register/orders-register.component";
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
      path: 'kits',
      component: KitsComponent
    },
    {
      path: 'register-kit',
      component: KitsRegisterComponent
    },
    {
      path: 'edit-product',
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
      path: 'register-order-client',
      component: OrdersRegisterComponent
    },
    {
      path: 'register-order-products',
      component: OrdersRegisterProductsComponent
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
