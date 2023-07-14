import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./pages/about/about.component";
import { BeDistributorComponent } from "./pages/be-distributor/be-distributor.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { PolicyComponent } from "./pages/policy/policy.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { StoreComponent } from "./pages/store/store.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { TermsAndConditionsComponent } from "./pages/terms-and-conditions/terms-and-conditions.component";

const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'cart',
      component: CartComponent
    },
    {
      path: 'store',
      component: StoreComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'about',
      component: AboutComponent,
    },
    {
      path: 'be-a-distributor',
      component: BeDistributorComponent,
    },
    {
      path: 'contact',
      component: ContactComponent,
    },
    {
      path: 'policy',
      component: PolicyComponent,
    },
    {
      path: 'privacy-policy',
      component: PrivacyPolicyComponent,
    },
    {
      path: 'terms',
      component: TermsAndConditionsComponent,
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
export class WebsiteRoutingModule { }
