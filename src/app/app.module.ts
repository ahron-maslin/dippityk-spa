import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CartService } from './services/cart.service';
import { RouteGuardGuard } from './route-guard.guard';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { FourComponent } from './four/four.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThanksComponent } from './thanks/thanks.component';
import { SideMenuComponent } from './side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    OrderComponent,
    FourComponent,
    FooterComponent,
    HeaderComponent,
    CheckoutComponent,
    ThanksComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'home',  component: HomeComponent },
      { path: 'order',     component: OrderComponent },
      { path: 'contact', component: ContactComponent },
      {canActivate: [RouteGuardGuard], path: 'checkout', component: CheckoutComponent },
      {path: 'thanks', component: ThanksComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', pathMatch: 'full', component: FourComponent }
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    CartService,
    RouteGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
