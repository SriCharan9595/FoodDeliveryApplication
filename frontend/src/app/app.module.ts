import { JwtAuthInterceptor } from './core/interceptors/jwt-auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddressComponent } from './address/address.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelComponent } from './hotel/hotel.component';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminHotelComponent } from './admin-hotel/admin-hotel.component';
import { TokenService } from './core/services/token.service';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { BillingComponent } from './billing/billing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AddressComponent,
    HomeComponent,
    HotelComponent,
    CategoryComponent,
    MenuComponent,
    AdminComponent,
    AdminUserComponent,
    AdminHotelComponent,
    AddHotelComponent,
    BillingComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtAuthInterceptor,
    multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
