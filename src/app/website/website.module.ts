import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { StoreComponent } from './pages/store/store.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { BeDistributorComponent } from './pages/be-distributor/be-distributor.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';



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
    StoreComponent,
    SignupComponent,
    TermsAndConditionsComponent,
    ContactComponent,
    PolicyComponent,
    BeDistributorComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})
export class WebsiteModule { }
