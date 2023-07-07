import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { FragancesComponent } from "./pages/fragances/fragances.component";
import { HomeComponent } from "./pages/home/home.component";
import { KitsRegisterComponent } from "./pages/kits-register/kits-register.component";
import { KitsComponent } from "./pages/kits/kits.component";
import { OrdersRegisterProductsComponent } from "./pages/orders-register-products/order-register-products.component";
import { OrdersRegisterComponent } from "./pages/orders-register/orders-register.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { ProductTypesComponent } from "./pages/product-types/product-types.component";
import { ProductsRegisterComponent } from "./pages/products-register/products-register.component";
import { ProductsComponent } from "./pages/products/products.component";
import { SalesComponent } from "./pages/sales/sales.component";
import { UnitsComponent } from "./pages/units/units.component";
import { UsersRegisterComponent } from "./pages/users-register/users-register.component";
import { UsersComponent } from "./pages/users/users.component";
import { ProductsUpdateByFileComponent } from "./pages/products-update-by-file/products-update-by-file.component";

const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products',
      component: ProductsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products-update-by-file',
      component: ProductsUpdateByFileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'register-product',
      component: ProductsRegisterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'kits',
      component: KitsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'register-kit',
      component: KitsRegisterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'edit-product',
      component: ProductsRegisterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'register-user',
      component: UsersRegisterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'configuration',
      component: ConfigurationComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'fragances',
      component: FragancesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'product-types',
      component: ProductTypesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'units',
      component: UnitsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'categories',
      component: CategoriesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'sales',
      component: SalesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'orders',
      component: OrdersComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'register-order-client',
      component: OrdersRegisterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'register-order-products',
      component: OrdersRegisterProductsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebappRoutingModule { }
