import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { WebsiteComponent } from './template/website.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { CountItemsComponent } from './components/count-items/count-items.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';



@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    AboutComponent,
    LoginComponent,
    WebsiteComponent,
    CountItemsComponent,
    ProductItemComponent,
    CartPreviewComponent,
    FooterComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
